import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';

import { Box, CircularProgress, Typography } from '@mui/material';

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      try {
        const db = getFirestore();  
        const linksCollectionRef = collection(db, 'links');  
        const linkDocRef = doc(linksCollectionRef, shortCode); 
        
        const linkDocSnapshot = await getDoc(linkDocRef);
        if (linkDocSnapshot.exists()) {
          const { longURL } = linkDocSnapshot.data();        

          // Set loading to false before redirecting
          setLoading(false);
          window.location.href = longURL;
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching link:', error);
        setError(true);
        setLoading(false);
      }
    };
  
    fetchLinkDoc();
  }, [shortCode] );
  console.log('Fetching document with shortCode:', shortCode);
  if (loading) {
    return (
      <Box mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={10}>
        <Typography variant="h6" color="error">
          Error: This shortened link does not exist.
        </Typography>
      </Box>
    );
  }
  

  // If no loading and no error, the redirection should have already occurred
  return null;
};

export default LinkRedirect;
