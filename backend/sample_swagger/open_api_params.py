from drf_yasg import openapi

get_params = [
	openapi.Parameter(
        "start_date",
        openapi.IN_QUERY,
        description="yyyy-mm-dd",
        type=openapi.FORMAT_DATE,
        default=""
    ),
    openapi.Parameter(
        "end_date",
        openapi.IN_QUERY,
        description="yyyy-mm-dd",
        type=openapi.FORMAT_DATE,
        default=""
    )
]

post_params = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'x': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
        'y': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    }
)