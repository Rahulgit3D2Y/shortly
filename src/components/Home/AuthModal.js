import React,{useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField ,Box, Typography} from '@mui/material'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from Firebase's auth module
 
const AuthModal = () => {
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
    
      

const handleAuth=async ()=>{
    if(isSignIn)
    {
         try {
          await signInWithEmailAndPassword(auth, form.email, form.password);
          console.log('User registered successfully!');
        } catch (error) {
          console.error('Error creating user:', error.message);
        }
    }
    else
    {
try {
          await createUserWithEmailAndPassword(auth, form.email, form.password);
          console.log('User registered successfully!');
        } catch (error) {
          console.error('Error creating user:', error.message);
        }
    }
}

  return (
    <Dialog open fullWidth>
        <DialogTitle>{isSignIn?'Sign in':'Sign Up'}</DialogTitle>
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
        <DialogActions>
            <Box 
            width="100%"
            display="flex" 
            justifyContent='space-between' 
             alignContent='center'
             mb={1}
             mx={1}>
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
        </DialogContent>
    </Dialog>
  )
}

export default AuthModal