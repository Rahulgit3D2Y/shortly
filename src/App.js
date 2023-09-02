import { Routes, Route ,Navigate } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import { ThemeProvider,CircularProgress,Box } from '@mui/material';
import theme from "./theme";
import {auth} from "./firebase";
import { useEffect, useState } from 'react';
const App = () => {
 
const[user,setUser]=useState(null);
const[initialLoad,setInitiaload]=useState(true);
useEffect(() => {
  auth.onAuthStateChanged((user) => {
    setUser(user);
    setInitiaload(false);
  });
}, [ ]);
if(initialLoad)
{
  return(
    <Box mt={5} display="flex" justifyContent="center">
<CircularProgress/>
    </Box>
    
  )
}
   return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={user ? <Navigate to="/Account" /> : <Home />} />
        <Route path="/Account" element={user ? <Account /> : <Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
