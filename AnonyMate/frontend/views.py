from django.shortcuts import render

# Create your views here.
def signup(request, *args, **kwargs):
    return render(request, "frontend/signup.html")
