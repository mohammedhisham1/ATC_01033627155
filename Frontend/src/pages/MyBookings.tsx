
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { Link } from "react-router-dom";

const MyBookings = () => {
  // Mock booked events (in a real app, this would come from an API)
  const bookedEvents = mockEvents.filter(event => event.isBooked);
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookedEvents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">You don't have any bookings yet!</h2>
          <p className="text-muted-foreground mb-6">Explore our events and book your first experience</p>
          <Button asChild>
            <Link to="/">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookedEvents.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="h-48 md:w-1/3 object-cover"
                />
                <div className="flex-1">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(event.date).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="font-medium">
                        Ticket Price: ${event.price.toFixed(2)}
                      </div>
                      <Button asChild variant="outline">
                        <Link to={`/event/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
