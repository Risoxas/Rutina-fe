import axios from 'axios';
import { useState, useRef } from 'react';
// import {signIn, signOut, useSession} from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';

const LoginPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      // replace this URL with your backend login endpoint
      const response = await axios.post('/api/login', { email, password });
      const data = response.data;

      if (data.user) {
        setUser(data.user);  // set user data in context
        if (data.user.role === 'admin') {
          router.push('/clients');  // redirect to homepage or dashboard
        }else {
          router.push('/routine');  // redirect to homepage or dashboard
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Usuario o contraseña incorrectos');
      // handle error (e.g., show an error message)
    }
  };

  // const handleGoogleLogin = async () => {
  //   // Your logic to integrate Google Login. Typically, using a library like `react-oauth-google`.
  // };

  return (
    <div>
      <h6> Bienvenido de vuelta </h6>
      <label>Correo electrónico</label>
      <input
        ref={emailRef}
        placeholder="Email"
      />
      <label>Contraseña</label>
      <input
        type="password"
        ref={passwordRef}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
    </div>
  );
};

export default LoginPage;
