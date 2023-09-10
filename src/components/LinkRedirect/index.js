import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDoc, doc,updateDoc, increment } from 'firebase/firestore';

import { Box, CircularProgress, Typography } from '@mui/material';

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchLinkDoc = async () => {
      
        const firestore = getFirestore();  
        const linksCollectionRef = collection(firestore, 'links'); 
        const linkDocRef = doc(linksCollectionRef, shortCode); 
        
        const linkDoc = await getDoc(linkDocRef);
        if (linkDoc.exists()) {
          const { longURL, linkID, userUid } = linkDoc.data();

          const userLinksDocRef = doc(collection(firestore, 'users', userUid, 'links'), linkID);
      
          await updateDoc(userLinksDocRef, {
            totalClicks: increment(1)
          });
        
            window.location.href = longURL;
        } else {
           setLoading(false);
        }
     
    };
  
    fetchLinkDoc();
  }, [shortCode] );
console.log('Fetching document with shortCode:', shortCode);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting</Typography>
      </Box>
    );
  }

  else{
    return (
      <Box mt={10} textAlign="center">
        <Typography >
          Error: This shortened link does not exist.
        </Typography>
      </Box>
    );
  }

   
 };

export default LinkRedirect;
