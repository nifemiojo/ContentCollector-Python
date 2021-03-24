from django.urls import path
from .controllers import Register, VerifyEmail

urlpatterns = [
    path('register/', Register.as_view(), name="register"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
]