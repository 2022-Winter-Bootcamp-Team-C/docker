import random
import re

import uuid
import time
import json
import requests
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from requests import Response
from rest_framework import status
from rest_framework.decorators import api_view
from backend.settings import OCR_SECRET_KEY, OCR_API_URL
from django.core.files.storage import default_storage

fs = FileSystemStorage(location='media/receipt', base_url='media/receipt')


@api_view(['POST'])
def ocr_receipt(request):
    api_url = OCR_API_URL
    secret_key = OCR_SECRET_KEY
    file_name = save_image(request.FILES['files'])
    image_file = fs.url(file_name)

    request_json = {
        'images': [
            {
                'format': 'jpg',
                'name': 'demo'
            }
        ],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(round(time.time() * 1000))
    }

    payload = {'message': json.dumps(request_json).encode('UTF-8')}
    files = [
        ('file', open(image_file, 'rb'))
    ]

    fs.delete(file_name)

    headers = {
        'X-OCR-SECRET': secret_key
    }

    response = requests.request("POST", api_url, headers=headers, data=payload, files=files)

    response_body = json.loads(response.text)

    images = response_body['images']
    images_receipt = images[0].get("receipt")

    receipt_memo = images_receipt['result']['storeInfo']['name']['text']
    receipt_date = images_receipt['result']['paymentInfo']['date']['text']
    receipt_price = int(
        float(re.sub(r"[^\uAC00-\uD7A30-9a-zA-Z\s]", "", images_receipt['result']['totalPrice']['price']['text'])))

    return JsonResponse({"memo": receipt_memo
                            , "date": receipt_date
                            , "cost": receipt_price},
                        safe=False, status=status.HTTP_200_OK)


def save_image(files):
    img_file = files
    filename = fs.save(img_file.name, img_file)
    return filename
