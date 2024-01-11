import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import '../style/Admin.module.css'
import {Button} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Stomp as webstomp, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {subscribe} from "../../user_page/subscribe";
import {receiveSocket} from "./receiveSocket";
import stomp from "sockjs-client/lib/transport/iframe";

export default function ManageDevices() {
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const  navigate = useNavigate();


    useEffect(() => {
        loadDevice().then(r => "Se pot prelua device-uri");
    }, []);

    const loadDevice = async () => {
        var result;
        axios.get('http://localhost:8081/api/device/getAll', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

        setUsers(result.data);
    };

    const deleteDevice = async (id) => {
        axios.get(`http://localhost:8081/api/device/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));


        await loadDevice()

        const socket = new SockJS('http://localhost:8082/socket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Conectat la server WebSocket');
            // Trimite mesaj la" /app/sendMessage
            sendMessage('sters'+id);
        });

        function sendMessage(message) {
            // Trimite mesajul către endpoint-ul /app/sendMessage
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ status: message }));
        }


        axios.get(`http://localhost:8082/api/monitorizare/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));

    };
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
            await axios.get(`http://localhost:8081/api/device/get/${searchText}`);
            navigate(`/viewdevice/${searchText}`); // Corectează sintaxa aici
        }catch (e){
            alert("Nu exista device-ul. Incercati alt ID.")
        }
    };

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" enableColorOnDark>
                    Devices :)
                </AppBar>
            </ThemeProvider>
            <div className="input-group" >
                <div className="form-outline">
                    <input type="number" id="form1" className="form-control"  value={searchText}
                           onChange={(e) => setSearchText(e.target.value)} />
                    <Button variant="contained" color="success" size="small" style ={{marginLeft: '5px'}}  onClick={()=>handleButtonClick()}>Search</Button>

                 </div>
                <br></br>
            </div>

            <Link to="/">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-250pt'}}>Home</Button>
            </Link>
            <Link to="/admin">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-250pt'}}>Previous Page</Button>
            </Link>

            <Link to="/manageUsers">
                <Button variant="contained" style={{marginRight: '70px',  marginTop: '-250pt'}}>Users</Button>
            </Link>



            <Link to="/createDevice">
                <Button variant="contained" color="secondary" style={{ marginRight: '2px', marginTop: '-50pt' }}>Add New Device</Button>
            </Link>


            <div>
                <div>
                    <TableContainer component={Paper}>
                        <Table  size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Max. consumption</TableCell>
                                    <TableCell>User Assigned</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.description}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{user.maxConsumption}</TableCell>
                                        <TableCell>{user.user_id}</TableCell>
                                        <TableCell>

                                            <Link to={`/updateDevice/${user.id}`}>
                                                <Button variant="contained" size="small" color="success" style={{ marginRight: '2px' }}>Update</Button>
                                            </Link>

                                            <Link to={`/viewdevice/${user.id}`}>
                                                <Button variant="contained" color="success" size="small"style={{ marginRight: '2px' }}>Show</Button>
                                            </Link>

                                            <Button variant="contained" size="small" onClick={() => deleteDevice(user.id)} color="error" style={{ marginRight: '2px' }}>Delete </Button>

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