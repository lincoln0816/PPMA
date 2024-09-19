import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0099cc', marginBottom: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, }}>
          <Link href='/' passHref style={{color: "white", textDecoration: 'none'}}>
              Projects Management
          </Link>
        </Typography>
        <Box>
          <Link href="/signup" passHref>
            <Button sx={{ color: '#fff', marginRight: 2 }}>Sign Up</Button>
          </Link>
          <Link href="/login" passHref>
            <Button sx={{ color: '#fff' }}>Login</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
