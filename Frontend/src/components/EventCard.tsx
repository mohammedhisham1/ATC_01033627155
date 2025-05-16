
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Define the event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  imageUrl: string;
  category: string;
  price: number;  // Added the price property back
  isBooked?: boolean;
}

interface EventCardProps {
  event: Event;
  viewMode: "grid" | "list";
}

const EventCard = ({ event, viewMode }: EventCardProps) => {
  const { id, title, description, date, venue, imageUrl, category, isBooked } = event;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${
      viewMode === "list" ? "flex flex-col md:flex-row" : ""
    } group border-muted/50 hover:border-primary/50`}>
      <div className={`relative ${viewMode === "list" ? "md:w-1/3 w-full" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <img 
          src={imageUrl} 
          alt={title} 
          className={`aspect-video w-full object-cover ${
            viewMode === "list" ? "md:h-full h-48" : ""
          } transition-transform group-hover:scale-105`}
        />
        <Badge 
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground"
          variant="outline"
        >
          {category}
        </Badge>
      </div>
      <div className={viewMode === "list" ? "md:w-2/3 w-full" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl mb-1 line-clamp-1">{title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{venue}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter>
          {isBooked ? (
            <Badge variant="secondary" className="font-medium">Booked</Badge>
          ) : (
            <Button asChild>
              <Link to={`/event/${id}`}>Book Now</Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default EventCard;
