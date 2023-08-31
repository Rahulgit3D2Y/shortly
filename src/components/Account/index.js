import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Fragment, useState } from "react";
import LinkCard from "./LinkCard";


const dummyData=[
  {
    id:'223sdawd23',
    createdAt:new Date(),
    name:'ararara',
    longURL:'https://google.com',
    shortCode:'yoyo',
    totalClicks:11,

  },
  {
    id:'223wd23',
    createdAt:new Date(),
    name:'araara',
    longURL:'https://googleeee.com',
    shortCode:'yo11yo',
    totalClicks:131,

  },
  {
    id:'22 3',
    createdAt:new Date(),
    name:'ar a',
    longURL:'https://googleeee.com',
    shortCode:' 11yo',
    totalClicks:1131,

  }
]

const Account = () => {
  const [links, setLinks] = useState(dummyData);
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
              <Button variant="contained" color="primary" disableElevation> Create new</Button>
            </Box>
             
            {links.map((link,idx)=>(
              <Fragment key={link.id}>
                <LinkCard {...link}/>
                { idx!==links.length-1 &&(<Box my={4}>
                  <Divider/>
                </Box>
                ) }        
                
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
    );
}

export default Account;