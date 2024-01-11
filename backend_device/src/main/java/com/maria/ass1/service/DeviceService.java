package com.maria.ass1.service;
import com.maria.ass1.dtos.DeviceDTO;
import com.maria.ass1.model.Device;
import com.maria.ass1.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class DeviceService implements IEDeviceService {
    private final DeviceRepository deviceRepository;

    @Override
    public List<DeviceDTO> getAllDevices() {
        // Iau toate device-urilor
        List<Device> devices = deviceRepository.findAll();
        List<DeviceDTO> deviceDTO = new ArrayList<>();
        // Parcurg rezultatele si le adaug in lista rezultat;
        for (int i = 0; i < devices.size(); i++) {
            Device device = devices.get(i);
            deviceDTO.add(new DeviceDTO().convertEntityToDto(device));
        }
        return deviceDTO;
    }
    @Override
    public List<DeviceDTO> getDevicesForUser(Long id) {
        // Iau toate device-urilor
        List<Device> devices = deviceRepository.findAll();
        List<DeviceDTO> deviceDTO = new ArrayList<>();
        // Parcurg rezultatele si le adaug in lista rezultat;
        for (int i = 0; i < devices.size(); i++) {
            Device device = devices.get(i);
            if(device.getUserTable() == id) {
                deviceDTO.add(new DeviceDTO().convertEntityToDto(device));
            }
        }
        return deviceDTO;
    }
    @Override
    public List<DeviceDTO> getDevicesWithIDUserNull() {
        // Iau toate device-urilor
        List<Device> devices = deviceRepository.findAll();
        List<DeviceDTO> deviceDTO = new ArrayList<>();
        // Parcurg rezultatele si le adaug in lista rezultat;
        for (int i = 0; i < devices.size(); i++) {
            Device device = devices.get(i);
            //System.out.println(device.getUserTable());
            if(device.getUserTable() == null) {
                deviceDTO.add(new DeviceDTO().convertEntityToDto(device));
            }
        }
        return deviceDTO;
    }


    @Override
    public DeviceDTO create(DeviceDTO deviceDTO) {
        // Pentru datele primite in body, le preiau
        //Creez un nou device
        //Setez valorile din body la valorile noului obiect
        Device device = new Device();
        device.setName(deviceDTO.getName());
        device.setMaxConsumption(deviceDTO.getMaxConsumption());
        device.setAddress(deviceDTO.getAddress());
        device.setDescription(deviceDTO.getDescription());

        /*
        Verific printre toate device-urile sa vad daca exista vreunul cu acelasi nume si adresa
         */
        List<Device> devices = deviceRepository.findAll();
        DeviceDTO newDevice = null;
        int count = 0;
        // Parcurg rezultatele si le adaug in lista rezultat;
        for (int i = 0; i < devices.size(); i++) {
            Device myDevice = devices.get(i);
            //System.out.println(device.getUserTable());
            if((myDevice.getName().equals(device.getName()) && myDevice.getAddress().equals(device.getAddress()))) {
                count=1;
            }
        }
        if(count == 0){
            newDevice= new DeviceDTO().convertEntityToDto(deviceRepository.save(device));
        }

        //Convertesc de la DTO, la valoare de stocat in tabel

        return newDevice;
    }

    @Override
    public DeviceDTO get(Long id) throws Exception {
        //Preiau entry din repository
        //Valoarea cu ID-ul dat se preia
        DeviceDTO newDevice = new DeviceDTO().convertEntityToDto(deviceRepository.findById(id).orElseThrow(()->new Exception("nu se poate prelua ID")));
        return newDevice;
    }

    @Override
    public DeviceDTO updateDevice(Long id, DeviceDTO deviceDto) throws Exception {
        //Se preia entry cu ID-ul dat
        Device updatedDevice = deviceRepository.findById(id).orElseThrow(()->new Exception("Dispozitovul nu exista"));
        //Actualizez valorile din DB:
        updatedDevice.setDescription(deviceDto.getDescription());
        updatedDevice.setName(deviceDto.getName());
        updatedDevice.setAddress(deviceDto.getAddress());
        updatedDevice.setMaxConsumption(deviceDto.getMaxConsumption());
        //Conversie din DTO la data de procesat in tabel
        DeviceDTO newDevice = new DeviceDTO().convertEntityToDto(deviceRepository.save(updatedDevice));
        return newDevice;
    }



    /*
    Update dispozitiv pentru un userii, se pot adauga la update
     */
    @Override
    public DeviceDTO update(Long id, DeviceDTO deviceDto) throws Exception {
        Device updatedDevice = deviceRepository.findById(id).orElseThrow(()->new Exception("Dispozitovul nu exista"));
        updatedDevice.setMaxConsumption(deviceDto.getMaxConsumption());
        updatedDevice.setDescription(deviceDto.getDescription());
        updatedDevice.setName(deviceDto.getName());
        updatedDevice.setAddress(deviceDto.getAddress());
        //Se acrualizeaza ID-ul pentru User-ul caruia i se atribuie dispozitivul
        updatedDevice.setUserTable(deviceDto.getUser_id());
       //Conversie DTO->Entry in tabel
        DeviceDTO newDevice = new DeviceDTO().convertEntityToDto(deviceRepository.save(updatedDevice));
        return newDevice;
    }

    /*
    Update by user: cand se adauga device la user
     */
        /*
    Update dispozitiv pentru un userii, se pot adauga la update
     */
    @Override
    public DeviceDTO updateByUser(Long id, Long unserID) throws Exception {
        //Preia dispozitivul dat ca parametru
        Device updatedDevice = deviceRepository.findById(id).orElseThrow(()->new Exception("Dispozitovul nu exista"));
        updatedDevice.setMaxConsumption(updatedDevice.getMaxConsumption());
        updatedDevice.setDescription(updatedDevice.getDescription());
        updatedDevice.setName(updatedDevice.getName());
        updatedDevice.setAddress(updatedDevice.getAddress());
        // se face update la ID-ul user-ului dorit
        updatedDevice.setUserTable(unserID);
        //update in DB
        DeviceDTO newDevice = new DeviceDTO().convertEntityToDto(deviceRepository.save(updatedDevice));
        return newDevice;
    }

    @Override
    public List<DeviceDTO> updateDeviceWhenDeleteUser(Long id) {
        List<Device> devices = deviceRepository.findAll();
        List <DeviceDTO> deviceDTOS = new ArrayList<>();;

        for (int i = 0; i < devices.size(); i++) {
            Device myDevice = devices.get(i);
            //System.out.println(myDevice.toString());

            if(Objects.equals(myDevice.getUserTable(), id)){
                Long k = null;
                myDevice.setUserTable(k);
                System.out.println(myDevice.toString());
                DeviceDTO dto = new DeviceDTO().convertEntityToDto(deviceRepository.save(myDevice));
                deviceDTOS.add(dto);
            }
        }

       return  deviceDTOS;
    }

    @Override
    public Boolean delete(Long id) {
        // Stergerea se va realiza folosind id-ul
        deviceRepository.deleteById(id);
        return true;


    }
}