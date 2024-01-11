package com.maria.ass1.service;
import com.maria.ass1.dtos.MonitorizareDTO;
import com.maria.ass1.model.Consum;
import com.maria.ass1.model.Monitorizare;
import com.maria.ass1.repository.MonitorizareRepository;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@RequiredArgsConstructor
public class MonitorizareService implements IEDeviceService {
    private final MonitorizareRepository monitorizareRepository;
    @Override
    public List<MonitorizareDTO> getAllDevices() {
        /**Iau toate device-urilor*/
        List<Monitorizare> monitorizares = monitorizareRepository.findAll();
        List<MonitorizareDTO> monitorizareDTO = new ArrayList<>();
        for (Monitorizare monitorizare : monitorizares) {
            monitorizareDTO.add(new MonitorizareDTO().convertEntityToDto(monitorizare));
        }
        return monitorizareDTO;
    }

    @Override
    public List<Float> getMeasurementData(Long deviceId, String data) {
        List<Monitorizare> monitorizares = monitorizareRepository.findAll();
        List<Consum> monitorizareDTO = new ArrayList<>();
        Consum consum = null;
        /** Parcurg rezultatele si le adaug in lista rezultat;*/

        for (int i = 0; i < monitorizares.size(); i++) {
            Monitorizare monitorizare = monitorizares.get(i);
            if(monitorizare.getDevice_id() == deviceId){
                /**preiau data din data: */
                String dataTrimisa = monitorizare.getTimestamp();
                /** Preiau an, luna, an, exact cum primesc in URL:*/
                String datePart = dataTrimisa.substring(0, 10);
                // System.out.println("Data din URL: "+datePart);
                /**Preiau ora- sa pot afisa in Chart:*/
                String oraPart = dataTrimisa.substring(11, 13);
                //System.out.println("Ora pentru data trimisa in URL: "+ oraPart);
               if(datePart.equals(data)) {
                   consum = new Consum(monitorizare.getMeasurement_value(), Integer.parseInt(oraPart));
                   monitorizareDTO.add(consum);
               }
            }

        }
        /**
         * Preiau toate valorile, cumuland valorile de consum in cazul in care avem consum inregistrat la aceeasi ora!
         */
        List<Float> sumePeOre = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            sumePeOre.add(0.0f);
        }
        /** Elementul din lista:*/
        for (Consum consum1 : monitorizareDTO) {
            /** Elementul din lista:*/
            float previous = sumePeOre.get(consum1.getOra());
            sumePeOre.set(consum1.getOra(), consum1.getValoare() + previous);
        }
        for (int i = 0; i <24; i++) {
            System.out.println(sumePeOre.get(i));
        }
        return sumePeOre;

    }

    @Override
    public MonitorizareDTO create(MonitorizareDTO monitorizareDTO) {
        System.out.println("Creat in DB");
        Monitorizare monitorizare = new Monitorizare();
        monitorizare.setDevice_id(monitorizareDTO.getDeviceId());
        monitorizare.setTimestamp(monitorizareDTO.getTimestamp());
        monitorizare.setMeasurement_value(monitorizareDTO.getMeasurementValue());
        monitorizareRepository.save(monitorizare);
        return monitorizareDTO;
    }



    @Override
    public boolean deleteByID(int id_device) {
        List<Monitorizare> monitorizares = monitorizareRepository.findAll();
        List<MonitorizareDTO> monitorizareDTO = new ArrayList<>();

        // Parcurg rezultatele si le adaug in lista rezultat;
        for (int i = 0; i < monitorizares.size(); i++) {
            if (monitorizares.get(i).getDevice_id() == id_device) {

                Monitorizare monitorizare = monitorizares.get(i);
                monitorizareRepository.delete(monitorizare);
                monitorizareDTO.add(new MonitorizareDTO().convertEntityToDto(monitorizare));

            }
        }
        return  true;
    }

    public float consumCurent(int id_device) {
        List<Monitorizare> monitorizares = monitorizareRepository.findAll();
         float consumToatal=0;
        /**Parcurg rezultatele  calculez totalul*/
        for (int i = 0; i < monitorizares.size(); i++) {
            if (monitorizares.get(i).getDevice_id() == id_device) {
                Monitorizare monitorizare = monitorizares.get(i);
                consumToatal +=monitorizare.getMeasurement_value();
            }
        }
        return consumToatal;
    }
}