import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
  };
  onDelete: (id: number) => void;
  onEdit: (project: { id: number; title: string; description: string;  }) => void; // Add this prop for editing
}

const ProjectCard: FC<ProjectCardProps> = ({ project, onDelete, onEdit }) => {

  const [taskAccount, setTaskAccount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${project.id}/tasks`)
      .then((response) => {
        setTaskAccount(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${project.id}`);
      console.log(`Deleted project with id: ${project.id}`);
      onDelete(project.id);
    } catch (error) {
      console.error("There was an error deleting the project:", error);
    }
  };
  console.log(project.id)
  return (
    <Card sx={{
      maxWidth: 345,
      boxShadow: 4,
      border: '2px solid gray',
      borderRadius: 12,
      position: 'relative',
      backgroundColor: '#ffffff',
      opacity: '0.8',
      color: '#000000',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        opacity: "1"
      }
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Task Count: {taskAccount}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: "relative" }}>
          <Link href="#" passHref>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => onEdit(project)} // Call onEdit when "Edit" is clicked
              sx={{
                backgroundColor: '#ffffff',
                color: 'black',
                position: "absolute",
                bottom: "-55px",
                left: "10px",
                borderRadius: "0px 0px 0px 20px",
                '&:hover': {
                  backgroundColor: '#007acc',
                  color: 'white'
                }
              }}
            >
              Edit
            </Button>
          </Link>
          <Link href="#" passHref>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                backgroundColor: '#ffffff',
                color: 'black',
                position: "absolute",
                bottom: "-55px",
                width: "50px",
                right: "10px",
                borderRadius: "0px 0px 20px 0px",
                '&:hover': {
                  backgroundColor: '#cc0000',
                  color: "white"
                }
              }}
            >
              Delete
            </Button>
          </Link>
        </Box>
      </CardActions>
      <CardActions sx={{ 
        padding: '1rem',
        justifyContent: 'center'
      }}>
        <Link href={`/projects/${project.id}/tasks`} passHref>
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
            sx={{
              backgroundColor: '#0099cc',
              color: '#ffffff',
              width: "50px",
              '&:hover': {
                backgroundColor: '#007acc',
              }
            }}
          >
            Tasks
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
