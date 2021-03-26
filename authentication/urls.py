from django.urls import path
from .controllers import Register, VerifyEmail, Login

urlpatterns = [
    path('register/', Register.as_view(), name="register"),
    path('login/', Login.as_view(), name="login"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
]