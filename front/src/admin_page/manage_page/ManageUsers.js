import React, { useEffect, useState } from "react";
import axios, {request} from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import '../style/UserStyle.css'
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SockJsClient from 'react-stomp';
import  '../style/chat.css'
import NotificationIcon from "../../chat/NotificationIcon";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {Request, Response} from "express";
import {AT_KEY, COOKIE_SECRET, validToken} from "../../utils";
import cookieParser from "cookie-parser";


export default function ManageUsers() {
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    const [numNotifications, setNumNotifications] = useState(0);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const  navigate = useNavigate();
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        loadUsers().then(r => "Se pot prelua userii");
    }, []);

    const extractTokenFromRequest = () => {
        const signedCookies = Request.signedCookies;
        let at = signedCookies(AT_KEY);

        if (!at && !!request.url) {
            const url = new URL(request.url, `ws://${request.headers.host}`);
            at = url.searchParams.get('at');
        }
        return at;
    };
    const initializeWebSocket = (id) => {
        const websocket = new SockJS('http://localhost:8084/socket');

        cookieParser(COOKIE_SECRET)(Request, Response, () => {

            const stompClient = Stomp.over(websocket);
            const at = extractTokenFromRequest();
            if (!validToken(at)) {
                // Token invalid, se inchide conexiunea
                websocket.close();
                return;
            }
            stompClient.connect({}, (headers) => {
                stompClient.subscribe(`/topic/socket/deviceAdmin/${id}`, async (message) => {
                    const newMessage = {text: message.body, timestamp: Date.now()};

                    if (message.body !== "typing" && message.body !== "notyping" && message.body !== "seen") {
                        setNumNotifications(id);
                        //setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
                        //localStorage.setItem(`receivedMessages_${id}`, JSON.stringify(newMessage));
                        localStorage.setItem(`new_admin_${id}`, message.body);
                        localStorage.setItem(String(id), String(id));
                    }
                });
            });
        })
    };

    const loadAndInitialize = async () => {
        await loadUsers();
        const userIds = users.map((user) => user.id);
        userIds.forEach((userId) => {
            console.log(userId);
            initializeWebSocket(userId);
        });
    };


    useEffect(() => {
        loadAndInitialize();
    }, [numNotifications, users]);



const loadUsers = async () => {
        var result;
        axios.get("http://localhost:8080/api/user/getAllUsers", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(result => console.log(result.data))
        .catch(error => console.error('Error:', error));

        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        axios.delete(`http://localhost:8080/api/user/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        await loadUsers()
        axios.put(`http://localhost:8081/api/device/updateDeviceWhenDeleteUser/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

    };
    function getRol(valoare){
        if(valoare===1){
            return "admin";
        }else{
            return "user";
        }
    }
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#171616',
            },

        },
    });


    const handleButtonClick = async () => {
        // Aici poți să faci ce dorești atunci când butonul este apăsat
        try{
            axios.get(`http://localhost:8080/api/user/get/${searchText}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => console.log(result.data))
                .catch(error => console.error('Error:', error));

            navigate(`/viewuser/${searchText}`); // Corectează sintaxa aici
        }catch (e){
            alert("Nu exista user-ul. Incercati alt ID.")
        }
    };
const connect = ()=>{
    const sock = new SockJsClient()
}
var p;
    useEffect(() => {
        // Setează 'seen' în localStorage atunci când utilizatorul vede notificările
        localStorage.setItem('seen', 'seen');

    });

    function openChat() {
        var chatBox = document.getElementById("chat-box");
        chatBox.style.display = "block";
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" enableColorOnDark>
                    Users

                </AppBar>
            </ThemeProvider>

                <div className="form-outline">
                    <input type="number" id="form1" className="form-control"  value={searchText}
                           onChange={(e) => setSearchText(e.target.value)} />
                    <Button variant="contained" color="success" size="small" style ={{marginLeft: '5px'}}  onClick={()=>handleButtonClick()}>Search</Button>

                </div>
                <br></br>


            <Link to="/">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-250pt'}}>Home</Button>
            </Link>
            <Link to="/admin">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-250pt'}}>Previous Page</Button>
            </Link>
            <Link to="/manageDevices">
                <Button variant="contained" style={{marginRight: '70px',  marginTop: '-250pt'}}>Devices</Button>
            </Link>



                    <Link to="/adduser">
                        <Button variant="contained" color="secondary" style={{ marginRight: '2px', marginTop: '-50pt' }}>Add New User</Button>
                    </Link>

            <div>
                <div>
                    <TableContainer component={Paper}>
                        <Table  size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell> View Devices </TableCell>
                                    <TableCell>Assign Device</TableCell>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Chat</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>

                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{getRol(user.role)}</TableCell>

                                        <TableCell>
                                            <Link  to={`/seeDevices/${user.id}`}>
                                                <Button variant="contained" color="success" size="small" style={{ marginRight: '2px' }}>My Devices</Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>

                                            <Link to={`/addDeviceForUser/${user.id}`}>
                                                <Button variant="contained" color="success" size="small" style={{ marginRight: '2px' }}>Assign Device</Button>
                                            </Link>

                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/update/${user.id}`}>
                                                <Button variant="contained" size="small" style={{ marginRight: '2px' }}>Update</Button>
                                            </Link>


                                            <Link to={`/viewuser/${user.id}`}>
                                                <Button variant="contained" size="small" style={{ marginRight: '2px' }}>Show</Button>
                                            </Link>

                                            <Button variant="contained" size="small" onClick={() => deleteUser(user.id)} color="error" style={{ marginRight: '2px' }}>Delete </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Link to={`/chat/${user.id}`}>
                                                <Button
                                                    onClick={() => {
                                                        if(String(user.id)===localStorage.getItem(String(user.id))) {
                                                            localStorage.setItem(String(user.id), '0');
                                                        }
                                                    }}
                                                    variant="contained"
                                                    size="small"
                                                    style={{ backgroundColor: '#c735f8', color: '#fff' }}

                                                >
                                                    Chat

                                                    {String(user.id) === localStorage.getItem(String(user.id)) && <NotificationIcon numNotifications={1} />}


                                                </Button>

                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
            </div>
        </div>
    );
}