from rest_framework import serializers
from .models import Event, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class EventSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    is_booked = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = ('id', 'name', 'description', 'date', 'venue', 'price', 
                  'image', 'category', 'category_name', 'is_booked')
    
    def get_is_booked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.bookings.filter(user=request.user).exists()
        return False