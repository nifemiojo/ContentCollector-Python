from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient


from .models import Content, Collection, Tag

# Create your tests here.
class CollectionTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='lamideD', password='offthewall')
        self.user2 = User.objects.create_user(username='TestUser', password='hello123')
        Collection.objects.create(name="My Favourite Youtubers", privacyLevel="Public", user=self.user1)
        Collection.objects.create(name="Collection 2", privacyLevel="Public", user=self.user1)
        Collection.objects.create(name="Collection 3", privacyLevel="Public", user=self.user1)
        Collection.objects.create(name="Collection 4", privacyLevel="Public", user=self.user2)

        """ cnt1 = Content.objects.create(title="Learning React, 2nd Edition", description="React Book")
        cnt2 = Content.objects.create(title="Django By Example", description="Django book")
        cnt3 = Content.objects.create(title="Coding Entrepreneurs", description="Coding Youtuber", link="https://www.youtube.com/")

        ctg1 = Tag.objects.create(name="Coding")
        ctg2 = Tag.objects.create(name="Twitter")

        clt1.contents.add(cnt1, cnt2, cnt3)
        clt1.categories.add(ctg1)
        clt2.categories.add(ctg2) """

    def test_user_created(self):
        users = User.objects.all()
        self.assertEqual(len(users), 2)

    def test_collection_created(self):
        clt1 = Collection.objects.create(name="Banking Interview Resources", privacyLevel="Public", user=self.user1)
        obj = Collection.objects.get(id=5)
        self.assertEqual(clt1.name, "Banking Interview Resources")
        
    def get_client(self):
        client = APIClient()
        client.login(username='lamideD', password='offthewall')
        return client

    def test_user_collections_list(self):
        client = self.get_client()
        response = client.get("http://localhost:8080/api/collection/userlist.json/", format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_create_collection(self):
        client = self.get_client()
        response = client.post("/api/collection/save/", 
            {'name': "New Collection", 'description': "Testing create api", 'privacyLevel': "Private"}, format='json')
        clt = Collection.objects.get(name="New Collection")
        self.assertEqual(clt.user.id, self.user1.id)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json().get('name'), 'New Collection')

    def test_edit_collection(self):
        client = self.get_client()
        clt = Collection.objects.get(name="Collection 2")
        response = client.put(f"/api/collection/edit/{clt.id}/", 
            {'name': "Edited Collection", 'description': "Edited", 'privacyLevel': "Private"}, format='json')
        self.assertEqual(response.status_code, 200)

        newClt = Collection.objects.get(id=clt.id)
        self.assertEqual(newClt.description, "Edited")

    def test_delete_collection(self):
        client = self.get_client()
        clt = Collection.objects.get(name="Collection 3")
        response = client.delete(f"/api/collection/edit/{clt.id}/")
        self.assertEqual(response.status_code, 204)

        clts = Collection.objects.filter(user=self.user1)
        self.assertEqual(len(clts), 2)
