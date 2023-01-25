from django.contrib import admin
from django.template.defaulttags import url
from django.urls import path, include, re_path
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from user import views


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
# router = routers.DefaultRouter()
# router.register('users', UserViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ShowMeTheMoney API",
        default_version='v1',
        description="2022-Winter-Bootcamp-Team-C",
        terms_of_service="https://github.com/2022-Winter-Bootcamp-Team-C",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/v1/user/', include('user.urls')),
    path('api/v1/spending/', include('spending.urls')),
    path('api/v1/spending_challenge/', include('spending_challenge.urls')),
    path('api/v1/ocr', include('ocr.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin', admin.site.urls),
    path('api/', include(('sample_swagger.urls', 'api'))),
    path('api/v1/income/', include('income.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    ]
