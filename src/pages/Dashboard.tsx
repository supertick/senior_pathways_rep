import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Container,
  Badge,
  Avatar,
} from '@mui/material';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Activity, 
  Menu as MenuIcon, 
  LogOut, 
  UserCog, 
  Building2, 
  ContactIcon as ContactsIcon, 
  Inbox, 
  CheckSquare,
  BookOpen
} from 'lucide-react';
import { User } from '../types';
import ClientSearch from '../components/ClientSearch';
import Calendar from '../components/Calendar';
import WorkflowDiagram from '../components/WorkflowDiagram';
import UsersPage from './Users';
import Companies from './Companies';
import Contacts from './Contacts';
import Tasks from './Tasks';
import Profile from './Profile';
import Guidelines from './Guidelines';
import NotificationsMenu from '../components/NotificationsMenu';

const drawerWidth = 240;

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState<'calendar' | 'clients' | 'workflow' | 'users' | 'companies' | 'contacts' | 'tasks' | 'profile' | 'guidelines'>('tasks');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ bgcolor: 'grey.50', height: '100%' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'grey.200' }}>
        <Typography variant="h6" noWrap component="div" color="text.primary">
          SeniorPathways
        </Typography>
      </Toolbar>
      <List>
        <ListItem button onClick={() => setActiveView('tasks')} selected={activeView === 'tasks'}>
          <ListItemIcon>
            <CheckSquare color={activeView === 'tasks' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('calendar')} selected={activeView === 'calendar'}>
          <ListItemIcon>
            <CalendarIcon color={activeView === 'calendar' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('clients')} selected={activeView === 'clients'}>
          <ListItemIcon>
            <Users color={activeView === 'clients' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('workflow')} selected={activeView === 'workflow'}>
          <ListItemIcon>
            <Activity color={activeView === 'workflow' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Workflow" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('companies')} selected={activeView === 'companies'}>
          <ListItemIcon>
            <Building2 color={activeView === 'companies' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('contacts')} selected={activeView === 'contacts'}>
          <ListItemIcon>
            <ContactsIcon color={activeView === 'contacts' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem button onClick={() => setActiveView('guidelines')} selected={activeView === 'guidelines'}>
          <ListItemIcon>
            <BookOpen color={activeView === 'guidelines' ? '#424242' : '#757575'} />
          </ListItemIcon>
          <ListItemText primary="Guidelines" />
        </ListItem>
        {user.role === 'Admin' && (
          <ListItem button onClick={() => setActiveView('users')} selected={activeView === 'users'}>
            <ListItemIcon>
              <UserCog color={activeView === 'users' ? '#424242' : '#757575'} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'grey.100', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'grey.50',
          borderBottom: 1,
          borderColor: 'grey.200',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </Typography>
          <NotificationsMenu />
          <IconButton 
            color="inherit" 
            onClick={() => setActiveView('tasks')}
            sx={{ mx: 1 }}
          >
            <Badge badgeContent={4} color="primary">
              <Inbox />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={() => setActiveView('profile')}
            sx={{ ml: 1 }}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/login')} sx={{ ml: 1 }}>
            <LogOut />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'grey.50',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'grey.50',
              borderRight: 1,
              borderColor: 'grey.200',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'grey.100',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          {activeView === 'calendar' && <Calendar user={user} />}
          {activeView === 'clients' && <ClientSearch user={user} />}
          {activeView === 'workflow' && <WorkflowDiagram user={user} />}
          {activeView === 'companies' && <Companies />}
          {activeView === 'contacts' && <Contacts />}
          {activeView === 'users' && <UsersPage />}
          {activeView === 'tasks' && <Tasks user={user} />}
          {activeView === 'profile' && <Profile user={user} />}
          {activeView === 'guidelines' && <Guidelines />}
        </Container>
      </Box>
    </Box>
  );
}