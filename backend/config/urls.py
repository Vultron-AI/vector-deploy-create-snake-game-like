from __future__ import annotations
from config.views import spa_index

from django.urls import re_path,  include, path

urlpatterns = [
    path("api/leaderboard/", include("leaderboard.urls")),

    # SPA catch-all: serve index.html for any route not matched above.
    # Must be last — Django tries patterns in order.
    re_path(r"^(?!api/|admin/|static/|assets/).*$", spa_index),
]
