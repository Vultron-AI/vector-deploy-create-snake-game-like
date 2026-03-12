from __future__ import annotations

from rest_framework import serializers

from .models import Score


class ScoreSerializer(serializers.ModelSerializer[Score]):
    class Meta:
        model = Score
        fields = "__all__"
