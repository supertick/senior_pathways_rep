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
  MenuItem,
  Box,
} from '@mui/material';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Company, CompanyType } from '../types';

const companyTypes: CompanyType[] = [
  'Assisted Living',
  'Nursing Home',
  'Home Care',
  'Senior Community',
  'Medical Facility',
  'Other',
];

// Mock data
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Sunset Senior Living',
    type: 'Assisted Living',
    contactInfo: {
      phone: '555-0101',
      email: 'info@sunsetliving.com',
      address: '123 Care Lane',
      website: 'www.sunsetliving.com',
    },
    notes: 'Premium assisted living facility with memory care unit',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    name: 'Golden Years Home Care',
    type: 'Home Care',
    contactInfo: {
      phone: '555-0102',
      email: 'contact@goldenyears.com',
      address: '456 Health Avenue',
      website: 'www.goldenyearshc.com',
    },
    notes: 'Specialized in-home care services with 24/7 availability',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Evergreen Nursing Center',
    type: 'Nursing Home',
    contactInfo: {
      phone: '555-0103',
      email: 'info@evergreennursing.com',
      address: '789 Medical Drive',
      website: 'www.evergreennursing.com',
    },
    notes: 'Full-service nursing facility with rehabilitation services',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: '4',
    name: 'Riverside Senior Community',
    type: 'Senior Community',
    contactInfo: {
      phone: '555-0104',
      email: 'welcome@riversidesenior.com',
      address: '321 River Road',
      website: 'www.riversidesenior.com',
    },
    notes: 'Active adult community with various amenities',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '5',
    name: 'Heritage Medical Center',
    type: 'Medical Facility',
    contactInfo: {
      phone: '555-0105',
      email: 'info@heritagemedical.com',
      address: '567 Wellness Way',
      website: 'www.heritagemedical.com',
    },
    notes: 'Comprehensive medical care facility specializing in senior health',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-05'),
  },
];

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Partial<Company> | null>(null);

  const handleAddEdit = (company?: Company) => {
    setEditingCompany(company || {
      name: '',
      type: 'Other',
      contactInfo: {
        phone: '',
        email: '',
        address: '',
        website: '',
      },
      notes: '',
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompany) {
      if (editingCompany.id) {
        // Update existing company
        setCompanies(companies.map(company =>
          company.id === editingCompany.id
            ? { ...editingCompany as Company, updatedAt: new Date() }
            : company
        ));
      } else {
        // Add new company
        const newCompany: Company = {
          ...editingCompany as Company,
          id: Math.random().toString(36).substring(2),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCompanies([...companies, newCompany]);
      }
      setDialogOpen(false);
      setEditingCompany(null);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Companies</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleAddEdit()}
        >
          Add Company
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.type}</TableCell>
                <TableCell>{company.contactInfo.phone}</TableCell>
                <TableCell>{company.contactInfo.email}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleAddEdit(company)}>
                    <Edit2 size={16} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(company.id)} color="error">
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
            {editingCompany?.id ? 'Edit Company' : 'Add Company'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Company Name"
              margin="normal"
              value={editingCompany?.name || ''}
              onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              select
              label="Type"
              margin="normal"
              value={editingCompany?.type || 'Other'}
              onChange={(e) => setEditingCompany({ ...editingCompany, type: e.target.value as CompanyType })}
              required
            >
              {companyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={editingCompany?.contactInfo?.phone || ''}
              onChange={(e) => setEditingCompany({
                ...editingCompany,
                contactInfo: { ...editingCompany?.contactInfo, phone: e.target.value }
              })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              value={editingCompany?.contactInfo?.email || ''}
              onChange={(e) => setEditingCompany({
                ...editingCompany,
                contactInfo: { ...editingCompany?.contactInfo, email: e.target.value }
              })}
              required
            />
            <TextField
              fullWidth
              label="Address"
              margin="normal"
              multiline
              rows={2}
              value={editingCompany?.contactInfo?.address || ''}
              onChange={(e) => setEditingCompany({
                ...editingCompany,
                contactInfo: { ...editingCompany?.contactInfo, address: e.target.value }
              })}
              required
            />
            <TextField
              fullWidth
              label="Website"
              margin="normal"
              value={editingCompany?.contactInfo?.website || ''}
              onChange={(e) => setEditingCompany({
                ...editingCompany,
                contactInfo: { ...editingCompany?.contactInfo, website: e.target.value }
              })}
            />
            <TextField
              fullWidth
              label="Notes"
              margin="normal"
              multiline
              rows={4}
              value={editingCompany?.notes || ''}
              onChange={(e) => setEditingCompany({ ...editingCompany, notes: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingCompany?.id ? 'Save Changes' : 'Add Company'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}