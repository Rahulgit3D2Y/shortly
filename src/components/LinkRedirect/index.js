import { useParams } from 'react-router-dom';
import {   doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {   firestore } from '../../firebase'; // Import your Firebase setup here
import { Box, CircularProgress, Typography } from '@mui/material';

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      try {
         
        const linkDocRef = doc(firestore, 'links', shortCode);
        const linkDocSnap = await getDoc(linkDocRef);

        if (linkDocSnap.exists()) {
          const { longURL, linkID, userUid } = linkDocSnap.data();

          const userLinksDocRef = doc(firestore, 'users', userUid, 'links', linkID);

          await updateDoc(userLinksDocRef, {
            totalClicks: increment(1),
          });

          window.location.href = longURL;
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching link document:', error);
        setLoading(false);
      }
    };

    fetchLinkDoc();
  }, [shortCode]);

  console.log('Fetching document with shortCode:', shortCode);

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting</Typography>
      </Box>
    );
  } else {
    return (
      <Box mt={10} textAlign="center">
        <Typography>Error: This shortened link does not exist.</Typography>
      </Box>
    );
  }
};

export default LinkRedirect;
