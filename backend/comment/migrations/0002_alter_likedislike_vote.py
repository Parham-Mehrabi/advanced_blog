# Generated by Django 4.2.1 on 2023-05-31 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedislike',
            name='vote',
            field=models.SmallIntegerField(choices=[(1, 'Like'), (0, 'Dislike')]),
        ),
    ]
