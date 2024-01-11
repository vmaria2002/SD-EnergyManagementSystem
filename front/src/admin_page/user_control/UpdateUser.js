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

export default function UpdateUser() {
    let patternNume="[a-zA-Z]{3,}"
    let patternPassword=".+[a-zA-Z0-9]{3}"

    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    /* Preluare data trimisa ca paramtru  */
    const { id } = useParams();
    const [user, setUser] = useState({
        id: '',
        name: '',
        password: '',
        role: ''
    });

    const [password, setPassword] = useState('');


    useEffect(() => {
    }, [user, password])

    let navigate = useNavigate()
    /* pentru drop down*/

    useEffect(() => {
        loadUser().then(r => "Nu se pot incarca userii");
    }, []);


    const loadUser = async () => {

        var result =axios.get('http://localhost:8080/api/user/update', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        setUser(result.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var URL = `http://localhost:8080/api/user/update/${id}`

        var user = document.getElementById("name").value;
        var parola = document.getElementById("password").value;


        // Aici poți face ce dorești cu user și parola, de exemplu, trimite-le la server
        console.log("Utilizator:", user);
        console.log("Parolă:", parola);

        //Verificare date introduse corect
        if(user.match(patternNume)===null){
            alert("Nume invalid: Trebuie sa contina cel putin 3 litere");
            return
        }else if(parola.match(patternPassword)===null){
            alert("Parola invalida. Format acceptat: Dimensiunea minim 3 caracter, litere mici, cifre")

            return
        }
        /*creez body:  */

        const body = {
            id: previosUser.id,
            name: user,
            password: parola,

        };
        let responseData = axios.put(URL,body, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));
        console.log(responseData.data)

        navigate('/admin');
    }
    const [previosUser, setPreviousUser] = useState({
        id: '',
        name: '',
        password: '',
        role: ''
    });


    useEffect(() => {
        loadPreviousUser().then(r => "Preluare date anterioare");
    },);

    const loadPreviousUser = async () => {
        var previousResult = axios.get(`http://localhost:8080/api/user/get/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));
        setPreviousUser(previousResult.data);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(data:image/png;base64,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)',
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
                            Update User:)
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                id="name"
                                label="Nume"
                                type='text'
                                onClick={(e) => setUser(prevUser => {
                                    return {
                                        ...previosUser, // Păstrează valorile anterioare ale celorlalte câmpuri
                                        name: previosUser.name // Actualizează doar câmpul "name"
                                    };
                                })}
                                onChange={(e) => setUser({
                                    ...user, // Păstrează valorile anterioare ale celorlalte câmpuri
                                    name: e.target.value // Actualizează câmpul "name" cu valoarea din elementul de intrare
                                })}
                                value={user.name}

                                required
                            />
                            <TextField
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                id='password'
                                onClick={(e) => setPassword(previosUser.password)}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />

                            <Button variant="outlined" style={{marginLeft: '35pt', marginTop: '100pt'}} onClick={handleSubmit}>Confirm</Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}