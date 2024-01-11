package sensor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import dtos.MonitorizareDTO;
import view.PaginaSenzor;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Scanner;
import java.util.TimerTask;

/**
 * Pentru a programa sarcina de citire, am folosit TimerTask
 * Scop: citeste din fiser la momente specifice de timp
*/
public class ReadSensor extends TimerTask {
    public  static  int stop =0;
    public int deviceId;
    private String indexFilePath;
    /**
     * Path-ul catre fisierul din care se vor citi masuratorile
     */
    private String sensorFilePath = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\sensor.csv";
    private PaginaSenzor paginaSenzor;
    private PaginaSenzor paginaCitit;
    private Long maxConsumption;

    public ReadSensor(Long maxConsumption, int deviceId, PaginaSenzor paginaSenzor, PaginaSenzor paginaCitit){
        this.deviceId = deviceId;
        this.maxConsumption = maxConsumption;
        /* Tinem minte indexul la care a ramas senzorul nostru:*/
        this.indexFilePath = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\"+deviceId+".txt";
        /* Folosim pagina Senzor pentru a ne asigura ca se afiseaza datele in Aplicatia Desktop */
        this.paginaSenzor = paginaSenzor;
        this.paginaCitit = paginaCitit;
    }

    /**
     * Aceasta metoda se va apela dupa scurgerea timpului
     */
    @Override
    public void run() {
        //Citesc din fisier valorile stocate pentru valorile din baza de date
        String numeFisier = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\consola.txt";
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(numeFisier))) {
            StringBuilder continut = new StringBuilder();
            String linie;
            while ((linie = bufferedReader.readLine()) != null) {
                continut.append(linie).append("\n");
            }
            paginaCitit.setTextInTextArea("Date citite din coada"+String.valueOf(continut));
        } catch (IOException e) {
            e.printStackTrace();
        }

        int index = 0 ;
        int counter = 0;
        Scanner scannerSensorFile = null;
        BufferedWriter writer = null;
        try{
            /** citesc indexul de la care continua inregistrearea*/
            Scanner scannerIndexFile = new Scanner(new File(indexFilePath));
            String valoareCurenta = scannerIndexFile.next();

            index = Integer.parseInt(valoareCurenta);
            long numarLinii = Files.lines(Path.of(sensorFilePath)).count();
            if (index == numarLinii){
                index = 0;
            }

        }catch(FileNotFoundException e){
            System.out.println(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        float total = 0;
        float maxim=0;
        try {
            scannerSensorFile = new Scanner(new File(sensorFilePath));
            while (scannerSensorFile.hasNextLine())
            {
                 /**
                 * S-a ajuns la linia pe care o vom citi==> aici se citeste "masuratoarea" si se adauga inregistraeea in baza de date
                 */
                if(counter==index) {
                        /**
                         * Inregistrare sub forma: {timestamp, value, deviceID}
                         * Preiau timpul local
                         */
                        String timestamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
                        double value = Double.parseDouble(scannerSensorFile.nextLine());
                        /** Creez obiect "minitorizare" pentru a-l transmite mai departe*/
                        MonitorizareDTO measurement = new MonitorizareDTO(timestamp, (float) value,deviceId);
                        String valoriDeAfisat="";
                        /** * Verific daca s-a sters device-ul, pentru a nu-l adauga in baza de date si a opri TaskTime */

                        String filePath = "D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\src\\main\\resources\\"+ deviceId +"n.txt";
                        File file = new File(filePath);
                        /** * Se verifica daca fisierul exista */
                        boolean fileExists = file.exists();

                    /**
                     * Setez tipul de mesaj transmis: "adaugat" sau "sters"
                     */
                    ConnectionFactory connectionFactory;
                    Channel channel = null;
                    Connection connection = null;
                    if(fileExists) {
                        valoriDeAfisat = "[S-a scris in rabbitmq_queue]:MonitorizareDTO(id="+index+", timestamp="+timestamp+", measurementValue="+value+", deviceId="+deviceId+")status: sters";
                        try {
                            // Configurarea conexiunii la RabbitMQ
                            connectionFactory = new ConnectionFactory();
                            try  {
                                connectionFactory.setHost("localhost");
                                try {
                                    /*** Crearea si deschiderea conexiunii*/
                                    connection = connectionFactory.newConnection();
                                    try  {
                                        /*** Se creeaza canalul */
                                        channel = connection.createChannel();
                                        /** * Se creeaza coada*/
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
                        } catch (Exception e) {
                            System.out.println(e);
                        }finally {
                            String json = new ObjectMapper().writeValueAsString(measurement+"sters");
                            channel.basicPublish("", "rabbitmq", null, json.getBytes());
                            channel.close();
                            connection.close();
                            this.cancel();
                        }
                        }else {
                        try {
                            connectionFactory = new ConnectionFactory();
                            try {
                                connectionFactory.setHost("localhost");
                            try {
                                connection = connectionFactory.newConnection();
                                try {
                                    channel = connection.createChannel();
                                    try {
                                        channel.queueDeclare("rabbitmq", false, false, false, null);
                                        /*** basicPublish: specific pentru a trimite mesaje*/
                                        String json = new ObjectMapper().writeValueAsString("timestamp:"+timestamp+",measurementValue:"+value+",deviceId:"+deviceId);
                                        channel.basicPublish("", "rabbitmq", null, json.getBytes());
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
                        }catch (Exception e){
                            System.out.println(e);
                        }
                         finally {
                            channel.close();
                            connection.close();
                            valoriDeAfisat = "[S-a scris in rabbitmq_queue]:MonitorizareDTO(id="+index+", timestamp="+timestamp+", measurementValue="+value+", deviceId="+deviceId+")status: adaugat";
                        }
                    }

                    String newText =paginaSenzor.getTextInTextArea()+"\n"+ valoriDeAfisat;
                    paginaSenzor.setTextInTextArea(newText);
                    counter++;
                    break;

                }else{
                    scannerSensorFile.nextLine();
                }
                    counter++;
            }
            writer = new BufferedWriter(new FileWriter(indexFilePath));
            writer.write(Integer.toString(counter));
            writer.close();
            scannerSensorFile.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

}
