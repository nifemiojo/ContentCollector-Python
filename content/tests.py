from django.test import TestCase

from .models import Content

# Create your tests here.
class ContentTestCase(TestCase):
    def test_content_relation_integration_test(self):
        content = Content(title="Learning React, 2nd Edition", description="book")
        content.save()
        testContent = Content.objects.get(title="Learning React, 2nd Edition")
        self.assertEqual(testContent.description, 'book')
