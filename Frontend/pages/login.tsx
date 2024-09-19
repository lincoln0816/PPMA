import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Grid, Typography, Box, Alert } from '@mui/material';
import Image from 'next/image';
import Header from '@/app/components/Header';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('token', response.data.token);
      router.push('/protected');
    } catch (error) {
      console.log(error)
      setErrorMessage('Invalid email or password');
    } finally {
      setLoading(false);
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
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                opacity: '0.8',
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom color='#0099cc'>
                Login
              </Typography>
              <form onSubmit={onSubmit} style={{ width: '100%' }}>
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
                {errorMessage && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button
                  href="/signup"
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Sign Up
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

export default Login;
