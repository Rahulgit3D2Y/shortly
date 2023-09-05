import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Fragment, useState,useEffect } from "react";
import LinkCard from "./LinkCard";
import ShortenURlModal from "./ShortenURlModal";
import { app, auth, firestore } from "../../firebase";
import { nanoid } from "nanoid";
import { collection,getDocs, addDoc,serverTimestamp,getDoc } from "firebase/firestore";
 


const dummyData = [
  {
    id: '223sdawd23',
    createdAt: new Date(),
    name: 'ararara',
    longURL: 'https://google.com',
    shortCode: 'yoyo',
    totalClicks: 11,

  },
  {
    id: '223wd23',
    createdAt: new Date(),
    name: 'araara',
    longURL: 'https://googleeee.com',
    shortCode: 'yo11yo',
    totalClicks: 131,

  },
  {
    id: '22 3',
    createdAt: new Date(),
    name: 'ar a',
    longURL: 'https://googleeee.com',
    shortCode: ' 11yo',
    totalClicks: 1131,

  }
]

const Account = () => {

  const [openModal, setOpenModal] = useState('false');
  const [links, setLinks] = useState([]);

  const handleCreateShortenLink = async (name, longURL) => {
    const link = {
      name,
      longURL,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };
  
    try {
      const docRef = await addDoc(
        collection(firestore, 'users', auth.currentUser.uid, 'links'),
        link
      );
  
      // Update the state with the new link
      setLinks(links=>[...links,{...link,createdAr:new Date(),id:docRef.id}]);
  
      console.log('Document written with ID: ', docRef.id);
      setOpenModal(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksCollectionRef = collection(
          firestore,
          'users',
          auth.currentUser.uid,
          'links'
        );
    
        const querySnapshot = await getDocs(linksCollectionRef);
    
        if (!querySnapshot.empty) {
          const tempLinks = [];
          querySnapshot.forEach((doc) =>
            tempLinks.push({
              ...doc.data(),
              id: doc.id,
              createdAt: doc.data().createdAt?.toDate() || new Date(), // Use a default date if createdAt is missing

            })
          );
    
          setLinks(tempLinks);
        } else {
          // Handle the case where there are no documents
          // For example, you could set an empty array for links
          setLinks([]);
        }
      } catch (error) {
        console.error('Error fetching user links:', error);
      }
    };
  
    fetchLinks();
  }, [links]);
  
  
  return (

    <>
      {openModal && <ShortenURlModal createShortenLink={handleCreateShortenLink}
        handleClose={() => setOpenModal(false)} />}
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button onClick={() => { setOpenModal(true) }} variant="contained" color="primary" disableElevation> Create new</Button>
            </Box>

            {links 
               .sort((prevLink, nextLink) => nextLink.createdAt - prevLink.createdAt).map((link, idx) => (
              <Fragment key={link.id}>
                <LinkCard {...link} />
                {idx !== links.length - 1 && (<Box my={4}>
                  <Divider />
                </Box>
                )}

              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Account;