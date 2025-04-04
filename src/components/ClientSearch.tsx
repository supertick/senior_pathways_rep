import React, { useState, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Eye, Phone, Mail } from 'lucide-react';
import { Client, User } from '../types';
import { format } from 'date-fns';

// Mock data - replace with actual API calls
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    status: 'assessment',
    needs: ['Downsizing', 'Assisted Living Search'],
    objectives: ['Find smaller home', 'Close to family'],
    contactInfo: {
      phone: '555-0123',
      email: 'alice@example.com',
      address: '123 Main St',
    },
    familyContacts: [
      {
        name: 'Bob Johnson',
        relationship: 'Son',
        phone: '555-0124',
        email: 'bob@example.com',
      },
    ],
    notes: [
      {
        id: '1',
        date: '2024-02-20',
        content: 'Initial consultation completed',
        author: 'John Robinson',
      },
    ],
    representative: 'John Robinson',
    nextMeeting: new Date('2024-03-15T14:00:00'),
  },
  {
    id: '2',
    name: 'Charles Wilson',
    status: 'planning',
    needs: ['Memory Care', 'Financial Planning'],
    objectives: ['Find memory care facility', 'Estate planning'],
    contactInfo: {
      phone: '555-0125',
      email: 'charles@example.com',
      address: '456 Oak St',
    },
    familyContacts: [
      {
        name: 'Mary Wilson',
        relationship: 'Daughter',
        phone: '555-0126',
        email: 'mary@example.com',
      },
    ],
    notes: [
      {
        id: '2',
        date: '2024-02-22',
        content: 'Facility tour scheduled',
        author: 'John Robinson',
      },
    ],
    representative: 'John Robinson',
    nextMeeting: new Date('2024-03-20T10:00:00'),
  },
  {
    id: '3',
    name: 'David Brown',
    status: 'transition',
    needs: ['Home Care', 'Transportation'],
    objectives: ['Arrange home care services', 'Set up transportation schedule'],
    contactInfo: {
      phone: '555-0127',
      email: 'david@example.com',
      address: '789 Pine St',
    },
    familyContacts: [
      {
        name: 'Sarah Brown',
        relationship: 'Daughter',
        phone: '555-0128',
        email: 'sarah@example.com',
      },
    ],
    notes: [
      {
        id: '3',
        date: '2024-02-25',
        content: 'Home care assessment scheduled',
        author: 'Jane Smith',
      },
    ],
    representative: 'Jane Smith',
    nextMeeting: new Date('2024-03-18T11:00:00'),
  },
  {
    id: '4',
    name: 'Emma Davis',
    status: 'initial',
    needs: ['Financial Assessment', 'Legal Planning'],
    objectives: ['Review retirement accounts', 'Create power of attorney'],
    contactInfo: {
      phone: '555-0129',
      email: 'emma@example.com',
      address: '321 Maple St',
    },
    familyContacts: [
      {
        name: 'Tom Davis',
        relationship: 'Son',
        phone: '555-0130',
        email: 'tom@example.com',
      },
    ],
    notes: [
      {
        id: '4',
        date: '2024-02-26',
        content: 'Initial meeting scheduled',
        author: 'John Robinson',
      },
    ],
    representative: 'John Robinson',
    nextMeeting: new Date('2024-03-22T13:00:00'),
  },
];

interface ClientSearchProps {
  user: User;
}

export default function ClientSearch({ user }: ClientSearchProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredClients = useMemo(() => {
    if (user.role === 'Admin') {
      return mockClients;
    }
    return mockClients.filter(client => client.representative === user.name);
  }, [user]);

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Clients</Typography>
          <Button variant="contained" color="primary">
            Add New Client
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Representative</TableCell>
                <TableCell>Next Meeting</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{client.status}</TableCell>
                  <TableCell>{client.representative}</TableCell>
                  <TableCell>
                    {client.nextMeeting ? format(client.nextMeeting, 'PPp') : 'Not scheduled'}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" href={`tel:${client.contactInfo.phone}`}>
                        <Phone size={16} />
                      </IconButton>
                      <IconButton size="small" href={`mailto:${client.contactInfo.email}`}>
                        <Mail size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedClient(client);
                        setDialogOpen(true);
                      }}
                    >
                      <Eye size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle>{selectedClient.name}</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography>
                Phone: {selectedClient.contactInfo.phone}
                <br />
                Email: {selectedClient.contactInfo.email}
                <br />
                Address: {selectedClient.contactInfo.address}
              </Typography>

              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                Needs
              </Typography>
              <Typography>{selectedClient.needs.join(', ')}</Typography>

              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                Objectives
              </Typography>
              <Typography>{selectedClient.objectives.join(', ')}</Typography>

              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                Family Contacts
              </Typography>
              {selectedClient.familyContacts.map((contact, index) => (
                <Typography key={index}>
                  {contact.name} ({contact.relationship})
                  <br />
                  Phone: {contact.phone}
                  <br />
                  Email: {contact.email}
                </Typography>
              ))}

              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                Notes
              </Typography>
              {selectedClient.notes.map((note) => (
                <Box key={note.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">
                    {note.date} - {note.author}
                  </Typography>
                  <Typography>{note.content}</Typography>
                </Box>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}