import * as React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
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
          }
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
          Welcome to Project Management App
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Manage your projects and tasks with style and efficiency.
        </Typography>
        
        <Box sx={{ marginTop: 4 }}>
          <Link href="/signup" passHref>
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                marginRight: 2, 
                padding: '12px 30px', 
                fontSize: '1.1rem',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: '#ff8c00',
                }
              }}
            >
              Sign Up
            </Button>
          </Link>

          <Link href="/login" passHref>
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ 
                padding: '12px 30px', 
                fontSize: '1.1rem',
                color: '#fff',
                borderColor: '#fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: '#ff8c00',
                  color: '#ff8c00',
                }
              }}
            >
              Log In
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
