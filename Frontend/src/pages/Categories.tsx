
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Grid2X2, CalendarCheck } from "lucide-react";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/lib/mockData";

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const decodedCategory = category ? decodeURIComponent(category) : "";
  
  // Filter events by the selected category
  const filteredEvents = mockEvents.filter(
    event => event.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (filteredEvents.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">{decodedCategory} Events</h1>
        <div className="text-center py-12">
          <p className="text-xl mb-6">No events found in this category.</p>
          <Button asChild>
            <Link to="/">Back to All Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{decodedCategory} Events</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setViewMode("list")}
            >
              <CalendarCheck className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 mb-8`}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} viewMode={viewMode} />
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link to="/">Back to All Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
