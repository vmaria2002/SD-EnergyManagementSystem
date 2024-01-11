/*
    Sursa: https://github.com/gitdagray/react_login_form/blob/main/src/Login.js
    Sursa: https://www.simplilearn.com/tutorials/reactjs-tutorial/how-to-create-functional-react-dropdown-menu
*/

import { useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useRef, useState} from "react";
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './style/DevicesComponent.module.css'
const UpdateDevice = () => {
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [consumption, setConsumption] = useState('');

    let patternFields = "[a-zA-Z]{3,}"
    let max ="[0-9]+"


    useEffect(() => {

    }, [name, description, address, consumption])

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.match(patternFields) === null) {
            alert("Nume invalid: Trebuie sa contina cel putin 3 litere");
            return
        } else if (description.match(patternFields) === null) {
            alert("Descrierea device-ului invalida: Trebuie sa contina cel putin 3 litere");
            return
        } else if (address.match(patternFields) === null) {
            alert("Adresa invalida: Trebuie sa contina cel putin 3 litere");
            return
        } else if (consumption.match(max) === null) {
            alert("Introduceti o ora pentru consumul maxim");
            return
        }
        var URL = `http://localhost:8081/api/device/updateDevice/${id}`

        /*
        creez body:
         */
        const body = {
            id: previosUser.id,
            name: name,
            description: description,
            address:address,
            maxConsumption: consumption
        };
        /*
        creez json file
         */
        let responseData =  axios.put(URL, body, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));


        console.log(responseData.data)

        navigate('/manageDevices');
    }

    const [previosUser, setPreviousUser] = useState({
        id: '',
        name: '',
        description: '',
        address: '',
        maxConsumption: ''
    });

    useEffect(() => {
        loadPreviousUser().then(r => "Eroare, nu s-a putut obtine user-ul");
    }, );

    const loadPreviousUser = async () => {
        const previousResult = axios.get(`http://localhost:8081/api/device/get/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        setPreviousUser(previousResult.data);
    };


    const defaultTheme = createTheme();
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
                        Update Device
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Name"
                            type='text'
                            id='name'
                            onClick={(e) => setName(previosUser.name)}
                            onChange={(e) => setName(e.target.value)}
                            value={name}


                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Description"
                            name="description"
                            defaultValue={previosUser.description}
                            type='text'
                            id='description'
                            onClick={(e) => setDescription(previosUser.description)}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}

                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="address"
                            label="Address"
                            defaultValue={previosUser.address.toString()}
                            type='text' id='address'
                            onClick={(e) => setAddress(previosUser.address)}
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            name="maxConsumption"
                            label="Max Consumption"
                            defaultValue={previosUser.maxConsumption}
                            type='number' id='maxConsumption'
                            onClick={(e) => setConsumption(previosUser.maxConsumption)}
                            onChange={(e) => setConsumption(e.target.value)}
                            value={consumption}
                            required
                        />

                        <Button variant="outlined" style={{marginRight: '100pt', marginTop: '70pt'}}
                                onClick={handleSubmit}>Confirm
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
export default UpdateDevice;
