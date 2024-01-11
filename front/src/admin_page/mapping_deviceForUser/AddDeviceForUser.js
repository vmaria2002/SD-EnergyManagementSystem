//https://www.npmjs.com/package/react-native-element-dropdown
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import 'react-dropdown/style.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#171616',
        },
    },
});
const AddDeviceForUser = (props) => {
    const { id } = useParams();
    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken
    const [devices, setDevices] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const select = (event)=> {
        setSelectedOption(event.target.value);
    }
    let navigate = useNavigate();
    let id_device="";
    const showSelectedValue = async (e) => {
        e.preventDefault();
        var result;
        /*
        LOGICA pentru gasire ID device:
         */
        const regex = /\((\d+)\)/g;

        const matches = [...selectedOption.matchAll(regex)];

        id_device = matches.map(match => match[1]);
        //alert(`Valoarea selectată este: ${id_device}`);

        /* preia info despre device-ul selectat: */
        const idDeviceNumber = parseInt(id_device, 10);
        console.log(idDeviceNumber);

        axios.put(`http://localhost:8081/api/device/addToUser/${idDeviceNumber}/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error))

        const devices = result.data;
        console.log(devices);
        navigate('/manageDevices');

        };

    useEffect(() => {
        getDevices();
    }, []);

    //Preluam toate dispozitivele care nu sunt asignate:
    //cu user_id == null


    const getDevices = async () => {
        var result;
        axios.get("http://localhost:8081/api/device/getDevicesWithIDUserNull", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(result => console.log(result.data))
            .catch(error => console.error('Error:', error))

        const devicesCuUserNull =  result.data;
        setDevices(devicesCuUserNull);
    };

    useEffect(()=>{
        getDevices().catch((error) => {
        })
    },[]);

    // Pt a completa lista din drop down
    let deviceList = [];

    devices.forEach(device => {
        const deviceName = device.name
        deviceList.push(deviceName+"("+ device.id+")");
    });

    /*dropdown cu elementele date*/

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar  color="primary" enableColorOnDark>
                    Assign Device for user with id: {id}
                </AppBar>
            </ThemeProvider>
        <Card sx={{ maxWidth: 445 }}>
            <CardMedia
                sx={{ height: 370 }}
                image="https://www.shutterstock.com/image-vector/electric-logo-thunder-symbol-bolt-260nw-1087570499.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Asignare Device
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   Selectati dispozitivul dorit. Acesta va fi asignat user-ului {id}
                </Typography>
            </CardContent>
            <CardActions>
                <div>
                    <select  value ={selectedOption}  onChange={select} >
                        <option value="">Selectare dispozitiv</option>
                        {deviceList.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button className="button green-btn2" onClick={showSelectedValue}>Confirm</button>
                </div>
            </CardActions>
        </Card>
        </div>
    );
}

export default AddDeviceForUser;