import { BarChart as ChartIcon } from "@mui/icons-material";
import { Typography, Button, Box, Hidden } from "@mui/material"; import copy from "copy-to-clipboard";
import { format } from "date-fns"; // Import the format function from date-fns

import React from 'react';

const LinkCard = ({
    id,
    createdAt,
    name,
    longURL,
    shortCode,
    totalClicks,
    deleteLink,
}) => {
    const shortUrl = `${window.location.host}/${shortCode}`
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" minWidth="240px">
            <Box width="80%">
                <Typography color="textSecondary" variant="overline">
                    {
                        createdAt instanceof Date && !isNaN(createdAt)
                            ? format(createdAt, 'd MMM, HH:mm')
                            : 'Invalid Date'}
                </Typography>
                <Box my={2}>
                    <Typography style={{ marginBottom: '5px' }} variant="h5">
                        {name}
                    </Typography>
                    <Typography style={{ overflow: 'hidden', textOverflow: "ellipsis" }}>
                        {longURL}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" flexWrap="wrap" >
                    <Typography color="primary"   >
                        {shortUrl}
                    </Typography>
                    <Box mx={1}>
                    <Button
                        onClick={() => copy(shortUrl)}
                        color="primary"
                        size="small"
                        variant="outlined"
                        
                    >
                        Copy
                    </Button>
                    </Box>
                    <Button
                        onClick={deleteLink}
                        color="secondary"
                        size="small"
                        variant="contained"
                         
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <Box>
                <Box display="flex" justifyContent="center">
                    <Typography>{totalClicks}</Typography>
                    <ChartIcon />
                </Box>
                <Hidden only="xs">
                    <Typography variant="overline">Total Clicks
                    </Typography>
                </Hidden>
            </Box>
        </Box>
    );
}

export default LinkCard;
