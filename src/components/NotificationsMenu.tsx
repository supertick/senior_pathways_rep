import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Bell } from 'lucide-react';
import { Notification } from '../types';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Meeting Scheduled',
    message: 'Meeting with Alice Johnson scheduled for tomorrow at 2 PM',
    type: 'info',
    timestamp: new Date('2024-03-14T10:00:00'),
    read: false,
    link: '/dashboard/calendar',
  },
  {
    id: '2',
    title: 'Task Due Soon',
    message: 'Facility tour with Charles Wilson due in 2 days',
    type: 'warning',
    timestamp: new Date('2024-03-13T15:30:00'),
    read: false,
    link: '/dashboard/tasks',
  },
  // Add more notifications...
];

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));
    handleClose();
    // Navigate to the link if provided
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <Bell />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 350, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            sx={{
              py: 2,
              px: 3,
              borderLeft: 3,
              borderColor: theme => 
                notification.type === 'warning' ? theme.palette.warning.main :
                notification.type === 'error' ? theme.palette.error.main :
                notification.type === 'success' ? theme.palette.success.main :
                theme.palette.info.main,
              bgcolor: notification.read ? 'transparent' : 'action.hover',
            }}
          >
            <Box>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(notification.timestamp).toLocaleString()}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}