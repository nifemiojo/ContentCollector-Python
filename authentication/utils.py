from django.core.mail import send_mail
import os
import threading


class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()

class Util:
    @staticmethod  
    def send_email(data):
        send_mail(subject=data['email_subject'], message=data['email_body'], from_email=None, recipient_list=[data['to_email']])