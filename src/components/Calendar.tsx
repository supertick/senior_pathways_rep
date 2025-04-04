import React, { useState, useEffect } from 'react';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { User } from '../types';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  clientId?: string;
  description?: string;
  representative: string;
}

// Mock client meetings data
const mockMeetings: Event[] = [
  {
    id: '1',
    title: 'Alice Johnson',
    start: new Date('2025-03-15T14:00:00'),
    end: new Date('2025-03-15T15:00:00'),
    clientId: '1',
    description: 'Initial consultation',
    representative: 'John Robinson',
  },
  {
    id: '2',
    title: 'Charles Wilson',
    start: new Date('2025-03-20T10:00:00'),
    end: new Date('2025-03-20T11:00:00'),
    clientId: '2',
    description: 'Facility tour discussion',
    representative: 'John Robinson',
  },
  {
    id: '3',
    title: 'Emma Davis',
    start: new Date('2025-03-22T13:00:00'),
    end: new Date('2025-03-22T14:00:00'),
    clientId: '4',
    description: 'Financial planning review',
    representative: 'John Robinson',
  },
  {
    id: '4',
    title: 'David Brown',
    start: new Date('2025-03-18T11:00:00'),
    end: new Date('2025-03-18T12:00:00'),
    clientId: '3',
    description: 'Home care assessment',
    representative: 'Jane Smith',
  },
  {
    id: '5',
    title: 'Robert Martinez',
    start: new Date('2025-03-25T09:00:00'),
    end: new Date('2025-03-25T10:00:00'),
    clientId: '5',
    description: 'Memory care facility tour',
    representative: 'John Robinson',
  },
  {
    id: '6',
    title: 'Sarah Thompson',
    start: new Date('2025-03-27T15:00:00'),
    end: new Date('2025-03-27T16:00:00'),
    clientId: '6',
    description: 'Follow-up consultation',
    representative: 'John Robinson',
  },
  {
    id: '7',
    title: 'Michael Lee',
    start: new Date('2025-03-19T13:30:00'),
    end: new Date('2025-03-19T14:30:00'),
    clientId: '7',
    description: 'Transportation services review',
    representative: 'Jane Smith',
  },
  {
    id: '8',
    title: 'Patricia Garcia',
    start: new Date('2025-03-21T11:00:00'),
    end: new Date('2025-03-21T12:00:00'),
    clientId: '8',
    description: 'Initial needs assessment',
    representative: 'John Robinson',
  },
  {
    id: '9',
    title: 'Jane Smith',
    start: new Date('2025-04-1T11:00:00'),
    end: new Date('2025-04-1T12:00:00'),
    clientId: '8',
    description: 'Initial needs assessment',
    representative: 'John Robinson',
  },

];

interface CalendarProps {
  user: User;
}

export default function Calendar({ user }: CalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);

  useEffect(() => {
    // Filter meetings based on user role and name
    const filteredMeetings = user.role === 'Admin'
      ? mockMeetings
      : mockMeetings.filter(meeting => meeting.representative === user.name);
    setEvents(filteredMeetings);
  }, [user]);

  const handleEventClick = (arg: EventClickArg) => {
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start!,
      end: arg.event.end!,
      description: arg.event.extendedProps.description,
      clientId: arg.event.extendedProps.clientId,
      representative: arg.event.extendedProps.representative,
    });
    setDialogOpen(true);
  };

  const handleDateSelect = (arg: DateSelectArg) => {
    setNewEvent({
      start: arg.start,
      end: arg.end,
      representative: user.name,
    });
    setNewEventDialogOpen(true);
  };

  const handleNewEventSubmit = () => {
    if (newEvent?.title) {
      setEvents([
        ...events,
        {
          id: Math.random().toString(36).substring(2),
          title: newEvent.title,
          start: newEvent.start!,
          end: newEvent.end!,
          description: newEvent.description,
          clientId: newEvent.clientId,
          representative: newEvent.representative!,
        },
      ]);
      setNewEvent(null);
      setNewEventDialogOpen(false);
    }
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      setDialogOpen(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Meeting Schedule
      </Typography>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        select={handleDateSelect}
        height="auto"
      />

      {/* View/Edit Event Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Meeting Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography>
                Start: {selectedEvent.start.toLocaleString()}
                <br />
                End: {selectedEvent.end.toLocaleString()}
              </Typography>
              {selectedEvent.description && (
                <Typography sx={{ mt: 2 }}>
                  Description: {selectedEvent.description}
                </Typography>
              )}
              {selectedEvent.clientId && (
                <Typography>Client ID: {selectedEvent.clientId}</Typography>
              )}
              <Typography sx={{ mt: 2 }}>
                Representative: {selectedEvent.representative}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEventDelete} color="error">
            Delete
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* New Event Dialog */}
      <Dialog open={newEventDialogOpen} onClose={() => setNewEventDialogOpen(false)}>
        <DialogTitle>Add New Meeting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newEvent?.title || ''}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newEvent?.description || ''}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Client ID"
            fullWidth
            value={newEvent?.clientId || ''}
            onChange={(e) => setNewEvent({ ...newEvent, clientId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewEventDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleNewEventSubmit} variant="contained">
            Add Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}