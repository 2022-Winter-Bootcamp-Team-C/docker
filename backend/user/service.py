from .models import User


def create_user(email, password):
    return User.objects.create(email=email, password=password)
