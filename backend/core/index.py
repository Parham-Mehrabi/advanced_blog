from django.shortcuts import render


def index(req):
    """
        render our index.html where we serve our React app
    """
    return render(req, 'index.html')
