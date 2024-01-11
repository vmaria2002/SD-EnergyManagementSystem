package com.maria.chat.chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Primire mesaje din frontend
 */
@Controller
public class WebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/receivedMessage")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public String handleWebSocketMessage(String message) {
        String mesajTransmis ="";
        int idDestinatar = 0;
        String sursa = null;
        /*** Mesaj primit din front!!!!*/
        System.out.println(message);
        // ********** Trimite de la Admin -> User **************
        if(message.contains("mesajAdmin")) {
            String val[] = message.split("\"");
            mesajTransmis = val[3];
            System.out.println(mesajTransmis);
            idDestinatar = Integer.parseInt(val[7]);
            System.out.println(idDestinatar);
            sursa = "/topic/socket/device" + "/" + String.valueOf(idDestinatar);
        }
        // ********** Trimite de la User -> Admin ****************
        if(message.contains("mesajUser")) {
            String val[] = message.split("\"");
            mesajTransmis = val[3];
            System.out.println(mesajTransmis);
            idDestinatar = Integer.parseInt(val[7]);
            System.out.println(idDestinatar);
            sursa = "/topic/socket/deviceAdmin" + "/" + String.valueOf(idDestinatar);
        }
        System.out.println(sursa);
        simpMessagingTemplate.convertAndSend(sursa, mesajTransmis);

        return "Server received: " + message;
    }
}