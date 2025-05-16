
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid2X2, CalendarCheck, Search } from "lucide-react";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/lib/mockData";
import { Link } from "react-router-dom";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["Music", "Sports", "Arts", "Business", "Food", "Technology", "Wellness", "Education"];

  // Filter events based on search term
  const filteredEvents = mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-10" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover Amazing Events</h1>
            <p className="text-xl mb-8 text-primary-foreground/90">Find and book the best events in your area</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button size="lg" asChild className="px-8">
                <a href="#events">Browse Events</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-background/20 backdrop-blur-sm hover:bg-background/30">
                <Link to="/categories">View Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12" id="events">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("grid")}
                  className="w-24"
                >
                  <Grid2X2 className="h-4 w-4 mr-1" />
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("list")}
                  className="w-24"
                >
                  <CalendarCheck className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No events found matching your search.</p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category} className="hover:shadow-md transition-all hover:border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="text-sm p-0 group"
                    asChild
                  >
                    <Link to={`/categories/${encodeURIComponent(category)}`} className="flex items-center">
                      <span>View Events</span>
                      <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
