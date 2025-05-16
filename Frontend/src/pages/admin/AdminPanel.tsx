import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { eventsAPI } from '../../services/api';
import { Event } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface EventFormData {
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: string;
  imageUrl: string;
}

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    category: '',
    date: '',
    venue: '',
    price: '',
    imageUrl: '',
  });

  const { data: events = [], isLoading } = useQuery('events', eventsAPI.getAll);

  const createEventMutation = useMutation(eventsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
      handleClose();
    },
  });

  const updateEventMutation = useMutation(
    (data: { id: string; event: Partial<Event> }) =>
      eventsAPI.update(data.id, data.event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
        handleClose();
      },
    }
  );

  const deleteEventMutation = useMutation(eventsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  const handleOpen = (event?: Event) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        category: event.category,
        date: new Date(event.date).toISOString().split('T')[0],
        venue: event.venue,
        price: event.price.toString(),
        imageUrl: event.imageUrl || '',
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        date: '',
        venue: '',
        price: '',
        imageUrl: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      date: '',
      venue: '',
      price: '',
      imageUrl: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (selectedEvent) {
      await updateEventMutation.mutateAsync({
        id: selectedEvent.id,
        event: eventData,
      });
    } else {
      await createEventMutation.mutateAsync(eventData);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEventMutation.mutateAsync(id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Loading events...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Event Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Create New Event
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>
                  {new Date(event.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>${event.price}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(event)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(event.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                label="Event Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <TextField
                required
                fullWidth
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <TextField
                required
                fullWidth
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                required
                fullWidth
                label="Venue"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
              />
              <TextField
                required
                fullWidth
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Image URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEvent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 