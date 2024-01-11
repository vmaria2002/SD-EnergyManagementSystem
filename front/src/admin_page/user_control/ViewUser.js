import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#171616',
        },
    },
});

export default function ViewUser() {
    const [user, setUser] = useState({
        id: '',
        name: '',
        password: '',
        role: ''
    });

    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    useEffect(() => {
        loadUser().then(r => "Preluare user");
    }, []);

    const loadUser = async () => {
        const result =  axios.get(`http://localhost:8080/api/user/get/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        setUser(result.data);
    };

    function getRol(valoare){
        if(valoare===1){
            return "admin";
        }else{
            return "user";
        }
    }

    return (
        <div className="container">
            <ThemeProvider theme={darkTheme}>
                <AppBar  color="primary" enableColorOnDark>
                    Details of user id: {user.id}
                </AppBar>
            </ThemeProvider>
                    <div className="container">

                        <Card sx={{ maxWidth: 9945 }}>
                            <CardMedia
                                sx={{ height: 370, width: 316, marginTop: 10 }}
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRog6epfJWr_aK4Q5m5o6OYOGoJAHZMpky4mA&usqp=CAU"
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Detalii
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <ul className="right-box green-box">
                                        <li className="list-group-item">
                                            <b>Name:</b> {user.name}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Password:</b> {user.password}
                                        </li>
                                        <li className="list-group-item">
                                            <b>Role:</b> ({user.role}): {getRol(user.role)}
                                        </li>
                                        <br></br><br></br><br></br><br></br><br></br>
                                        <div className="card-footer">
                                            <Link className="button green-btn" to="/manageUsers">
                                                Previous Page
                                            </Link>
                                        </div>
                                    </ul>

                                </Typography>
                            </CardContent>
                        </Card>
                </div>
        </div>
    );
}