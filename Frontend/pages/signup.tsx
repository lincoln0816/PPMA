import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { TextField, Container, Button, Grid, Typography, Box, Alert } from '@mui/material';
import Image from 'next/image';
import Header from '@/app/components/Header';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To handle error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To handle success messages

  const { username, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      setSuccessMessage('Sign up successful! Redirecting to login...');
      setErrorMessage(null);

      // Redirect after success
      setTimeout(() => {
        router.push('/login');
      }, 2000); // 2-second delay before redirecting
    } catch (error) {
      console.log(error);
      // Handle the error, display an appropriate message
      setSuccessMessage(null);
    }
  };

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
        justifyContent: 'center',
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
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                opacity: "0.7",
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom color='#0099cc'>
                Sign Up
              </Typography>
              <form onSubmit={onSubmit} style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />

                {/* Feedback messages */}
                {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Sign Up
                </Button>
                <Button
                  href='/login'
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Log In    
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
};

export default SignUp;
