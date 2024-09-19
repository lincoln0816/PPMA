import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Header from '@/app/components/Header';
import { format } from 'date-fns';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'; // Completed status icon
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // In-progress status icon
import HourglassTopIcon from '@mui/icons-material/HourglassTop'; // Pending status icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back icon

interface Task {
  _id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

const TaskPage: React.FC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (projectId) {
      axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks!", error);
        });
    }
  }, [projectId]);

  const handleCreateTask = () => {
    setOpen(true);
    setEditMode(false);
    setNewTask({ title: '', description: '', status: 'pending', dueDate: '' });
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert('Please provide valid task details.');
      return;
    }

    if (!projectId) {
      alert('Project ID is missing.');
      return;
    }

    if (editMode && selectedTaskId !== null) {
      axios.put(`http://localhost:5000/api/tasks/${selectedTaskId}`, newTask)
        .then((response) => {
          setTasks(tasks.map(task => task._id === selectedTaskId ? response.data : task));
          setNewTask({ title: '', description: '', status: 'pending', dueDate: '' });
          setEditMode(false);
          handleClose();
        })
        .catch((error) => {
          console.error('Error updating the task!', error);
          alert('Failed to update task. Please try again.');
        });
    } else {
      axios.post(`http://localhost:5000/api/projects/${projectId}/tasks`, newTask)
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask({ title: '', description: '', status: 'pending', dueDate: '' });
          handleClose();
        })
        .catch((error) => {
          console.error('Error saving the task!', error);
          alert('Failed to save task. Please try again.');
        });
    }
  };

  const handleEditTask = (task: Task) => {
    setOpen(true);
    setEditMode(true);
    setSelectedTaskId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate
    });
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
        .then(() => {
          setTasks(tasks.filter(task => task._id !== taskId));
        })
        .catch((error) => {
          console.error('Error deleting the task!', error);
          alert('Failed to delete task. Please try again.');
        });
    }
  };

  const handleStatusChange = (task: Task, newStatus: string) => {
    const updatedTask = { ...task, status: newStatus };
    axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask)
      .then((response) => {
        setTasks(tasks.map(t => t._id === task._id ? response.data : t));
      })
      .catch((error) => {
        console.error('Error updating task status!', error);
        alert('Failed to update task status.');
      });
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ paddingTop: '64px' }}>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Project Tasks
        </Typography>
        {projectId ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              {/* Back to Projects Button */}
              <IconButton 
                color="primary" 
                onClick={() => router.push('/projects')}
                aria-label="back-to-projects"
                sx={{ marginRight: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              {/* Search Input */}
              <TextField
                margin="dense"
                id="search"
                label="Search Tasks"
                type="text"
                fullWidth
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTasks.map(task => (
                    <TableRow key={task._id} hover>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{format(new Date(task.dueDate), 'dd/MM/yy')}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task, e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                          {task.status === 'completed' && (
                            <IconButton aria-label="completed" color="primary">
                              <BookmarkAddedIcon />
                            </IconButton>
                          )}
                          {task.status === 'in-progress' && (
                            <IconButton aria-label="in-progress" color="secondary">
                              <HourglassEmptyIcon />
                            </IconButton>
                          )}
                          {task.status === 'pending' && (
                            <IconButton aria-label="pending" color="default">
                              <HourglassTopIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditTask(task)} variant="outlined">Edit</Button>
                        <Button onClick={() => handleDeleteTask(task._id)} variant="outlined" color="error" sx={{ marginLeft: 1 }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 25,
                  padding: '12px 24px',
                  backgroundColor: '#0099cc',
                  ':hover': { backgroundColor: '#007acc' },
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'background-color 0.3s, box-shadow 0.3s'
                }}
                onClick={handleCreateTask}
              >
                Add Task
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No project selected.
          </Typography>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="title"
              label="Task Title"
              type="text"
              fullWidth
              variant="outlined"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <TextField
              margin="dense"
              id="description"
              label="Task Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <TextField
              margin="dense"
              id="dueDate"
              label="Due Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <Select
              fullWidth
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">{editMode ? "Save" : "Add"}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default TaskPage;
