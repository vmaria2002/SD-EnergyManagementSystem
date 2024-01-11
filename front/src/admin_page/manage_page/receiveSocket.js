/**
 * https://helptechcommunity.wordpress.com/2020/01/28/websocket-chat-application-using-spring-boot-and-react-js/
 */
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Alert, AlertTitle, Dialog, DialogTitle} from "@mui/material";
import React, {useState} from "react";
let messageDisplayed = false;
export const receiveSocket = (DeviceID)=>{
    const websocket  = new SockJS('http://localhost:8081/socket')

    const stompClient = Stomp.over(websocket);
    stompClient.connect({}, (id, headers) => {
        stompClient.subscribe("/topic/socket/deletedevice/"+DeviceID, message => {
            // Verificați dacă mesajul nu a fost încă afișat
            if (!messageDisplayed) {
                alert(message.body);
                messageDisplayed = true;
                alert("ooll")
                console.log("ojj")
            }
        });
    });
}
