from django.test import TestCase
from authentication.models import User
from rest_framework.test import APIClient


from collections_app.models import Content, Collection

# Create your tests here.
class ContentTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='LamsUser', email="lamide@test.com", password='offthewall')
        self.user2 = User.objects.create_user(username='TestUser', email="test@test.com", password='hello123')
        clt1 = Collection.objects.create(name="Lams Col 1", privacyLevel="Public", user=self.user1)
        clt2 = Collection.objects.create(name="Lams Col 2", privacyLevel="Public", user=self.user1)
        clt3 = Collection.objects.create(name="Test Col 1", privacyLevel="Public", user=self.user2)
        clt4 = Collection.objects.create(name="Test Col 2", privacyLevel="Public", user=self.user2)

        cnt1 = Content.objects.create(title="Test Content 1", description="testing 1", link="www.example1.com", collection=clt1)
        cnt2 = Content.objects.create(title="Test Content 2", description="testing 2", collection=clt1)
        cnt3 = Content.objects.create(title="Test Content 3", description="testing 3", collection=clt3)

    def get_client(self):
        client = APIClient()
        client.force_authenticate(user=self.user1)
        return client

    def test_user_content_list(self):
        """
        Test API returns correct list of content present in the collection 
        """
        client = self.get_client()

        collection = Collection.objects.get(name="Lams Col 1")

        response = client.get(f"/api/collections/{collection.id}/content/", format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_content(self):
        """
        API should create new content object 
        and add it to the collection it was created in
        """
        client = self.get_client()

        collection = Collection.objects.get(name="Lams Col 2")

        requestData = {
            'title': "Test Content 4", 
            'description': "testing 4", 
            'link': "http://www.example3.com"
        }
    
        response = client.post(f"/api/collections/{collection.id}/content/create/", requestData , format='json')
        self.assertEqual(response.status_code, 201)

        clt = Collection.objects.get(name="Lams Col 2")
        content = Content.objects.get(title="Test Content 4")
        self.assertEqual(content.collection.id, clt.id)

    def test_edit_content(self):
        client = self.get_client()

        collection = Collection.objects.get(name="Lams Col 1")
        content = Content.objects.get(title="Test Content 1")

        requestData = {
            'title': "Edited Content", 
            'description': "testing123", 
            'link': "http://www.newexample.com"
        }
        response = client.put(f"/api/collections/{collection.id}/content/{content.id}/save/", requestData, format='json')
        self.assertEqual(response.status_code, 200)

        newCnt = Content.objects.get(id=content.id)
        self.assertEqual(newCnt.description, "testing123")

    def test_delete_content(self):
        client = self.get_client()

        collection = Collection.objects.get(name="Lams Col 1")
        content = Content.objects.get(title="Test Content 1")


        response = client.delete(f"/api/collections/{collection.id}/content/{content.id}/delete/")
        self.assertEqual(response.status_code, 204)

        collection = Collection.objects.get(id=collection.id)
        self.assertEqual(len(collection.contents.all()), 1)
