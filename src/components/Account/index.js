import { Box, Button, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { useState } from "react";
import LinkCard from "./LinkCard";


const dummyData=[
  {
    id:'223sdawd23',
    creeatedAt:new Date(),
    name:'mtya sd',
    longURL:'https://google.com',
    shortCode:'yoyo',
    totalClicks:11,

  }
]

const Account = () => {
  const[links,setLinks]=useState([dummyData]);
  return (

    <>
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button variant="contained" color="primary"> Create new</Button>
            </Box>
            <Box>
              {links.map(link=><LinkCard key={link.id}{...link}/>)}
            </Box>
          </Grid>
        </Grid>
      </Box>

    </>)
}

export default Account;