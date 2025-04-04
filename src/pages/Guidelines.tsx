import React from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

const guidelines = {
  'Initial Contact': [
    'Schedule initial consultation within 48 hours of first contact',
    'Gather comprehensive contact information for client and family members',
    'Document immediate concerns and priorities',
    'Provide overview of services and process',
  ],
  'Assessment': [
    'Complete full needs assessment within one week of initial contact',
    'Document all medical requirements and preferences',
    'Evaluate financial considerations and budget constraints',
    'Identify immediate and long-term care needs',
  ],
  'Facility Selection': [
    'Present minimum of three facility options matching client criteria',
    'Schedule facility tours within two weeks of assessment',
    'Document feedback and preferences after each tour',
    'Provide detailed comparison of selected facilities',
  ],
  'Care Planning': [
    'Develop comprehensive care plan within 72 hours of facility selection',
    'Include all medical requirements and preferences',
    'Document medication schedules and special needs',
    'Outline daily activities and social engagement plans',
  ],
  'Transition Support': [
    'Create detailed transition timeline',
    'Coordinate with facility staff for move-in process',
    'Arrange transportation and moving services if needed',
    'Schedule family orientation at new facility',
  ],
  'Follow-up Care': [
    'Conduct 24-hour post-move check-in',
    'Schedule weekly check-ins for first month',
    'Monthly follow-up visits for first three months',
    'Quarterly assessments thereafter',
  ],
};

export default function Guidelines() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Company Guidelines
      </Typography>
      <Box sx={{ mt: 3 }}>
        {Object.entries(guidelines).map(([category, items], index) => (
          <Accordion key={category} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              sx={{ bgcolor: 'grey.50' }}
            >
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {items.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
}