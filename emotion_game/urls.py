from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/<str:player_name>', views.player_home, name='player_home'),
    path('account/create', views.create_account, name='create_account'),
    path('identify/<str:player_name>', views.identify_emotion_game, name='identify_emotion_game'),
    path('copy/<str:player_name>', views.copy_emotion_game, name='copy_emotion_game'),
    path('scores/<str:player_name>', views.score_report, name='score_report'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
