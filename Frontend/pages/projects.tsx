import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ProjectCard from '../src/app/components/ProjectCard';
import Image from 'next/image';
import Header from '@/app/components/Header';

interface Project {
  id: number;
  title: string;
  description: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: ''
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleDeleteProject = (id: number) => {
    setProjects((prevProjects) => prevProjects.filter(project => project.id !== id));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(false);
    setNewProject({ title: '', description: '' });
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!newProject.title || !newProject.description) {
      alert('Please provide valid project details.');
      return;
    }

    if (editMode && selectedProjectId !== null) {
      axios.put(`http://localhost:5000/api/projects/${selectedProjectId}`, {
        title: newProject.title,
        description: newProject.description
      })
        .then((response) => {
          setProjects(projects.map(project =>
            project.id === selectedProjectId ? response.data : project
          ));
          setNewProject({ title: '', description: '' });
          setEditMode(false);
          handleClose();
        })
        .catch((error) => {
          console.error('There was an error updating the project!', error);
          alert('Failed to update project. Please try again.');
        });
    } else {
      axios.post('http://localhost:5000/api/projects', {
        title: newProject.title,
        description: newProject.description
      })
        .then((response) => {
          setProjects([...projects, response.data]);
          setNewProject({ title: '', description: '' });
          handleClose();
        })
        .catch((error) => {
          console.error('There was an error saving the project!', error);
          alert('Failed to save project. Please try again.');
        });
    }
  };

  const handleEditProject = (project: Project) => {
    setOpen(true);
    setEditMode(true);
    setSelectedProjectId(project.id);
    setNewProject({
      title: project.title,
      description: project.description
    });
  };

  // Filter projects based on the search query
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Header />
    <Box 
      sx={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden', 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}
    >
      {/* Background Image */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1, 
          filter: 'blur(2px)', 
        }}
      >
        <Image 
          src="/background.png" 
          layout="fill"
          alt="Background Pattern" 
        />
      </Box>
      {/* Content Container */}
      <Container 
        maxWidth="md" 
        sx={{ 
          textAlign: 'center', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          color: '#fff', 
          borderRadius: '20px',
          padding: '50px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.4s ease-in-out',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
          overflowY: 'scroll', // Enable scrolling
          maxHeight: '80vh',   // Limit height for scrolling
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar for Chrome, Safari, and Edge
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{
          marginBottom: 4,
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          Your Projects
        </Typography>
        
        {/* Search Input */}
        <TextField
          margin="dense"
          id="search"
          label="Search Projects"
          type="text"
          fullWidth
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 4 }}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />

        <Grid container spacing={4}>
          {filteredProjects.map(project => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} onDelete={handleDeleteProject} onEdit={handleEditProject} />
            </Grid>
          ))}
        </Grid>
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
            onClick={handleClickOpen}
          >
            Add New Project
          </Button>
        </Box>

        {/* Add/Edit Project Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Project Title"
              type="text"
              fullWidth
              variant="outlined"
              color="primary"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              InputProps={{ style: { color: '#000000' } }}
              InputLabelProps={{ style: { color: '#0099cc' } }}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              color="primary"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              InputProps={{ style: { color: '#000000' } }}
              InputLabelProps={{ style: { color: '#0099cc' } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
    </>
  );
};

export default ProjectsPage;
