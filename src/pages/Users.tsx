import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit2, Trash2 } from 'lucide-react';
import { User, UserRole } from '../types';
import { format } from 'date-fns';

// Mock data - replace with actual API calls
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Pathways Representative',
    enabled: true,
    lastSignIn: new Date('2024-02-20T10:30:00'),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    enabled: true,
    lastSignIn: new Date('2024-02-19T15:45:00'),
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Pathways Representative',
    enabled: true,
    lastSignIn: new Date('2024-02-21T09:15:00'),
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Assisted Living Administrator',
    enabled: true,
    lastSignIn: new Date('2024-02-22T14:20:00'),
    createdAt: new Date('2024-01-04'),
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Property Manager',
    enabled: true,
    lastSignIn: new Date('2024-02-23T11:30:00'),
    createdAt: new Date('2024-01-05'),
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    role: '' as UserRole,
    enabled: true,
    password: '',
  });

  const roles: UserRole[] = [
    'Pathways Representative',
    'Assisted Living Administrator',
    'Property Manager',
    'Admin',
  ];

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
      enabled: user.enabled,
      password: '',
    });
    setDialogOpen(true);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      setUsers(users.map(user => 
        user.id === editUser.id 
          ? { ...user, ...editData }
          : user
      ));
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Sign In</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.enabled}
                    onChange={() => {
                      setUsers(users.map(u =>
                        u.id === user.id ? { ...u, enabled: !u.enabled } : u
                      ));
                    }}
                  />
                </TableCell>
                <TableCell>
                  {user.lastSignIn ? format(user.lastSignIn, 'PPp') : 'Never'}
                </TableCell>
                <TableCell>{format(user.createdAt, 'PP')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)} size="small">
                    <Edit2 size={16} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} size="small" color="error">
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              select
              label="Role"
              variant="outlined"
              margin="normal"
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value as UserRole })}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={editData.password}
              onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              helperText="Leave blank to keep current password"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editData.enabled}
                  onChange={(e) => setEditData({ ...editData, enabled: e.target.checked })}
                />
              }
              label="Account Enabled"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Changes</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}