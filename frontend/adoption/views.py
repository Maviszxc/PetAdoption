from django.http import HttpRequest
from django.shortcuts import render

import requests

# Create your views here.

def home(request):

    return render(request, 'home/index.html')
