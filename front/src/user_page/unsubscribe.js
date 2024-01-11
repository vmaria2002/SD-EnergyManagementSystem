/**
 * https://helptechcommunity.wordpress.com/2020/01/28/websocket-chat-application-using-spring-boot-and-react-js/

 */

import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
export const unsubscribe = (DeviceID)=>{

    const websocket  = new SockJS('http://localhost:8082/socket')

    const stompClient = Stomp.over(websocket);
    stompClient.disconnect(() => {
        console.log('Conexiune WebSocket închisă.');
    });

}
