from __future__ import annotations

from django.db import models

from shared.models import BaseModel


class Score(BaseModel):
    name: models.CharField = models.CharField(max_length=3)
    score: models.IntegerField = models.IntegerField()

    class Meta:
        ordering = ["-score"]

    def __str__(self) -> str:
        return f"{self.name}: {self.score}"
