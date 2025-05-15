from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Event, Category

User = get_user_model()

class EventAPITestCase(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(
            username='admin',
            password='password123',
            email='admin@example.com',
            role='ADMIN'
        )
        self.regular_user = User.objects.create_user(
            username='user',
            password='password123',
            email='user@example.com'
        )
        
        self.category = Category.objects.create(name='Test Category')
        
        self.event = Event.objects.create(
            name='Test Event',
            description='Test Description',
            date='2025-06-01T12:00:00Z',
            venue='Test Venue',
            price=99.99,
            category=self.category
        )
        
        self.client = APIClient()
    
    def test_get_events_list(self):
        response = self.client.get(reverse('event-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Event')
    
    def test_create_event_as_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'New Event',
            'description': 'New Description',
            'date': '2025-07-01T12:00:00Z',
            'venue': 'New Venue',
            'price': 149.99,
            'category': self.category.id
        }
        response = self.client.post(reverse('event-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 2)
    
    def test_create_event_as_regular_user(self):
        self.client.force_authenticate(user=self.regular_user)
        data = {
            'name': 'New Event',
            'description': 'New Description',
            'date': '2025-07-01T12:00:00Z',
            'venue': 'New Venue',
            'price': 149.99,
            'category': self.category.id
        }
        response = self.client.post(reverse('event-list'), data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Event.objects.count(), 1)  # No new event created