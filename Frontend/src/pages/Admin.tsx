
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash } from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { Event } from "@/components/EventCard";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setCurrentEvent(event);
    } else {
      setCurrentEvent({
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        description: "",
        date: new Date().toISOString(),
        venue: "",
        price: 0,
        imageUrl: "",
        category: "",
        isBooked: false
      });
    }
    setIsDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter(event => event.id !== currentEvent.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted."
      });
    }
  };
  
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEvent) return;
    
    // Check for existing event
    const existingEventIndex = events.findIndex(event => event.id === currentEvent.id);
    
    if (existingEventIndex >= 0) {
      // Update existing event
      const updatedEvents = [...events];
      updatedEvents[existingEventIndex] = currentEvent;
      setEvents(updatedEvents);
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated."
      });
    } else {
      // Add new event
      setEvents([...events, currentEvent]);
      toast({
        title: "Event Created",
        description: "The event has been successfully created."
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const handleFieldChange = (field: keyof Event, value: string | number) => {
    if (currentEvent) {
      setCurrentEvent({
        ...currentEvent,
        [field]: value
      });
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      
      <div className="grid gap-6">
        {events.map(event => (
          <Card key={event.id}>
            <div className="flex flex-col md:flex-row">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="h-48 md:w-1/4 object-cover"
              />
              <div className="flex-1">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{event.title}</span>
                    <span className="text-lg font-normal">${event.price.toFixed(2)}</span>
                  </CardTitle>
                  <CardDescription>{event.venue} • {new Date(event.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(event)}>
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleOpenDeleteDialog(event)}>
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Event Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentEvent && currentEvent.title ? "Edit Event" : "Create Event"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    value={currentEvent?.title} 
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={currentEvent?.category} 
                    onChange={(e) => handleFieldChange("category", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={currentEvent?.imageUrl} 
                  onChange={(e) => handleFieldChange("imageUrl", e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date & Time</Label>
                  <Input 
                    id="date" 
                    type="datetime-local"
                    value={currentEvent ? new Date(currentEvent.date).toISOString().slice(0, 16) : ""}
                    onChange={(e) => handleFieldChange("date", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentEvent?.price} 
                    onChange={(e) => handleFieldChange("price", parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input 
                  id="venue" 
                  value={currentEvent?.venue} 
                  onChange={(e) => handleFieldChange("venue", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentEvent?.description} 
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{currentEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>Delete Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
