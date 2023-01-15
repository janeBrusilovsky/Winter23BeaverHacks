from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .forms import AccountForm
from .models import User


def index(request):
    return render(request, 'emotion_game/index.html')


def player_home(request, player_name):
    return render(request, 'emotion_game/player_home.html', {'username': player_name})


def create_account(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        if form.is_valid():
            # Create User Model object and save to db
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = User(username=username, password=password)
            user.save()

            return HttpResponseRedirect('/emotion_game/home/%s' % username)
        else:
            return render(request, 'emotion_game/create_account.html', {'form': form})
    else:
        form = AccountForm()
        return render(request, 'emotion_game/create_account.html', {'form': form})


def identify_emotion_game(request, player_name):
    return render(request, 'emotion_game/identify_game.html', {'username': player_name})


def copy_emotion_game(request, player_name):
    return render(request, 'index.html', {'username': player_name})


def score_report(request, player_name):
    response = "This is the score report page for %s"
    return HttpResponse(response % player_name)
