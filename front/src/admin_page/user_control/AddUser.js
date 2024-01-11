/*
Sursa: https://github.com/gitdagray/react_login_form/blob/main/src/Login.js
Sursa: https://www.simplilearn.com/tutorials/reactjs-tutorial/how-to-create-functional-react-dropdown-menu
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
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const defaultTheme = createTheme();

export default function AddUser() {
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    var pagina =0;
    var URL = 'http://localhost:8080/api/user/create'

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    let patternNume="[a-zA-Z]{3,}"
    let patternPassword=".+[a-zA-Z0-9]{3}"


    useEffect(() => {
    }, [user, password])

    let navigate = useNavigate()

    /* pentru drop down*/
    const [selectedOption, setSelectedOption] = useState("x");
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        var user = document.getElementById("name").value;
        var parola = document.getElementById("password").value;
        var rol = selectedOption;

        // Aici poți face ce dorești cu user și parola, de exemplu, trimite-le la server
        console.log("Utilizator:", user);
        console.log("Parolă:", parola);
        console.log("Rol:", rol);

        //Verificare date introduse corect
        if(user.match(patternNume)===null){
            alert("Nume invalid: Trebuie sa contina cel putin 3 litere");
            pagina = 1;
            navigate("/adduser")
            return
        }else if(parola.match(patternPassword)===null){
            alert("Parola invalida. Format acceptat: Dimensiunea minim 3 caracter, litere mici, cifre")
            pagina = 1
            navigate("/adduser")
            return
        }
        if(rol === "x"){
            alert("Rol invalid. Selectati rolul utilizatorului")
            return
        }
        try {
            /* creez body:*/
            const body = {
                name: user,
                password: parola,
                role: rol
            };
            /* creez json file */

            let responseData = axios.post(URL, body, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => console.log(result.data))
                .catch(error => console.error('Error:', error));


            let responseData2 = (await responseData).data

            console.log(responseData2.role);

            if (responseData2 === '') {
                navigate('/exist');
                return;
            }
            if (rol === "1" && pagina === 0) {
                navigate('/manageAdmin');
                return;
            } else if (rol === "2" && pagina === 0) {
                navigate('/manageUsers');
                return;
            } else {
                navigate('/exist');
                return;
            }
            if (pagina === 1) {
                navigate("/adduser")
            }
        }catch (e){
            navigate('/exist');
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add User
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
                        <Typography>
                            Selectati rolul dorit:
                            <select value={selectedOption} onChange={handleDropdownChange}>
                                <option value="x">Selectare rol</option>
                                <option value="2">User</option>
                            </select>
                        </Typography>
                            <Button variant="outlined" style={{marginLeft: '35pt', marginTop: '100pt'}} onClick={handleSubmit}>Confirm</Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}