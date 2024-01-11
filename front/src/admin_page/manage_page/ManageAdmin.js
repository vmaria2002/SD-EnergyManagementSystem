/*
Sursa: https://mui.com/material-ui/react-table/
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import  '../style/Admin.module.css'
import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


export default function ManageAdmins() {
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
        loadUsers().then(r => "Eroare, nu se pot prelua userr");
    }, []);

    /*
    Doar userii!!
     */
    const loadUsers = async () => {
        //auth:
        axios.get('http://localhost:8080/api/user/getAllAdmins', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error));
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
        }
    };

    return (
        <div>
            <Link to="/">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-220pt'}}>Home</Button>
            </Link>
            <Link to="/admin">
                <Button variant="contained" color="success" style={{marginRight: '70px',  marginTop: '-220pt'}}>Previous Page</Button>
            </Link>
            <Link to="/manageDevices">
                <Button variant="contained" style={{marginRight: '70px',  marginTop: '-220pt'}}>Devices</Button>
            </Link>
            <Link to="/manageUsers">
                <Button variant="contained" style={{marginRight: '70px',  marginTop: '-220pt'}}>Users</Button>
            </Link>

            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" enableColorOnDark>
                    Admin
                </AppBar>
            </ThemeProvider>

            <div className="form-outline">
                <input type="number" id="form1" className="form-control"  value={searchText}
                       onChange={(e) => setSearchText(e.target.value)} />
                <Button variant="contained" color="success" size="small" style ={{marginLeft: '5px'}}  onClick={()=>handleButtonClick()}>Search</Button>

            </div>
            <br></br>


            <div>
                <div>


                        <TableContainer component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell> Password</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>

                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>{getRol(user.role)}</TableCell>

                                <TableCell>

                                    <Link to={`/update/${user.id}`}>
                                        <Button variant="contained" color="success" style={{ marginRight: '2px' }}>Update</Button>
                                    </Link>

                                    <Link to={`/viewuser/${user.id}`}>
                                        <Button variant="contained" color="success" style={{ marginRight: '2px' }}>Show info</Button>
                                    </Link>

                                    <Button variant="contained" onClick={() => deleteUser(user.id)} color="error" style={{ marginRight: '2px' }}>Delete </Button>



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