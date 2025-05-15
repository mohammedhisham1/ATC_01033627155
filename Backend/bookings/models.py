from django.db import models
from django.conf import settings
from events.models import Event

# Create your models here.


class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    booking_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'event')  
        
    def __str__(self):
        return f"{self.user.username} - {self.event.name}"