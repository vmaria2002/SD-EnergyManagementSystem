package com.maria.ass1.controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Primire mesaje din frontend
 */
@Controller
public class WebSocketController {

    @MessageMapping("/sendMessage")
    @SendTo("/topic/receivedMessage")
    public String handleWebSocketMessage(String message) {
        /**
         * Mesaj primit din front!!!!
         */

        System.out.println(message);
        /** daca mesajul primit este sters, atunci, se creeaza un fisier:*/

        if (message.contains("sters")){

            String directorPath = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\";

            Pattern pattern = Pattern.compile("[0-9]+");
            Matcher matcher = pattern.matcher(message);

            if (matcher.find()) {
                System.out.println("Cifra: " + matcher.group());
            }
            String deviceId = matcher.group();
            //System.out.println("Id:"+deviceId);

            String numeFisier = directorPath + deviceId + "n.txt";
            File fisier = new File(numeFisier);

            try {
                if (fisier.createNewFile()) {
                    FileWriter writer = new FileWriter(fisier);
                    writer.write("-1");
                    writer.close();
                } else {
                }
            } catch (IOException e) {
                System.out.println(e);
            }
        }
        return "Server received: " + message;
    }
}