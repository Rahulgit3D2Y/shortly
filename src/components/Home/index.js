import { Typography,   Button, Box, Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import AuthModal from './AuthModal';


const Home = () => {
 

  // Check if the screen size is small
  const isSmallScreen = useMediaQuery('(max-width:650px)');

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      boxSizing="border-box"
      height="100vh"
      bgcolor="#56B7BA"
      color="#fff"
    >
      <AuthModal/>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Shortly</Typography>
        <Button color="inherit">Login/Signup</Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Short Links, Big Results</Typography>
              <Box my={2}>
                <Typography>Powerful lorem4</Typography>
              </Box>
              <Button
                disableElevation
                variant="contained"
                size="large"
                color="inherit"
              >
                Get Started
              </Button>
            </Box>
          </Grid>

          
          {isSmallScreen ? null : (
            <Grid item sm={6}>
              <img
                style={{ width: "100%", borderRadius: "10px",boxShadow:"0px 10px 25px rgba(0,0,0,0.1)" }}
                src="/assets/mockup.png"
                alt="mockup"
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
