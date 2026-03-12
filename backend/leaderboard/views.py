from __future__ import annotations

from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from .models import Score
from .serializers import ScoreSerializer


class ScoreListCreateView(ListCreateAPIView[Score]):
    serializer_class = ScoreSerializer
    permission_classes = [AllowAny]

    def get_queryset(self) -> "rest_framework.queryset.QuerySet[Score]":  # type: ignore[override]
        return Score.objects.order_by("-score")[:10]
