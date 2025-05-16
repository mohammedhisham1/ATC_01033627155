
import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Event } from "@/components/EventCard";

const BookingSuccess = () => {
  const location = useLocation();
  const event = location.state?.event as Event | undefined;
  
  if (!event) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-6">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-lg mb-6">
          Thank you for booking <strong>{event.title}</strong>
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4 pb-4 border-b">
            <div className="text-sm text-muted-foreground">Event</div>
            <div className="font-medium">{event.title}</div>
          </div>
          
          <div className="mb-4 pb-4 border-b">
            <div className="text-sm text-muted-foreground">Date & Time</div>
            <div className="font-medium">
              {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
          
          <div className="mb-4 pb-4 border-b">
            <div className="text-sm text-muted-foreground">Venue</div>
            <div className="font-medium">{event.venue}</div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="font-medium">${event.price.toFixed(2)}</div>
          </div>
        </div>
        
        <Button asChild size="lg">
          <Link to="/my-bookings">View My Bookings</Link>
        </Button>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link to="/">Discover More Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
