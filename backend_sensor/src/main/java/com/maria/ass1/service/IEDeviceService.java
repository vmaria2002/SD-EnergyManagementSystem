package com.maria.ass1.service;

import com.maria.ass1.dtos.MonitorizareDTO;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

public interface IEDeviceService {


    List<MonitorizareDTO> getAllDevices();
    List<Float> getMeasurementData(Long deviceId, String data);
    MonitorizareDTO create(MonitorizareDTO monitorizareDTO);
    boolean deleteByID(int id_device);
    float consumCurent(int id_device);



}