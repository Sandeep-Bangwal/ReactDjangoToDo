# Generated by Django 4.1.3 on 2023-08-25 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='tasks',
            fields=[
                ('task_id', models.AutoField(primary_key=True, serialize=False)),
                ('tasks_desc', models.TextField()),
                ('status', models.CharField(default='In Progress', max_length=50)),
            ],
        ),
    ]
