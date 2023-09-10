import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'




const ShortenURlModal = ({handleClose,createShortenLink}) => {
const [form,setForm]=useState({
    name:"",longUrl:"",
});

    const handleChange = (event) => {
        setForm((oldForm) => ({
          ...oldForm,
          [event.target.name]: event.target.value,
        }));
      };
    const handleSubmit=()=>{
        createShortenLink(form.name,form.longUrl)
    }
    return (
        <Dialog open={true} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    Create Shorten URl
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box mb={3}>
                    <TextField value={form.name} name="name" onChange={handleChange} fullWidth varient="filled" label="Name" />
                </Box>

                <TextField value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth varient="filled" label="Long URL" />
            </DialogContent>
            <DialogActions>
                <Box mr={2} my={1}>
                    <Button onClick={handleSubmit} color="primary" variant='contained' disableElevation>Create Shorten URL</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}

export default ShortenURlModal