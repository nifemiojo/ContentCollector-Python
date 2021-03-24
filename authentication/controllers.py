from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .models import User
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

class Register(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True) # Runs validate method
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])

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


class VerifyEmail(generics.GenericAPIView):
    def get(self):
        pass