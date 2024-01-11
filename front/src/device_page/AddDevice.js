/*
Sursa: https://github.com/mui/material-ui/blob/v5.14.14/docs/data/material/getting-started/templates/sign-up/SignUp.js
*/

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './style/DevicesComponent.module.css'
const defaultTheme = createTheme();

export default function AddDevice() {
    const URL = 'http://localhost:8081/api/device/create'

    const [user, setUser] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [consumption, setConsumption] = useState('');
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    useEffect(() => {
    }, [user, description, address, consumption])
    let navigate = useNavigate()
    /* pentru drop down*/

    let patternFields = "[a-zA-Z]{3,}"
    const handleSubmit = async (e) => {
        e.preventDefault();

        var name = document.getElementById("name").value;
        var description = document.getElementById("description").value;
        var address = document.getElementById("address").value;
        var maxConsumption = document.getElementById("maxConsumption").value;

        if (name.match(patternFields) === null) {
            alert("Nume invalid: Trebuie sa contina cel putin 3 litere");
            return
        } else if (description.match(patternFields) === null) {
            alert("Descrierea device-ului invalida: Trebuie sa contina cel putin 3 litere");
            return
        } else if (address.match(patternFields) === null) {
            alert("Adresa invalida: Trebuie sa contina cel putin 3 litere");
            return
        }
        /* creez body:*/

        try {
            const body = {
                name: name,
                description: description,
                address: address,
                maxConsumption: maxConsumption,
                user_id: 0
            };
            /*
            creez json file
             */
            let responseData = axios.post(URL, body, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => console.log(result.data))
                .catch(error => console.error('Error:', error));

            let responseData2 = (await responseData).data
            console.log(responseData2.role);

            navigate('/manageDevices');
            if (responseData2 === '') {
                navigate('/deviceExist');
            }
        }catch (e){
            navigate('/deviceExist');
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Add new Device
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                            name="description"
                            label="Description"
                            type='text'
                            id='description'
                            autoComplete="off"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="address"
                            label="Address"
                            type='text' id='address'
                            autoComplete="off"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="maxConsumption"
                            label="Consumption"
                            type='number' id='maxConsumption'
                            autoComplete="off"
                            onChange={(e) => setConsumption(e.target.value)}
                            value={consumption}
                            required
                        />


                        <Button variant="outlined" style={{marginRight: '100pt', marginTop: '70pt'}}
                                onClick={handleSubmit}>Confirm</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}