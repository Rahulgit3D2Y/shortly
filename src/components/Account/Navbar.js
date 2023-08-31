import { Toolbar,AppBar,Typography,Box, Button } from "@mui/material"
const Navbar = () => {
  return (
    <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">shortly</Typography>
          <Box ml="auto">
            <Button color="inherit">links</Button>
            <Button color="inherit">logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar