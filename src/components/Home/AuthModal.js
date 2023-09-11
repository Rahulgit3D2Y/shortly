import React,{useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField ,Box, Typography, IconButton} from '@mui/material'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from Firebase's auth module
import { Close } from '@mui/icons-material'

const AuthModal = ({ onClose}) => {
    const [error,setError]=useState("")
    const [isSignIn,setIsSignIn]=useState(true)
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
    
      

      const handleAuth = async () => {
        try {
          if (isSignIn) {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            console.log('User signed in successfully!');
          } else {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log('User registered successfully!');
          }
        }catch (error) {
            console.error('Error:', error);
        
            // Customize error messages based on error codes or messages
            let errorMessage = 'An error occurred';
        
            if (error.code === 'auth/invalid-email') {
              errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/user-not-found') {
              errorMessage = 'User not found';
            } else if (error.code === 'auth/wrong-password') {
              errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/email-already-in-use') {
              errorMessage = 'Email is already in use';
            } else if (error.code === 'auth/missing-password') {
              errorMessage = 'Password is missing';
            } else if (error.code === 'auth/weak-password') {
              errorMessage = 'Password is weak';
            }
        
            setError(errorMessage);
          }
      }

  return (
    <Dialog open fullWidth onClose={onClose}>
        <DialogTitle>
            
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {isSignIn?'Sign in':'Sign Up'}
                     
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
        </DialogTitle>
        <DialogContent>
        <TextField
        fullWidth
        style={{marginBottom:'24px'}}
        value={form.email}
        name="email"
        onChange={handleChange}
        label="email"
        variant='filled'
        />
        <TextField
        fullWidth
        style={{marginBottom:'24px'}}
        variant='filled'
        value={form.password}
        name="password"
        onChange={handleChange}
        label="password"
        />
        <Box color="red" mt={2}>
            <Typography>
                {error}
            </Typography>
        </Box>
        </DialogContent>
        <DialogActions>
            <Box 
            width="100%"
            display="flex" 
            justifyContent='space-between' 
             alignContent='center'
             mb={1}
             mx={2 }>
                <Typography onClick={()=>setIsSignIn((o)=> !o)}>{isSignIn?"Don't have an account":"Already have an account"}</Typography>
            <Button
            variant='contained'
            disableElevation 
            color='primary' 
            onClick={handleAuth}> 
            {isSignIn?'Sign in':'Sign Up'}
            </Button>
            </Box>

        </DialogActions>
        
    </Dialog>
  )
}

export default AuthModal