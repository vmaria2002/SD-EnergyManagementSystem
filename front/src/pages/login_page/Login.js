/*
Sursa: https://github.com/mui/material-ui/blob/v5.14.14/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js
 */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useCookies} from "react-cookie";
import axios from "axios";
import cookie from "cookie";
import {deleteAllCookies} from "../../cookies/cookies";
import {AT_KEY} from "../../utils";


const defaultTheme = createTheme();
export default function Login() {
    let responseData2;
    const [user, setUser] = useState('');
    var response ={
        username: "",
        name: "",
        role: "",
        accessToken: "",
        tokenType: "Bearer"
    };
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['status_autentificare', 'userRole'])
    let navigate = useNavigate()

    useEffect(() => {
        deleteAllCookies()
        setCookie("status_autentificare", "false")
        setCookie("userRole", 0)
    }, []);

    useEffect(() => {
        setCookie("status_autentificare", "logat")
    }, [user, password])


    const handleSubmit = async (eeq, res, next,e) => {
        e.preventDefault();
        var URL = 'http://localhost:8080/api/user/login'
        var user = document.getElementById("name").value;
        var parola = document.getElementById("password").value;

        console.log("Utilizator:", user);
        console.log("Parolă:", parola);
        const token = 'test';
        res.cookie(AT_KEY, token,{
            httpOnly:true,
            signed: true,
        });

        res.status(200).send(token);
        /* creez body:*/
        const body = {
            name: user,
            password: parola
        };
        try {

            let responseData = axios.post(URL, body)

            //seteaza obiectul rezultat + token
            responseData2 = (await responseData).data;
            response.username=responseData2.username;
            response.name=responseData2.name;
            response.role=responseData2.role;
            response.accessToken=responseData2.accessToken;
            response.tokenType=responseData2.tokenType;

            //Salveaza obiectul
            localStorage.setItem('usertoken' + responseData2.id, JSON.stringify(response));

            setCookie("userRole", responseData2.role )
            setCookie("userID", responseData2.id  )



           if (responseData2.role ===1){
                setCookie("status_autentificare", "logat" )
                navigate('/admin');
                window.location.reload()
            } else if (responseData2.role===2){

               setCookie("status_autentificare", "logat" )
               navigate(`/user/${responseData2.id}`);

            } else if (String(cookies.status_autentificare)==="false") {
               navigate('/unauthorized');
               setCookie("status_autentificare", "false"  )
               window.location.reload()
            }
        }catch (e){
            navigate('/unauthorized');
            window.location.reload()
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://www.electricafurnizare.ro/cms/wp-content/uploads/sites/4/2021/07/shutterstock_1190069647-2.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}} >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            LOG IN
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                id="name"
                                label="Name"
                                autoFocus
                                type='text'
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                            />
                            <TextField
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="off"
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}