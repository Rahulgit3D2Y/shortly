import { BarChart as ChartIcon } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";import { format } from "date-fns"; // Import the format function from date-fns

import React from 'react';

const LinkCard = ({
    id,
    createdAt,
    name,
    longURL,
    shortCode,
    totalClicks,
}) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography color="textSecondary" variant="overline">
                   {
  createdAt instanceof Date && !isNaN(createdAt)
    ? format(createdAt, 'd MMM, HH:mm')
    : 'Invalid Date'}
                </Typography>
                <Box my={2}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>{longURL}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Box mr={3}>
                        <Typography color="primary">{window.location.host}/{shortCode}
                        </Typography>
                    </Box>
                    <Box mx={3}>
                        <Button color="primary" size="small" variant="outlined">Copy</Button>
                    </Box>
                    <Button color="secondary" size="small" variant="contained">Delete</Button>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Typography>{totalClicks}</Typography>
                        <ChartIcon />
                    </Box>
                    <Typography variant="overline">Total Clicks</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LinkCard;
