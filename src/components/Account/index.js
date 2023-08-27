import { Box, Button, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";

const Account = () => {
  return (

    <>
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button variant="contained" color="primary"> Create new</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>)
}

export default Account;