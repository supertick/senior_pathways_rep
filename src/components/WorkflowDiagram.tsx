import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  NodeProps,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Box, 
  Paper, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Drawer,
  IconButton,
  Button,
  TextField,
  Divider,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from '@mui/material';
import { Phone, CalendarRange } from 'lucide-react';
import { User, ClientWorkflow } from '../types';
import { mockClients } from './ClientSearch';
import { useNavigate } from 'react-router-dom';

// Mock workflows with different completion states for each client
const mockWorkflows: { [key: string]: ClientWorkflow } = {
  '1': {
    clientId: '1',
    currentStage: 'initial',
    stages: {
      'initial': {
        id: 'initial',
        label: 'Initial Contact',
        tasks: [
          { id: '1', label: 'Gather contact information', completed: true },
          { id: '2', label: 'Initial phone consultation', completed: false },
          { id: '3', label: 'Schedule first meeting', completed: false },
        ],
        hasIssue: true,
      },
      'assessment': {
        id: 'assessment',
        label: 'Assessment',
        tasks: [
          { id: '4', label: 'Conduct needs assessment', completed: false },
          { id: '5', label: 'Document client preferences', completed: false },
          { id: '6', label: 'Review financial situation', completed: false },
        ],
      },
      'planning': {
        id: 'planning',
        label: 'Planning',
        tasks: [
          { id: '7', label: 'Research suitable facilities', completed: false },
          { id: '8', label: 'Schedule facility tours', completed: false },
          { id: '9', label: 'Review care options', completed: false },
        ],
      },
      'revised-planning': {
        id: 'revised-planning',
        label: 'Revised Planning',
        tasks: [
          { id: '10', label: 'Update care plan', completed: false },
          { id: '11', label: 'Adjust recommendations', completed: false },
          { id: '12', label: 'Review changes with client', completed: false },
        ],
      },
      'transition': {
        id: 'transition',
        label: 'Transition',
        tasks: [
          { id: '13', label: 'Coordinate move-in date', completed: false },
          { id: '14', label: 'Arrange transportation', completed: false },
          { id: '15', label: 'Setup support services', completed: false },
        ],
      },
      'completed': {
        id: 'completed',
        label: 'Completed',
        tasks: [
          { id: '16', label: 'Final documentation', completed: false },
          { id: '17', label: 'Follow-up schedule', completed: false },
          { id: '18', label: 'Client satisfaction survey', completed: false },
        ],
      },
    },
  },
  '2': {
    clientId: '2',
    currentStage: 'assessment',
    stages: {
      'initial': {
        id: 'initial',
        label: 'Initial Contact',
        tasks: [
          { id: '1', label: 'Gather contact information', completed: true },
          { id: '2', label: 'Initial phone consultation', completed: true },
          { id: '3', label: 'Schedule first meeting', completed: true },
        ],
      },
      'assessment': {
        id: 'assessment',
        label: 'Assessment',
        tasks: [
          { id: '4', label: 'Conduct needs assessment', completed: true },
          { id: '5', label: 'Document client preferences', completed: false },
          { id: '6', label: 'Review financial situation', completed: false },
        ],
      },
      'planning': {
        id: 'planning',
        label: 'Planning',
        tasks: [
          { id: '7', label: 'Research suitable facilities', completed: false },
          { id: '8', label: 'Schedule facility tours', completed: false },
          { id: '9', label: 'Review care options', completed: false },
        ],
      },
      'revised-planning': {
        id: 'revised-planning',
        label: 'Revised Planning',
        tasks: [
          { id: '10', label: 'Update care plan', completed: false },
          { id: '11', label: 'Adjust recommendations', completed: false },
          { id: '12', label: 'Review changes with client', completed: false },
        ],
      },
      'transition': {
        id: 'transition',
        label: 'Transition',
        tasks: [
          { id: '13', label: 'Coordinate move-in date', completed: false },
          { id: '14', label: 'Arrange transportation', completed: false },
          { id: '15', label: 'Setup support services', completed: false },
        ],
      },
      'completed': {
        id: 'completed',
        label: 'Completed',
        tasks: [
          { id: '16', label: 'Final documentation', completed: false },
          { id: '17', label: 'Follow-up schedule', completed: false },
          { id: '18', label: 'Client satisfaction survey', completed: false },
        ],
      },
    },
  },
  '3': {
    clientId: '3',
    currentStage: 'transition',
    stages: {
      'initial': {
        id: 'initial',
        label: 'Initial Contact',
        tasks: [
          { id: '1', label: 'Gather contact information', completed: true },
          { id: '2', label: 'Initial phone consultation', completed: true },
          { id: '3', label: 'Schedule first meeting', completed: true },
        ],
      },
      'assessment': {
        id: 'assessment',
        label: 'Assessment',
        tasks: [
          { id: '4', label: 'Conduct needs assessment', completed: true },
          { id: '5', label: 'Document client preferences', completed: true },
          { id: '6', label: 'Review financial situation', completed: true },
        ],
      },
      'planning': {
        id: 'planning',
        label: 'Planning',
        tasks: [
          { id: '7', label: 'Research suitable facilities', completed: true },
          { id: '8', label: 'Schedule facility tours', completed: true },
          { id: '9', label: 'Review care options', completed: true },
        ],
      },
      'revised-planning': {
        id: 'revised-planning',
        label: 'Revised Planning',
        tasks: [
          { id: '10', label: 'Update care plan', completed: true },
          { id: '11', label: 'Adjust recommendations', completed: true },
          { id: '12', label: 'Review changes with client', completed: true },
        ],
      },
      'transition': {
        id: 'transition',
        label: 'Transition',
        tasks: [
          { id: '13', label: 'Coordinate move-in date', completed: true },
          { id: '14', label: 'Arrange transportation', completed: false },
          { id: '15', label: 'Setup support services', completed: false },
        ],
        hasIssue: true,
      },
      'completed': {
        id: 'completed',
        label: 'Completed',
        tasks: [
          { id: '16', label: 'Final documentation', completed: false },
          { id: '17', label: 'Follow-up schedule', completed: false },
          { id: '18', label: 'Client satisfaction survey', completed: false },
        ],
      },
    },
  },
  '4': {
    clientId: '4',
    currentStage: 'completed',
    stages: {
      'initial': {
        id: 'initial',
        label: 'Initial Contact',
        tasks: [
          { id: '1', label: 'Gather contact information', completed: true },
          { id: '2', label: 'Initial phone consultation', completed: true },
          { id: '3', label: 'Schedule first meeting', completed: true },
        ],
      },
      'assessment': {
        id: 'assessment',
        label: 'Assessment',
        tasks: [
          { id: '4', label: 'Conduct needs assessment', completed: true },
          { id: '5', label: 'Document client preferences', completed: true },
          { id: '6', label: 'Review financial situation', completed: true },
        ],
      },
      'planning': {
        id: 'planning',
        label: 'Planning',
        tasks: [
          { id: '7', label: 'Research suitable facilities', completed: true },
          { id: '8', label: 'Schedule facility tours', completed: true },
          { id: '9', label: 'Review care options', completed: true },
        ],
      },
      'revised-planning': {
        id: 'revised-planning',
        label: 'Revised Planning',
        tasks: [
          { id: '10', label: 'Update care plan', completed: true },
          { id: '11', label: 'Adjust recommendations', completed: true },
          { id: '12', label: 'Review changes with client', completed: true },
        ],
      },
      'transition': {
        id: 'transition',
        label: 'Transition',
        tasks: [
          { id: '13', label: 'Coordinate move-in date', completed: true },
          { id: '14', label: 'Arrange transportation', completed: true },
          { id: '15', label: 'Setup support services', completed: true },
        ],
      },
      'completed': {
        id: 'completed',
        label: 'Completed',
        tasks: [
          { id: '16', label: 'Final documentation', completed: true },
          { id: '17', label: 'Follow-up schedule', completed: true },
          { id: '18', label: 'Client satisfaction survey', completed: true },
        ],
      },
    },
  },
};

const CustomNode = ({ data }: NodeProps) => {
  const completedTasks = data.tasks.filter(t => t.completed).length;
  const totalTasks = data.tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;
  
  const getColor = () => {
    if (data.hasIssue) return '#ef4444'; // red
    if (completionPercentage === 100) return '#22c55e'; // green
    return '#424242'; // default grey
  };

  return (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-white"
      style={{ 
        minWidth: '200px',
        border: `2px solid ${getColor()}`,
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {data.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {completionPercentage.toFixed(0)}%
          </Typography>
        </div>
        <LinearProgress 
          variant="determinate" 
          value={completionPercentage}
          sx={{
            mt: 1,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getColor(),
            },
          }}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface WorkflowDiagramProps {
  user: User;
}

export default function WorkflowDiagram({ user }: WorkflowDiagramProps) {
  const navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState<string>('1');
  const [workflow, setWorkflow] = useState<ClientWorkflow>(mockWorkflows['1']);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const clients = mockClients.filter(client =>
    user.role === 'Admin' ? true : client.representative === user.name
  );

  const selectedClient = clients.find(client => client.id === selectedClientId);
  const selectedStage = selectedNode ? workflow.stages[selectedNode] : null;

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const clientId = event.target.value as string;
    setSelectedClientId(clientId);
    setWorkflow(mockWorkflows[clientId]);
    setSelectedNode(null);
  };

  const handleTaskToggle = useCallback((stageId: string, taskId: string) => {
    setWorkflow(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          ...prev.stages[stageId],
          tasks: prev.stages[stageId].tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        },
      },
    }));
  }, []);

  const handleScheduleMeeting = () => {
    if (selectedClient) {
      navigate('/dashboard/calendar', { 
        state: { 
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          meetingType: 'Initial Consultation'
        }
      });
    }
  };

  React.useEffect(() => {
    if (!workflow) return;
    
    const stageOrder = ['initial', 'assessment', 'planning', 'revised-planning', 'transition', 'completed'];
    const newNodes: Node[] = stageOrder.map((stageId, index) => {
      const stage = workflow.stages[stageId];
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      return {
        id: stage.id,
        type: 'custom',
        position: { 
          x: col * 300 + 50,
          y: row * 200 + 50
        },
        data: {
          label: stage.label,
          tasks: stage.tasks,
          hasIssue: stage.hasIssue,
        },
        draggable: true,
        selected: stage.id === selectedNode,
      };
    });
    setNodes(newNodes);
  }, [workflow, selectedNode]);

  const edges: Edge[] = [
    { id: 'e1-2', source: 'initial', target: 'assessment', type: 'smoothstep' },
    { id: 'e2-3', source: 'assessment', target: 'planning', type: 'smoothstep' },
    { id: 'e3-4', source: 'planning', target: 'revised-planning', type: 'smoothstep' },
    { id: 'e4-5', source: 'revised-planning', target: 'transition', type: 'smoothstep' },
    { id: 'e5-6', source: 'transition', target: 'completed', type: 'smoothstep' },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Client Workflow
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="client-select-label">Select Client</InputLabel>
          <Select
            labelId="client-select-label"
            value={selectedClientId}
            label="Select Client"
            onChange={handleClientChange}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1, height: 800, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            defaultZoom={0.8}
            nodesDraggable={true}
            nodesConnectable={false}
            onNodeClick={(event, node) => setSelectedNode(node.id)}
            elementsSelectable={true}
            selectNodesOnDrag={false}
            proOptions={{ hideAttribution: true }}
          >
            <Controls />
            <Background gap={16} size={1} />
          </ReactFlow>
        </Box>
        <Drawer
          variant="persistent"
          anchor="right"
          open={!!selectedNode}
          sx={{
            width: 400,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 400,
              position: 'relative',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              height: 800,
            },
          }}
        >
          {selectedStage && selectedClient && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selectedStage.label}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {selectedStage.id === 'initial' ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Contact Information
                  </Typography>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={selectedClient.contactInfo.phone}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <IconButton href={`tel:${selectedClient.contactInfo.phone}`}>
                          <Phone size={20} />
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedClient.contactInfo.email}
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={selectedClient.contactInfo.address}
                    margin="normal"
                    multiline
                    rows={2}
                    InputProps={{ readOnly: true }}
                  />
                  <Divider sx={{ my: 2 }} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedStage.tasks[1].completed}
                        onChange={() => handleTaskToggle(selectedStage.id, '2')}
                      />
                    }
                    label="Initial Phone Consultation"
                  />
                  <Button
                    variant="contained"
                    startIcon={<CalendarRange />}
                    fullWidth
                    onClick={handleScheduleMeeting}
                    sx={{ mt: 2 }}
                  >
                    Schedule First Meeting
                  </Button>
                </>
              ) : (
                <Box sx={{ mt: 2 }}>
                  {selectedStage.tasks.map((task) => (
                    <FormControlLabel
                      key={task.id}
                      control={
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleTaskToggle(selectedStage.id, task.id)}
                        />
                      }
                      label={task.label}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Drawer>
      </Box>
    </Paper>
  );
}