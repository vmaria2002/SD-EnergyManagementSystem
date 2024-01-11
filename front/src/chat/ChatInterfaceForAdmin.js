import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, AlertTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import {AT_KEY, COOKIE_SECRET, validToken} from "../utils";
import {request} from "axios";
import * as socket from "react-dom/test-utils";
const ChatInterfaceForAdmin = () => {
    // eslint-disable-next-line no-restricted-globals
    const { id } = useParams();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const [isTyping, setIsTyping] = useState(false);
    const [afisare, setAfisare] = useState(false);
    const [afisare2, setAfisare2] = useState(false);
    const [alertaSeen, setAlertaSeen] = useState(false);



    useEffect(() => {
        if(localStorage.getItem('seen') ==='seen') {
            window.location.reload();
            localStorage.setItem('seen', '');
        }
    }, []);

    const handleKeyDown = () => {
        setTimeout(() => {
            setIsTyping(true);
        }, 4000);

        setIsTyping(false);

        const socket = new SockJS('http://localhost:8084/socket');

        cookieParser(COOKIE_SECRET)(Request, Response, () => {
            const signedCookies = Request.signedCookies;
            let at =  extractTokenFromRequest();

            //daca nu exista token in cookies, il extrage din URL
            if (!at && !!Request.url) {
                const url = new URL(Request.url, `ws://${Request.headers.host}`);
                at = url.searchParams.get('at');
            }
            if (!validToken(at)) {
                socket.close();
                return;
            } else {
                const stompClient = Stomp.over(socket);

                function sendMessage() {
                    stompClient.send('/app/sendMessage', {}, JSON.stringify({ mesajAdmin: "typing", sendToUserID: id }));
                }
                stompClient.connect({}, function (frame) {
                    console.log('Conectat la server WebSocket');
                    sendMessage();
                });
            }
        });
    };
    const extractTokenFromRequest = () => {
        const signedCookies = Request.signedCookies;
        let at = signedCookies(AT_KEY);

        if (!at && !!request.url) {
            const url = new URL(request.url, `ws://${request.headers.host}`);
            at = url.searchParams.get('at');
        }
        return at;
    };

    const handleKeyUp = () => {
        setTimeout(() => {
            setIsTyping(false);
        }, 4000);
        setIsTyping(false);

        const socket = new SockJS('http://localhost:8084/socket');
        cookieParser(COOKIE_SECRET)(Request, Response, () => {
            const stompClient = Stomp.over(socket);

            const at = extractTokenFromRequest();

            if (!validToken(at)) {
                // Token invalid, se inchide conexiunea
                socket.close();
                return;
            }

            function sendMessage(v) {
                stompClient.send('/app/sendMessage', {}, JSON.stringify({mesajAdmin: "notyping", sendToUserID: id}));
            }

            stompClient.connect({}, function (frame) {
                console.log('Conectat la server WebSocket');
                sendMessage("notyping");
            });
        })
    };
    useEffect(() => {

        const storedMessages = JSON.parse(localStorage.getItem(`chatMessagesAdmin_${id}`)) || [];
        setMessages(storedMessages);
        const storedReceivedMessages = JSON.parse(localStorage.getItem(`receivedMessages_${id}`)) || [];
        setReceivedMessages(storedReceivedMessages);
        const websocket = new SockJS('http://localhost:8084/socket');
        cookieParser(COOKIE_SECRET)(Request, Response, () => {
            const stompClient = Stomp.over(websocket);

            const at = extractTokenFromRequest();

            if (!validToken(at)) {
                // Token invalid, se inchide conexiunea
                socket.close();
                return;
            }
            stompClient.connect({}, (headers) => {
                stompClient.subscribe(`/topic/socket/deviceAdmin/${id}`, message => {

                    if (message.body === "typing") {
                        setAfisare(true)
                        setAfisare2(false)
                    } else if (message.body === "notyping") {
                        setAfisare2(true);
                        setAfisare(false)

                    } else if (message.body === "seen") {
                        setAlertaSeen(true);

                        setTimeout(() => {
                            setAlertaSeen(false);
                        }, 1000);


                    } else {
                        setAfisare(false)
                        setAfisare2(false)
                        const newMessage = {text: message.body, timestamp: Date.now()};
                        setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
                    }
                });
            });
        })
    }, [id]);
    var ok =0;
    useEffect(()=>{

        //Trimit mesaj:
        const socket = new SockJS('http://localhost:8084/socket');
        cookieParser(COOKIE_SECRET)(Request, Response, () => {
            const stompClient2 = Stomp.over(socket);
            const at = extractTokenFromRequest();

            if (!validToken(at)) {
                // Token invalid, se inchide conexiunea
                socket.close();
                return;
            }

            function sendMessage(v) {
                stompClient2.send('/app/sendMessage', {}, JSON.stringify({mesajAdmin: "seen", sendToUserID: id}));
            }

            stompClient2.connect({}, function (frame) {
                console.log('Conectat la server WebSocket');
                sendMessage("seen");
                // alert("ok")
                console.log("ok-msg")
                localStorage.setItem(`new_admin_${id}`, '')

                // eslint-disable-next-line no-restricted-globals
            });
        })
    }, [])

    useEffect(() => {
            localStorage.setItem(`chatMessagesAdmin_${id}`, JSON.stringify(messages));

    }, [id, messages]);
    useEffect(() => {
            localStorage.setItem(`receivedMessages_${id}`, JSON.stringify(receivedMessages));

    }, [id, receivedMessages]);
    useEffect(() => {
        if(localStorage.getItem(`new_admin_${id}`)!=='') {
            const newMessage = {text: localStorage.getItem(`new_admin_${id}`), timestamp: Date.now()};
            setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
            localStorage.setItem(`receivedMessages_${id}`, JSON.stringify(receivedMessages));
            localStorage.setItem(`new_admin_${id}`, '')

        }

    }, [id,  localStorage.getItem(`new_admin_${id}`)]);

    // Verificam daca s-a dat seen la mesaj:
    useEffect(() => {
    });
    const handleSendMessage = () => {
        const socket = new SockJS('http://localhost:8084/socket');
        const stompClient = Stomp.over(socket);
        const at = extractTokenFromRequest();

        if (!validToken(at)) {
            // Token invalid, se inchide conexiunea
            socket.close();
            return;
        }
        function sendMessage(message) {
            stompClient.send('/app/sendMessage', {}, JSON.stringify({ mesajAdmin: message, sendToUserID: id }));
        }

        if (inputText.trim() !== '') {
            const newMessage = { text: inputText, timestamp: Date.now(), sender: 'user' };
            setMessages([...messages, newMessage]);
            setInputText('');
            stompClient.connect({}, function (frame) {
                console.log('Conectat la server WebSocket');
                sendMessage(inputText);
            });
        }
    };

    return (
        <div>
            {alertaSeen && <Alert variant="outlined" severity="error">
                <p>Mesaj citit de catre User-ul {id}</p>

            </Alert> }
            <Alert severity="warning" style={{ backgroundColor: '#dfb4ec', color: '#100f0f' }}>
                <AlertTitle>Chat Admin :)</AlertTitle><strong></strong>

            </Alert>



            <div style={{ width: 400, height: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, position: 'relative' }}>
                <div
                    style={{
                        maxHeight: 300,
                        overflowY: 'scroll',
                    }}
                >
                    {receivedMessages
                        .concat(messages)
                        .sort((a, b) => a.timestamp - b.timestamp)
                        .map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: 10,
                                    textAlign: message.sender === 'user' ? 'right' : 'left',
                                    color: message.sender === 'user' ? '#100f0f' : '#000',
                                    backgroundColor: message.sender === 'user' ? '#cbb2f6' : '#e0e0e0',
                                    padding: 8,
                                    borderRadius: 8,
                                }}
                            >
                                {message.sender === 'user' ? (
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Admin ({new Date(message.timestamp).toLocaleTimeString()}): </span>
                                        {message.text}
                                    </div>
                                ) : (
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>User {id} ({new Date(message.timestamp).toLocaleTimeString()}): </span>
                                        {message.text}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                {afisare && <Alert variant="outlined" severity="error">
                    <p>User {id} typing...</p>
                </Alert> }

                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    <TextField
                        label="Mesaj"
                        variant="outlined"
                        fullWidth
                        value={inputText}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp}
                        onChange={(e) => setInputText(e.target.value)}
                        style={{ marginRight: 10 }}
                        InputProps={{
                            style: { backgroundColor: '#ffffff', color: '#100f0f', borderRadius: 8, textAlign: 'right' },
                        }}
                    />

                    <Button variant="contained" onClick={handleSendMessage} color="primary" style={{ backgroundColor: '#c735f8', color: '#fff' }}>
                        Trimite
                    </Button>
                </div>
            </div>

        </div>

    );
};

export default ChatInterfaceForAdmin;
