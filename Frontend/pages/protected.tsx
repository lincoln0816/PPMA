// /pages/protected.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProtectedPage = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      axios
        .post('http://localhost:5000/api/verify', {}, { 
          headers: { 'x-auth-token': token },
        })
        .then(() => setAuth(true))
        .catch(() => router.push('/login'));
        router.push('/projects');
    }
  }, [router]);

  if (!auth) return <div>Loading...</div>
}
  export default ProtectedPage;
