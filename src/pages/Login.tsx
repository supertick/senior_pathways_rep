import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
} from '@mui/material';
import { Building2 } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@seniorpathways.com',
    role: 'Admin' as UserRole,
    enabled: true,
    createdAt: new Date(),
    lastSignIn: new Date(),
  },
  {
    id: '2',
    name: 'John Robinson',
    email: 'john@seniorpathways.com',
    role: 'Pathways Representative' as UserRole,
    enabled: true,
    createdAt: new Date(),
    lastSignIn: new Date(),
  },
];

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole,
  });
  const [signupError, setSignupError] = useState('');

  const roles: UserRole[] = [
    'Pathways Representative',
    'Assisted Living Administrator',
    'Property Manager',
    'Admin',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'seniorpathways123') { // Mock password check
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      return;
    }
    // Mock signup - replace with actual registration
    setSignupOpen(false);
    setSignupData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '' as UserRole,
    });
    setSignupError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #2E5077 0%, #8C4F37 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={4}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Building2 size={48} color="#2E5077" />
              <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                SeniorPathways
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Representative Portal
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="text"
                size="large"
                sx={{ mt: 1 }}
                onClick={() => setSignupOpen(true)}
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>

      <Dialog open={signupOpen} onClose={() => setSignupOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Account</DialogTitle>
        <form onSubmit={handleSignupSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              select
              label="Role"
              variant="outlined"
              margin="normal"
              value={signupData.role}
              onChange={(e) => setSignupData({ ...signupData, role: e.target.value as UserRole })}
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
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              required
              error={!!signupError}
              helperText={signupError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSignupOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create Account</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}