 import { unstable_createMuiStrictModeTheme as createTheme } from "@mui/material/styles";
const customTheme = createTheme({
    palette: {
        primary: {
            main:"#56B7BA",
            contrastText:"#fff",
        },
        
        secondary: {
            main:"#03142F",
        },
        typography:{
            fontFamily:"Poppins,sans-serif",
            button:{
                textTransform:"capitalize",
                fontWeight:600,
               
            },
            h3:{
                fontWeight:600,
            },
             h4:{
                    fontWeight:600,
                }
        }
    },
    
});

export default customTheme;