from rest_framework import serializers
from .models import Booking
from events.serializers import EventSerializer

class BookingSerializer(serializers.ModelSerializer):
    event_details = EventSerializer(source='event', read_only=True)
    
    class Meta:
        model = Booking
        fields = ('id', 'event', 'booking_date', 'event_details')
        read_only_fields = ('booking_date',)
    
    def validate(self, attrs):
        user = self.context['request'].user
        event = attrs['event']
        if Booking.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already booked this event.")
        return attrs
    