from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .controllers import Register, VerifyEmail, Login, PasswordTokenCheckAPI, RequestPasswordResetEmail, SetNewPasswordAPIView, Logout

urlpatterns = [
    path('register/', Register.as_view(), name="register"),
    path('login/', Login.as_view(), name="login"),
    path('logout/', Logout.as_view(), name="login"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token-refresh"),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-name"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name="password-reset-confirm"),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete')
]