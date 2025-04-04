import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { Edit2, Trash2, Plus, Phone, Mail } from 'lucide-react';
import { Contact } from '../types';

// Mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jane Smith',
    title: 'Facility Director',
    company: 'Sunset Senior Living',
    phone: '555-0102',
    email: 'jane.smith@sunsetliving.com',
    notes: 'Primary contact for facility tours',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    name: 'Michael Johnson',
    title: 'Care Coordinator',
    company: 'Golden Years Home Care',
    phone: '555-0103',
    email: 'michael.j@goldenyears.com',
    notes: 'Handles all new client assessments',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Sarah Williams',
    title: 'Nursing Director',
    company: 'Evergreen Nursing Center',
    phone: '555-0104',
    email: 's.williams@evergreennursing.com',
    notes: 'Available for urgent care consultations',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: '4',
    name: 'Robert Davis',
    title: 'Community Manager',
    company: 'Riverside Senior Community',
    phone: '555-0105',
    email: 'r.davis@riversidesenior.com',
    notes: 'Manages all community events and activities',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '5',
    name: 'Emily Chen',
    title: 'Medical Director',
    company: 'Heritage Medical Center',
    phone: '555-0106',
    email: 'e.chen@heritagemedical.com',
    notes: 'Specializes in geriatric care',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-05'),
  },
];

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(null);

  const handleAddEdit = (contact?: Contact) => {
    setEditingContact(contact || {
      name: '',
      title: '',
      company: '',
      phone: '',
      email: '',
      notes: '',
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      if (editingContact.id) {
        // Update existing contact
        setContacts(contacts.map(contact =>
          contact.id === editingContact.id
            ? { ...editingContact as Contact, updatedAt: new Date() }
            : contact
        ));
      } else {
        // Add new contact
        const newContact: Contact = {
          ...editingContact as Contact,
          id: Math.random().toString(36).substring(2),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setContacts([...contacts, newContact]);
      }
      setDialogOpen(false);
      setEditingContact(null);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Contacts</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleAddEdit()}
        >
          Add Contact
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.title}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" href={`tel:${contact.phone}`}>
                      <Phone size={16} />
                    </IconButton>
                    <IconButton size="small" href={`mailto:${contact.email}`}>
                      <Mail size={16} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleAddEdit(contact)}>
                    <Edit2 size={16} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(contact.id)} color="error">
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingContact?.id ? 'Edit Contact' : 'Add Contact'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={editingContact?.name || ''}
              onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              value={editingContact?.title || ''}
              onChange={(e) => setEditingContact({ ...editingContact, title: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Company"
              margin="normal"
              value={editingContact?.company || ''}
              onChange={(e) => setEditingContact({ ...editingContact, company: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={editingContact?.phone || ''}
              onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              value={editingContact?.email || ''}
              onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Notes"
              margin="normal"
              multiline
              rows={4}
              value={editingContact?.notes || ''}
              onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingContact?.id ? 'Save Changes' : 'Add Contact'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}