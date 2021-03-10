from django.test import TestCase

from .models import Content, Collection, Category

# Create your tests here.
class CollectionTestCase(TestCase):
    def setUp(self):
        clt1 = Collection.objects.create(name="Project Resources", privacyLevel="Public")
        clt2 = Collection.objects.create(name="Favourite Tweeters", privacyLevel="Private")

        cnt1 = Content.objects.create(title="Learning React, 2nd Edition", description="React Book")
        cnt2 = Content.objects.create(title="Django By Example", description="Django book")
        cnt3 = Content.objects.create(title="Coding Entrepreneurs", description="Coding Youtuber", link="https://www.youtube.com/")

        ctg1 = Category.objects.create(name="Coding")
        ctg2 = Category.objects.create(name="Twitter")

        clt1.contents.add(cnt1, cnt2, cnt3)
        clt1.categories.add(ctg1)
        clt2.categories.add(ctg2)


    def test_initialContentIntegration(self):
        allCnt = Content.objects.all()
        self.assertEqual(len(allCnt), 3)

    def test_initialContentIntegration(self):
        clt2 = Collection.objects.get(id=2)
        self.assertEqual(clt2.id, 2)

"""     def test_content_relation_integration_test(self):
        content = Content(title="Learning React, 2nd Edition", description="book")
        content.save()
        testContent = Content.objects.get(title="Learning React, 2nd Edition")
        self.assertEqual(testContent.description, 'book') """
