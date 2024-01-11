package com.maria.ass1.service;

import com.maria.ass1.dtos.DeviceDTO;

import java.util.List;

public interface IEDeviceService {

    /*
    Update dispozitiv pentru un userii, se pot adauga la update
     */
    DeviceDTO updateByUser(Long id, Long unserID) throws Exception;

    List<DeviceDTO >updateDeviceWhenDeleteUser(Long id);
    Boolean delete(Long id);
    List<DeviceDTO> getAllDevices();


    List<DeviceDTO> getDevicesWithIDUserNull();
    DeviceDTO get(Long id) throws Exception;
    List<DeviceDTO> getDevicesForUser(Long id) throws Exception;
    DeviceDTO create(DeviceDTO deviceDTO);


    DeviceDTO updateDevice(Long id, DeviceDTO deviceDto) throws Exception;

    DeviceDTO update(Long id, DeviceDTO deviceDto) throws Exception;

}