python manage.py makemigrations
python manage.py migrate
gunicorn core.wsgi --bind 0.0.0.0:8000 --access-logfile -  --error-logfile -
