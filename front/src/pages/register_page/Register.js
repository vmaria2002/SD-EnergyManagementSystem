/*
Sursa: https://github.com/mui/material-ui/blob/v5.14.14/docs/data/material/getting-started/templates/sign-up/SignUp.js
*/

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../style/Register.css'
import {useCookies} from "react-cookie";
import {deleteAllCookies} from "../../cookies/cookies";

const defaultTheme = createTheme();
export default function Register() {
    const [cookies, setCookie] = useCookies(['status_autentificare', 'userRole'])
    var pagina =0;
    var URL='http://localhost:8080/api/user/create'

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    let patternNume="[a-zA-Z]{3,}"
    let patternPassword=".+[a-zA-Z0-9]{3}"

    useEffect(() => {
        deleteAllCookies()
        setCookie("status_autentificare", "false")
        setCookie("userRole", 0)
    }, []);

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
        if (user.match(patternNume) === null) {
            alert("Nume invalid: Trebuie sa contina cel putin 3 litere");
            pagina = 1;
            navigate("/register")
            return

        } else if (parola.match(patternPassword) === null) {
            alert("Parola invalida. Format acceptat: Dimensiunea minim 3 caracter, litere mici, cifre")
            pagina = 1
            navigate("/register")
            return
        }
        if (rol === "x") {
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

            let responseData = await axios.post(URL, body)
            let responseData2 = responseData.data

            if (responseData2 === '') {
                navigate('/exist');
                return;
            }
            if (rol === "1" && pagina === 0) {
                navigate('/login');
                return;
            } else if (rol === "2" && pagina === 0) {
                navigate('/login');
                return;
            } else {
                navigate('/exist');
                return;
            }
            if (pagina === 1) {
                navigate("/register")
                return;
            }

        } catch (e) {
            navigate('/exist');
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Name"
                            autoFocus
                            type='text'
                            id='name'
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type='password'
                            id='password'
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        Selectati rolul dorit:
                        <select value={selectedOption} onChange={handleDropdownChange}>
                            <option value="x">Selectare rol</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                        </select>
                        <Link to="/">
                            <Button variant="contained" style={{marginLeft: '-173pt', marginTop: '100pt'}}>Home</Button>
                        </Link>
                            <Button variant="outlined" style={{marginLeft: '35pt', marginTop: '100pt'}} onClick={handleSubmit}>Confirm</Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}