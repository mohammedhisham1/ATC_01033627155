from django.db import models
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Venue(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=500)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    location = gis_models.PointField(null=True, blank=True)
    capacity = models.IntegerField()
    amenities = models.JSONField(default=dict)
    
    def __str__(self):
        return self.name

class Event(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('cancelled', 'Cancelled'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='events')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    images = models.JSONField(default=list)  # Store multiple image URLs
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='events')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    total_tickets = models.IntegerField()
    available_tickets = models.IntegerField()
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class EventAvailability(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='availability')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    available_seats = models.IntegerField()
    price_override = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    class Meta:
        unique_together = ['event', 'date']
        
    def __str__(self):
        return f"{self.event.title} - {self.date}"