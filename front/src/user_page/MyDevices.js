/*
https://mui.com/material-ui/react-table/
https://mui.com/x/react-charts/lines/
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
    Alert,
    AlertTitle,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'dayjs';
import { LineChart } from '@mui/x-charts/LineChart';
import {subscribe} from "./subscribe";
export default function MyDevices() {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [alertComponent, setAlertComponent] = useState(null);
    const [users, setUsers] = useState([]);
    const [chart, setChart] = useState([null]);

    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    const { id } = useParams();
    useEffect(() => {
        loadUsers().then(r => "S-au incarcat decice-urile");
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8081/api/device/getDevicesForUser/${id}`);
        setUsers(result.data);
        console.log(id+"")
    };


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#171616',
            },

        },
    });

    const [open, setOpen] = useState(false);
    let err = 0;
    const handleOpen = async (id,dataPentruChart) => {

        setOpen(true);
        console.log(dataPentruChart)
           try{
            const result = axios.get(`http://localhost:8082/api/monitorizare/showchart/${id}/${dataPentruChart}`, {
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
               })
                   .then(result => console.log(result.data))
                   .catch(error => console.error('Error:', error));
               setChart(result.data);
               }catch (e){
               setError(e.message);
               //Mesajul de eroare va fi vizibil doar 5 secunde
               setTimeout(() => {
                   setError(null);
               }, 5000);
           }
    };
    let valStatus;
    valStatus = 0;
    const deschideSimulare  = async (id, maxConsumption) => {
        try {
            const result = axios.get(`http://localhost:8082/api/monitorizare/startSimulare/${id}/${maxConsumption}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(result => console.log(result.data))
                .catch(error => console.error('Error:', error));

            subscribe(id);
        }catch (e){
            setError(e.message);
            //Eroare de server
            //Mesajul de eroare va fi vizibil doar 5 secunde
            setTimeout(() => {
                setError(null);
            }, 1000);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [selectedDate, setSelectedDate] = useState(null);

    let dataPentruChart =''

    const handleDateChange =(date) => {
        if (date) {
            dataPentruChart = date.format('YYYY.MM.DD')
            setSelectedDate(date)

        }
    }


    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color="primary" enableColorOnDark>
                    My Devices
                </AppBar>
            </ThemeProvider>

            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}


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
                                <TableCell></TableCell>
                                <TableCell>Chart</TableCell>
                                <TableCell>Simulare</TableCell>

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
                                    <TableCell>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Data pentru Chart:"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                            />
                                        </LocalizationProvider>
                                        <div>

                                            <Modal open={open} onClose={handleClose}  style={{ backgroundColor: 'cyan', color: 'white' }}>
                                                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-40%, -40%)' }}>
                                                    {selectedDate && (
                                                        <Alert severity="success">
                                                            Chart pentru device {user.id} - Data: {selectedDate.format('YYYY.MM.DD')}
                                                        </Alert>
                                                    )}

                                                          {error ? (
                                                              <Alert severity="error">
                                                                  <AlertTitle>Error</AlertTitle>
                                                                  {error}
                                                              </Alert>
                                                          ) : (
                                                              <LineChart
                                                                  xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }]}
                                                                  series={[
                                                                      {
                                                                          data: chart
                                                                      },
                                                                  ]}
                                                                  width={700}
                                                                  height={560}
                                                              />
                                                          )}


                                                      </div>

                                            </Modal>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpen(user.id, selectedDate.format('YYYY.MM.DD'))}
                                            disabled={selectedDate === null}
                                        >
                                            Show
                                        </Button>
                                        </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => deschideSimulare(user.id, user.maxConsumption)}
                                        >
                                            Start
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            </div>


    );
}