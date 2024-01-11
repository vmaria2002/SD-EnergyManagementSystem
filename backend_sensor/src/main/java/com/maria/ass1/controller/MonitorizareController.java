package com.maria.ass1.controller;
import com.maria.ass1.dtos.MonitorizareDTO;
import com.maria.ass1.service.MonitorizareService;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Pentru a transmite mesaje prin WebSokets, vom folosi SimpMessagingTemplate : sugestia Profesorului de laborator :)
 */

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/api/monitorizare")

public class MonitorizareController {
    private final MonitorizareService monitorizareService;

    public MonitorizareController(MonitorizareService monitorizareService, SimpMessagingTemplate simpMessagingTemplate) {
        this.monitorizareService = monitorizareService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /**
    Query: se vor prelua toate inregistrarile din DB fara conditii suplimentare
    URL: http://localhost:8082/api/monitorizare/getAll
    */
    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<MonitorizareDTO>> getAllDevices(){
        System.out.println("okk- get All");
        ResponseEntity<List<MonitorizareDTO>> response= new ResponseEntity<>(monitorizareService.getAllDevices(), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }

    /**
     * Obs: Pentru data selectatata cu pick calendar se va genera Chart-ul pentru dveice-ul asociat
     * Get all records from measuremnets using device_ID_data.  - cand adaug device la USER
     * URL: http://localhost:8082/api/monitorizare/${device_ID}/${data}
    */
    @GetMapping("/showchart/{device_ID}/{data}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Float>> update( @PathVariable("device_ID")  Long device_ID,  @PathVariable("data")  String data ) throws Exception {
        ResponseEntity <List<Float>> response = new ResponseEntity<>( monitorizareService.getMeasurementData(device_ID, data), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
               return response;
    }
    final SimpMessagingTemplate simpMessagingTemplate;

    /**
     * Cand se apasa pe butonul "Start", se va trimite catre "Backend Sensor": id-ul device-ului, max consumption
     * Va ajuta la notificare atingerii consumului maxim
     * Se va verifica astfel ca daca id-ul pentru care se face simularea este acelasi cu cel de la  care se va apasa "Satrt"
     */
    @GetMapping("/startSimulare/{device_ID}/{maxConsumption}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public int simulare(@PathVariable("device_ID")  Long device_ID, @PathVariable("maxConsumption") Long maxConsumption) throws Exception {
        System.out.println("okk- simulare");
        System.out.println("In functia:getMonitoringForDevice ");
        Long device =device_ID;
        float maxConsum = maxConsumption;

        /** Ne conectam la rabbitmq care a fost creat la simulare*/
        ConnectionFactory connectionFactory;
        Connection connection;
        Channel channel = null;

        try {
            connectionFactory = new ConnectionFactory();
            try{
            //System.out.println("In try");
            connectionFactory.setHost("localhost");
              try {
                  connection = connectionFactory.newConnection();

                  try {
                      channel = connection.createChannel();
                      try {
                          channel.queueDeclare("rabbitmq", false, false, false, null);
                      }catch (Exception e){
                          System.out.println(e);
                      }

                  }catch (Exception e){
                      System.out.println(e);
                  }

              }catch (Exception e){
                  System.out.println(e);
              }
            }catch (Exception e){
                System.out.println(e);
            }


            /**** Creez file, in care se va scrie ce s-a citit din coada*/
            System.out.println(" [Coada rabbitmq creata: se asteapta mesajele transmise]");
            String directorPath = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\consola.txt";

            /*** BASICCONSUMER: specific pentru a citi din coada rabbitmq_quweue*/
            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [S-a citit din rabbitmq]:" +message);

            /** Definirea expresiei regulate: Expresii regulate pentru extragerea valorilor */
            Pattern timestampPattern = Pattern.compile("timestamp:(\\d{4}\\.\\d{2}\\.\\d{2}\\.\\d{2}\\.\\d{2}\\.\\d{2})");
            Pattern measurementValuePattern = Pattern.compile("measurementValue:([\\d.]+)");
            Pattern deviceIdPattern = Pattern.compile("deviceId:(\\d+)");

            /** Potrivim expresiile regulate in sir */
            Matcher timestampMatcher = timestampPattern.matcher(message);
            Matcher measurementValueMatcher = measurementValuePattern.matcher(message);
            Matcher deviceIdMatcher = deviceIdPattern.matcher(message);

            /** Verificăm dacă am găsit toate valorile*/
            if (timestampMatcher.find() && measurementValueMatcher.find() && deviceIdMatcher.find()) {
                if(device== Integer.parseInt(deviceIdMatcher.group(1))) {
                    /**Extragem valorile din grupurile potrivite */
                    String timestamp = timestampMatcher.group(1);
                    double measurementValue = Double.parseDouble(measurementValueMatcher.group(1));
                    int deviceId = Integer.parseInt(deviceIdMatcher.group(1));
                    /**daca avem "sters" in mesaj, nu mai scriem */
                    if(message.contains("sters")){
                        String sursa = "/topic/socket/device"+"/"+ deviceId;
                        simpMessagingTemplate.convertAndSend(sursa, "Device: " + deviceId +"sters - opriti simularea");
                    }else {
                        float consum = monitorizareService.consumCurent(deviceId);
                        System.out.println("Consum Total :"+consum+"+Masurat"+measurementValue);
                        System.out.println("max consum: "+maxConsum);

                        /**
                         *
                         *
                         * Notificare pentru Consum MAXIM
                         *
                         *
                         */
                        if(measurementValue+ consum> maxConsum){
                            String sursa = "/topic/socket/device"+"/"+ deviceId;
                            simpMessagingTemplate.convertAndSend(sursa, "Mesaj din Backend Device: "+ "\nConsum depasit pt: " + deviceId);
                        }else {
                            MonitorizareDTO consumObject = new MonitorizareDTO(timestamp, (float) measurementValue, deviceId);
                            //System.out.println(consumObject);

                            /**Adauga in baza de date: daca  status =="adaugat": inser in baza de date*/
                            monitorizareService.create(consumObject);
                            /*** Adaug noul device in consola, pentru a se afisa frumos*/
                            String numeFisier = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\consola.txt";
                            System.out.println(" [S-a citit din rabbitmq]:" +message);
                            try {
                                FileWriter fileWriter = new FileWriter(numeFisier, true);
                                BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
                                bufferedWriter.write(" [S-a citit din rabbitmq]:" + message);
                                bufferedWriter.newLine();
                                bufferedWriter.flush();
                                bufferedWriter.close();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
                System.out.println("ID device invalid");

            } else {
                System.out.println("Date primite incomplete");
            }

            };
            //System.out.println("create channel");
            channel.basicConsume("rabbitmq", true, deliverCallback, consumerTag -> {
            });
        }catch (Exception e){
            System.out.println(e);
        }
        /** * Start simulare*/
        String sursa = "/topic/socket/device"+"/"+ String.valueOf(device_ID);
        simpMessagingTemplate.convertAndSend(sursa, "Mesaj din Backend Device: " + device_ID + "\nStart simulation");
        return 1;
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
        ResponseEntity <Boolean> response = new ResponseEntity<>(monitorizareService.deleteByID(Math.toIntExact(id)), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }
    public void mesajeRequest(HttpStatus httpStatus){
        if(httpStatus==HttpStatus.BAD_REQUEST){
            System.out.println("400:Solicitare invalida");
        }else if(httpStatus==HttpStatus.NOT_FOUND){
            System.out.println("404:Resursa negasita");
        }else if(httpStatus==HttpStatus.METHOD_NOT_ALLOWED){
            System.out.println("405:Acces interzis");
        }else if(httpStatus==HttpStatus.INTERNAL_SERVER_ERROR){
            System.out.println("500:Eroare interna a server-ului");
        }
    }
}



