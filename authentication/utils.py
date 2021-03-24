from django.core.mail import send_mail
import os

class Util:
    @staticmethod
    def send_email(data):
        send_mail(subject=data['email_subject'], message=data['email_body'], from_email=None, recipient_list=[data['to_email']])