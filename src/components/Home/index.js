import { Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from Firebase's auth module
import { auth } from '../../firebase';

const Home = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password); // Call createUserWithEmailAndPassword using auth object
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

 
  return (
    <>
      <Typography>Home</Typography>
      <TextField
        value={form.email}
        name="email"
        onChange={handleChange}
        label="Email"
      />
      <TextField
        type="password"
        value={form.password}
        name="password"
        onChange={handleChange}
        label="Password"
      />
      <Button variant='contained'size='large' onClick={handleSignup}>Sign up</Button>
    </>
  );
};

export default Home;
