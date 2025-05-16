
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  
  const event = mockEvents.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBookEvent = () => {
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: "Booking Successful!",
        description: `You have booked a ticket for ${event.title}`,
      });
      navigate("/booking-success", { state: { event } });
    }, 1500);
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-sm">{event.category}</Badge>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.venue}</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-2">About This Event</h2>
            <p>{event.description}</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
              nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam
              nunc nisl eu lectus. Sed euismod, nunc sit amet ultricies lacinia, 
              nisl nisl aliquam nisl, eget aliquam nunc nisl eu lectus.
            </p>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              {event.isBooked ? (
                <div className="mb-4">
                  <Badge variant="secondary" className="w-full py-1 justify-center text-base">
                    Already Booked
                  </Badge>
                </div>
              ) : (
                <Button 
                  className="w-full mb-4" 
                  size="lg" 
                  onClick={handleBookEvent}
                  disabled={isBooking}
                >
                  {isBooking ? "Booking..." : "Book Now"}
                </Button>
              )}
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">• Instant confirmation</p>
                <p className="mb-2">• No refunds available</p>
                <p>• Limited availability</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
