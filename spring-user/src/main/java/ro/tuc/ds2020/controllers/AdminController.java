package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.enums.Warning;
import ro.tuc.ds2020.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(path = "/api/user")

public class AdminController {

    private final static Logger LOGGER = Logger.getLogger(AdminController.class.getName());

    @Autowired
    private UserService userService;

    private UserBuilder userBuilder;

    public AdminController(){
        userBuilder = new UserBuilder();

    }
    //se preiau toti userii + adminul
    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<UserDTO> getUsers(){
        List<User> users = userService.getAllUsers();
        List<UserDTO> dtos = new ArrayList<>();
        for(User user: users){
            dtos.add(userBuilder.toUserDTO(user));
        }
        //measurementService.insertMeasurements(5,21,10,2022,1,20);
        return dtos;
    }

    //se preiau toti userii (cu rolul user)
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<UserDTO> getRegularUsers(){
        List<User> users = userService.getRegularUsers();
        List<UserDTO> dtos = new ArrayList<>();
        for(User user: users){
            dtos.add(userBuilder.toUserDTO(user));
        }
        return dtos;
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity deleteUser(@PathVariable String username){
        System.out.println("here"+username);
        LOGGER.info("Delete user "+username);
        Warning result=userService.deleteUser(username);
        if(result==Warning.SUCCESS) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("");
        }
    }


    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity updateUser(@RequestBody UserDTO userDTO){
        LOGGER.info("");
        UserDTO user= userService.updateUser(userDTO);
        if(user!=null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(user);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("");
        }
    }


}
