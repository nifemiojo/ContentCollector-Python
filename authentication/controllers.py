from django.shortcuts import render
from config.settings import SECRET_KEY
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import jwt
from .serializers import RegisterSerializer, EmailVerificationSerializer, LoginSerializer
from .models import User
from .utils import Util

class Register(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True) # Runs validate method
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])

        # Encodes using the user id
        accessToken = RefreshToken.for_user(user).access_token
        currentSite = get_current_site(request).domain
        relativeLink = reverse('email-verify')
        absurl = 'http://'+currentSite+relativeLink+"?token="+str(accessToken)
        emailBody = 'Hi ' + user.username + ' Use link below to verify your email \n' + absurl 

        data = {
            'email_body': emailBody,
            'email_subject': 'Verify your email',
            'to_email': user.email
        }

        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class=EmailVerificationSerializer

    token_param_config = openapi.Parameter('token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            # Returns data encoded in token
            payload = jwt.decode(token, key=SECRET_KEY, algorithms="HS256")
            user = User.objects.get(id=payload['user_id'])

            if not user.is_verified:
                user.is_verified = True
                user.save()

            data = {'email': 'Successfully activated'}
            return Response(data, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)

class Login(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)