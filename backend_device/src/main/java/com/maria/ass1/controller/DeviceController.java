package com.maria.ass1.controller;
import com.maria.ass1.dtos.DeviceDTO;
import com.maria.ass1.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/api/device")

public class DeviceController {
    @Autowired
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    /*
    Query: se vor prelua toati  userii din DB
    URL: http://localhost:8080/api/device/getAll
    */
    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<DeviceDTO>> getAllDevices(){
        ResponseEntity<List<DeviceDTO>> response= new ResponseEntity<>(deviceService.getAllDevices(), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }

    /*
    Obtinem toate dispozitivele care au user ID null ==> le vom vedea in dropdown!
     */
    @GetMapping("/getDevicesWithIDUserNull")
    @PreAuthorize("hasRole('USER')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<DeviceDTO>> getDevicesWithIDUserNull(){
        ResponseEntity <List<DeviceDTO>> response = new ResponseEntity<>(deviceService.getDevicesWithIDUserNull(), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }


    /*
    Query: Preluare un user din tabel, dupa ID-ul trimis ca variabila in path.
    URL: http://localhost:8080/api/device/get/2
    */
    @GetMapping("/get/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<DeviceDTO> get(@PathVariable("id") Long id) throws Exception {

        ResponseEntity <DeviceDTO> response = new ResponseEntity<>(deviceService.get(id), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }


    /*
    Query: Preluare un device din tabel, doar device-urile pt. user-ul a carui ID este trimis ca parametru
    URL: http://localhost:8081/api/device/getDevicesForUser/3
    */
    @GetMapping("/getDevicesForUser/{id}")
    @PreAuthorize("hasRole('USER')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<DeviceDTO>> getDevicesForUser(@PathVariable("id") Long id) throws Exception {
        ResponseEntity <List<DeviceDTO>> response = new ResponseEntity<>(deviceService.getDevicesForUser(id), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }


    /*
    Query: update la user_id + detalii device
    URL: http://localhost:8080/api/device/update/2
    {
    "id":2,
    "name": "Device",
    "description": "util",
    "address": "Observator 20,Clj",
    "maxConsumption": "5",
    "user_id": 7
}
     */
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<DeviceDTO> update(@PathVariable("id") Long id, @RequestBody DeviceDTO deviceDto) throws Exception {
        // deviceDto.setUser_id((long) 0);
        ResponseEntity <DeviceDTO> response = new ResponseEntity<>(deviceService.update(id, deviceDto), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }
    /*
    Update - cand adaug device la USER
    URL: http://localhost:8081/api/device/addToUser/${idDeviceNumber}/${id}
     */
    @PutMapping("/addToUser/{id}/{userID}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<DeviceDTO> update(@PathVariable("id") Long id,@PathVariable("userID")  Long userID ) throws Exception {
        // deviceDto.setUser_id((long) 0);
        ResponseEntity <DeviceDTO> response = new ResponseEntity<>(deviceService.updateByUser(id, userID), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }

    /*
    Query: update la detalii device
    URL: http://localhost:8080/api/device/update/2
    {
        "id":2,
        "name": "Device",
        "description": "util",
        "address": "Observator 20,Clj",
        "maxConsumption": "5",
     }
     */
    @PutMapping("/updateDevice/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable("id") Long id, @RequestBody DeviceDTO deviceDto) throws Exception {
        ResponseEntity <DeviceDTO> response = new ResponseEntity<>(deviceService.updateDevice(id, deviceDto), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }

    /*
    Se sterge un user==> se propaga in Device table.--> user_id = null
    URL: http://localhost:8081/api/device/updateDeviceWhenDeleteUser/3

     */
    @PutMapping("/updateDeviceWhenDeleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<DeviceDTO>> updateDeviceWhenDeleteUser(@PathVariable("id") Long id) throws Exception {
        ResponseEntity <List<DeviceDTO>> response = new ResponseEntity<>(deviceService.updateDeviceWhenDeleteUser(id), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }

    /*
     Query: adaugare nou dispozitiv, body-ul va fi populat, preluand datele din field-urile din frontend.
     URL: http://localhost:8080/api/device/create
     body:
     {
        "id":2,
        "name": "Device",
        "description": "util",
        "address": "Observator 20,Clj",
        "maxConsumption": "5",
     }
    */
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<DeviceDTO> save(@RequestBody  DeviceDTO deviceDTO){
        deviceDTO.setUser_id(0L);
        ResponseEntity <DeviceDTO> response = new ResponseEntity<>(deviceService.create(deviceDTO), HttpStatus.OK);
        HttpStatus httpStatus = (HttpStatus) response.getStatusCode();
        mesajeRequest(httpStatus);
        return response;
    }
    /*
     Query: stergere dispozitiv cu ID-ul trimis ca parametru.
     URL: http://localhost:8080/api/device/delete/2
     */
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
        ResponseEntity <Boolean> response = new ResponseEntity<>(deviceService.delete(id), HttpStatus.OK);
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



