# Generated by Django 3.1 on 2021-03-09 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_auto_20210309_0308'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, max_length=200)),
                ('privacyLevel', models.CharField(choices=[('Public', 'Public'), ('Private', 'Private'), ('Personal', 'Personal')], max_length=15, verbose_name='privacy level')),
                ('categories', models.ManyToManyField(to='content.Category', verbose_name='list of categories')),
                ('collections', models.ManyToManyField(related_name='_collection_collections_+', to='content.Collection', verbose_name='list of collections')),
                ('contents', models.ManyToManyField(to='content.Content', verbose_name='list of content')),
            ],
        ),
    ]
