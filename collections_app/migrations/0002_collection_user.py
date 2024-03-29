# Generated by Django 3.1 on 2021-03-23 03:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('collections_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='collections', to='authentication.user'),
            preserve_default=False,
        ),
    ]
