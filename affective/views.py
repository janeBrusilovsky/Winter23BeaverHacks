import json
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import AccountForm, LoginForm
from .models import CopyResult, IdentifyResult


def index(request):
    # Authenticate user logins
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                request.session['username'] = username
                return HttpResponseRedirect('/affective/home')
            else:
                messages.warning(request, 'Please enter an existing username with correct password')
                return render(request, 'affective/index.html')
        else:
            messages.warning(request, 'Please enter an existing username with correct password')
            return render(request, 'affective/index.html')
    else:
        if 'username' not in request.session:
            return render(request, 'affective/index.html')
        else:
            return HttpResponseRedirect('/affective/home')


def player_home(request):
    if 'username' not in request.session:
        messages.warning(request, 'Please log in or create an account')
        return HttpResponseRedirect('/affective/')
    else:
        return render(request, 'affective/player_home.html', {'username': request.session['username']})


def create_account(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        if form.is_valid():
            # Create User auth object and save
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            try:
                user = User.objects.create_user(username, None, password)
                request.session['username'] = username
                return HttpResponseRedirect('/affective/home')
            except IntegrityError:
                messages.warning(request, 'Username is already taken')
                return render(request, 'affective/create_account.html', {'form': form})

        else:
            if form.has_error('username'):
                messages.warning(request, 'Please ensure all fields are completed')
            if form.has_error('confirm_password'):
                messages.warning(request, 'Passwords do not match')
            return render(request, 'affective/create_account.html', {'form': form})
    else:
        form = AccountForm()
        return render(request, 'affective/create_account.html', {'form': form})


def identify_emotion_game(request):
    if 'username' not in request.session:
        messages.warning(request, 'Please log in or create an account')
        return HttpResponseRedirect('/affective/')
    else:
        if request.method == 'POST':
            data = json.loads(request.body.decode())
            score = data['score']
            IdentifyResult.objects.create(
                username=request.session['username'], time_played='', score=score)
            return HttpResponse(200)
        else:
            return render(request, 'affective/identify_game.html')


def copy_emotion_game(request):
    if 'username' not in request.session:
        messages.warning(request, 'Please log in or create an account')
        return HttpResponseRedirect('/affective/')
    else:
        if request.method == 'POST':

            return None
        else:
            return render(request, 'index.html')


def score_report(request):
    if 'username' not in request.session:
        messages.warning(request, 'Please log in or create an account')
        return HttpResponseRedirect('/affective/')
    else:
        username = request.session['username']
        copy_results = CopyResult.objects.filter(username__exact=username)\
            .order_by('-time_played')[:30].values('time_played', 'score')
        identify_results = IdentifyResult.objects.filter(username__exact=username)\
            .order_by('-time_played')[:30].values('time_played', 'score')
        return render(request, 'affective/score_report.html',
                      {'copy_results': copy_results, 'identify_results': identify_results, 'username': username})


def logout(request):
    del request.session['username']
    return HttpResponseRedirect('/affective/')
