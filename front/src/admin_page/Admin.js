import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import './style/Admin.module.css'
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {deleteAllCookies} from "../cookies/cookies";
import {useCookies} from "react-cookie";
const Admin = () => {
    const [cookies, setCookie] =useCookies('')
    useEffect(() => {
        deleteAllCookies();
        setCookie("status_autentificare","logat")
        setCookie("userRole", 1)
    });
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#171616',
            },
        },
    });
    return(
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar  color="primary" enableColorOnDark>
                   ADMIN Page
                </AppBar>
            </ThemeProvider>

            <div>
                <Link to="/manageUsers">
                    <Button variant="contained" color="success" style={{marginRight: '70px',marginTop: '90px', marginBottom: '20px'}}>Users</Button>
                </Link>



                <Link to="/manageDevices">
                    <Button variant="contained" color="success" style={{marginRight: '70px',marginTop: '90px', marginBottom: '20px'}}>Devices</Button>
                </Link>

                <Link to="/">
                    <Button variant="contained" style={{marginRight: '70px',marginTop: '90px', marginBottom: '20px'}}>Home</Button>
                </Link>

            </div>
            <div>
                <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115494683/original/097d4869e43a5498c49246fa67492df0dd0cd9d6/administrative-work-is-tedious-so-let-me-complete-it-for-you.jpg"
                     height="600"
                     width= "600"
                     alt={"/"}>
                </img>
            </div>
        </div>
    );
}
export default Admin;