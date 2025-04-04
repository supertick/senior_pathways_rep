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
  Chip,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { Calendar, CheckCircle2, AlertCircle, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../types';

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Initial Consultation',
    description: 'First meeting with Alice Johnson',
    dueDate: new Date('2024-03-15T14:00:00'),
    priority: 'high',
    status: 'pending',
    type: 'meeting',
    assignedTo: 'John Robinson',
    clientId: '1',
    clientName: 'Alice Johnson',
  },
  {
    id: '2',
    title: 'Facility Tour',
    description: 'Tour of Sunset Senior Living with Charles Wilson',
    dueDate: new Date('2024-03-20T10:00:00'),
    priority: 'medium',
    status: 'pending',
    type: 'assessment',
    assignedTo: 'John Robinson',
    clientId: '2',
    clientName: 'Charles Wilson',
  },
  // Add more mock tasks...
];

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

const typeIcons = {
  meeting: Calendar,
  followup: CheckCircle2,
  assessment: AlertCircle,
  documentation: ClipboardList,
};

export default function Tasks() {
  const [tasks] = useState<Task[]>(mockTasks);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Tasks</Typography>
        <Button variant="contained" color="primary">
          Create Task
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              const TypeIcon = typeIcons[task.type];
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <IconButton size="small">
                      <TypeIcon size={16} />
                    </IconButton>
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.clientName}</TableCell>
                  <TableCell>{format(task.dueDate, 'PPp')}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={priorityColors[task.priority]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}