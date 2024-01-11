import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import './style/DevicesComponent.module.css'
export default function ViewDevice() {
    const [user, setUser] = useState({
        id: '',
        name: '',
        description: '',
        address: '',
        maxConsumption: '',
        user_id: ''
    });

    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    useEffect(() => {
        loadUser().then(r => "prelua userii");
    }, []);

    const loadUser = async () => {
        const result = axios.get(`http://localhost:8081/api/device/get/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        setUser(result.data);
    };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#171616',
            },

        },
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" enableColorOnDark>
                    Device id: {user.id} - Details
                </AppBar>
            </ThemeProvider>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <div className="container">
                        <div className="left-box">
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/31/70/green-energy-renewable-electricity-logo-vector-28933170.jpg"
                                  height="350"
                                 alt={"/"}></img>
                        </div>
                        <ul className="right-box green-box">
                            <li className="list-group-item">
                                <b>ID:</b> {user.id}
                            </li>
                            <li className="list-group-item">
                                <b>Name:</b> {user.name}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b> {user.description}
                            </li>

                            <li className="list-group-item">
                                <b>Address:</b> {user.address}
                            </li>

                            <li className="list-group-item">
                                <b>Maximum Hourly Energy Consumption:</b> {user.maxConsumption} H
                            </li>

                            <br></br><br></br>


                            <div className="card-footer">
                                <Link className="button green-btn" to="/manageDevices">
                                    Previous Page
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}