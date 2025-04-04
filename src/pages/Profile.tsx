import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          sx={{ width: 100, height: 100, mr: 3 }}
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
        />
        <Box>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.role}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <List>
        <ListItem>
          <ListItemText
            primary="Email"
            secondary={user.email}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Account Status"
            secondary={user.enabled ? 'Active' : 'Inactive'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Last Sign In"
            secondary={user.lastSignIn ? new Date(user.lastSignIn).toLocaleString() : 'Never'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Member Since"
            secondary={new Date(user.createdAt).toLocaleDateString()}
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" fullWidth>
          Edit Profile
        </Button>
      </Box>
    </Paper>
  );
}