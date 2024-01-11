/**
 * https://helptechcommunity.wordpress.com/2020/01/28/websocket-chat-application-using-spring-boot-and-react-js/
 */
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
let messageDisplayed = false;
export const subscribe = (DeviceID)=>{
    const websocket  = new SockJS('http://localhost:8082/socket')

    const stompClient = Stomp.over(websocket);
    stompClient.connect({}, (id, headers) => {
        stompClient.subscribe("/topic/socket/device/"+DeviceID, message => {
            // Verificați dacă mesajul nu a fost încă afișat
                alert(message.body);
                messageDisplayed = true;
                stompClient.unsubscribe(id);

        });
    });
}
