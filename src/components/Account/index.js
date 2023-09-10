import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Fragment, useState, useEffect } from "react";
import LinkCard from "./LinkCard";
import ShortenURlModal from "./ShortenURlModal";
import {    auth, firestore } from "../../firebase";
import { nanoid } from "nanoid";
import {
  collection,
  getDocs,deleteDoc,
  addDoc,doc,
  serverTimestamp,
} from "firebase/firestore";

const Account = () => {
  const [openModal, setOpenModal] = useState(false);
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
      const resp = await addDoc(
        collection(firestore, 'users', auth.currentUser.uid, 'links'),
        link
      );

      // Update the state with the new link
      setLinks((prevLinks) => [...prevLinks, { ...link, createdAt: new Date(), id: resp.id }]);

      console.log('Document written with ID: ', resp.id);
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
  
        const snapShot = await getDocs(linksCollectionRef);
  
        if (!snapShot.empty) {
          const tempLinks = [];
          snapShot.forEach((doc) =>
            tempLinks.push({
              ...doc.data(),
              id: doc.id,
              createdAt: doc.data().createdAt.toDate() 
            })
          );
  
          tempLinks.sort((a, b) => b.createdAt - a.createdAt);
  
          setLinks(tempLinks);
        } else {
          setLinks([]);
        }
      } catch (error) {
        console.error('Error fetching user links:', error);
      }
    };
  
    fetchLinks();
  }, []);

  const handleDeleteLink = async (linkDocID) => {
    const linkDocRef = doc(
      firestore,
      'users',
      auth.currentUser.uid,
      'links',
      linkDocID
    );
  
    try {
      await deleteDoc(linkDocRef);
      console.log('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
    setLinks(oldLinks=>oldLinks.filter(link=>link.id!==linkDocID))
  };


  return (
    <>
      {openModal && (
        <ShortenURlModal
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                color="primary"
                disableElevation
              >
                Create new
              </Button>
            </Box>

            {links.map((link, idx) => (
              <Fragment key={link.id}>
                <LinkCard {...link} deleteLink={()=>handleDeleteLink(link.id)}/>
                {idx !== links.length - 1 && (
                  <Box my={4}>
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
};

export default Account;
