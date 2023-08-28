import { BarChart as ChartIcon } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";

import React from 'react'

const LinkCard = ({ id, creeatedAt, name, longURL, shortCode, totalClicks }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box><Typography>created at {`${createdAt}`}</Typography></Box>
            <Typography variant="h1">{name}</Typography>
            <Typography>{longURL}</Typography>
            <Box display="flex">
                <Typography>{window.location.host}/{shortCode}</Typography>
                <Button size="small" variant="outlined">Copy</Button>
            </Box>
            <Box>
                <Box>
                    <Box display="flex">
                        <Typography>{totalClicks}
                    </Typography>
                    <ChartIcon/>
                    </Box>
                    <Typography>Total Clicks</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default LinkCard