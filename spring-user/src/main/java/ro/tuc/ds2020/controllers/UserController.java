package ro.tuc.ds2020.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.services.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private DeviceService deviceService;

    private UserBuilder userBuilder;





    public UserController(){
        userBuilder = new UserBuilder();
    }

    @GetMapping("/getDevicesForUser/{id}")
    @PreAuthorize("hasRole('USER')")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<DeviceWithMeasurementDTO> getDevices(@PathVariable String username){
       List<Device> devices= deviceService.getAllDevicesByUser(username);
       List<DeviceWithMeasurementDTO> dtos = new ArrayList<>();
       return dtos;
    }
}
