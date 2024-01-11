import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import './style/User.module.css'
import {useCookies,} from "react-cookie";
import {deleteAllCookies} from "../cookies/cookies";
import {displayAllCookies} from "../cookies/displayAllCookies";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import NotificationIcon from "../chat/NotificationIcon";
import {Request, Response} from "express";
import {AT_KEY, COOKIE_SECRET, validToken} from "../utils";
import {request} from "axios";
import cookieParser from "cookie-parser";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#171616',
        },
    },
});

const User = () => {

    const { id } = useParams();

    var storedUserObject = localStorage.getItem('usertoken'+id);
    //se preia user-ul cu token-ul asociat:
    var userToken = JSON.parse(storedUserObject);
    //preluare token de acces:
    var token = userToken.accessToken

    const [cookies, setCookie] =useCookies('')
    const [numNotifications, setNumNotifications] = useState(0);

    useEffect(() => {
        deleteAllCookies();
        setCookie("status_autentificare","logat")
        setCookie("userID", Number(id))
        setCookie("userRole", 2)
    });

    const extractTokenFromRequest = () => {
        const signedCookies = Request.signedCookies;
        let at = signedCookies(AT_KEY);

        if (!at && !!request.url) {
            const url = new URL(request.url, `ws://${request.headers.host}`);
            at = url.searchParams.get('at');
        }
        return at;
    };

    useEffect(() => {
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
                stompClient.subscribe(`/topic/socket/device/${id}`, async (message) => {
                    const newMessage = {text: message.body, timestamp: Date.now()};
                    if (message.body !== "typing" && message.body !== "notyping" && message.body !== "seen") {
                        setNumNotifications(id);
                        localStorage.setItem(`new_user${id}`, message.body);
                    }
                });
            });
        })
    }, [numNotifications]);


    return(
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar  color="primary" enableColorOnDark>
                    Bine ati venit - User Page
                    { displayAllCookies()}
                </AppBar>
            </ThemeProvider>

            <div>
                <Link  to= {`/seeDevicesByUser/${id}`}>
                    <Button variant="contained" color="success" style={{marginRight: '70px',marginTop: '190px', marginBottom: '20px'}}>Devices</Button>
                </Link>

                <Link  to= "/">
                    <Button variant="contained"  style={{marginRight: '70px',marginTop: '190px', marginBottom: '20px'}}>Home</Button>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/chatulUserului/${id}`}>
                        <Button
                            variant="contained"
                            style={{
                                marginRight: '70px',
                                backgroundColor: '#00ffa6',
                                color: '#100f0f',
                            }}
                        >
                            Chat with admin
                        </Button>
                    </Link>
                    {numNotifications === id ? (
                        <Link to={`/chatulUserului/${id}`}>
                            <NotificationIcon numNotifications={1} />
                        </Link>
                    ) : null}
                </div>

            </div>

            <div>
                <img src="https://i0.wp.com/networknuts.net/wp-content/uploads/2019/11/zahir-accounting-software-have-more-than-60.000-users.png"
                     height="700"
                     width= "900"
                     alt={"/"}></img>
            </div>

        </div>
    );
}
export default User;