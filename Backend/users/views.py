from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer
from rest_framework import generics, permissions, viewsets
from .permissions import IsAdmin
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Count
from django.utils import timezone
from events.models import Event
from bookings.models import Booking

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_object(self):
        return self.request.user


class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    
    def perform_create(self, serializer):
        role = self.request.data.get('role', 'USER')
        serializer.save(role=role)

@api_view(['GET'])
@permission_classes([IsAdmin])
def admin_dashboard_stats(request):
    today = timezone.now()
    
    total_users = User.objects.count()
    total_events = Event.objects.count()
    total_bookings = Booking.objects.count()
    upcoming_events = Event.objects.filter(date__gte=today).count()
    
    popular_events = Booking.objects.values('event__name').annotate(
        booking_count=Count('event')
    ).order_by('-booking_count')[:5]
    
    recent_bookings = Booking.objects.select_related('user', 'event').order_by('-booking_date')[:10]
    recent_bookings_data = [
        {
            'id': booking.id,
            'user': booking.user.username,
            'event': booking.event.name,
            'date': booking.booking_date
        }
        for booking in recent_bookings
    ]
    
    return Response({
        'total_users': total_users,
        'total_events': total_events,
        'total_bookings': total_bookings,
        'upcoming_events': upcoming_events,
        'popular_events': popular_events,
        'recent_bookings': recent_bookings_data
    })