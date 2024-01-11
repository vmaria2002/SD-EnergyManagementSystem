package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.LoginDTO;
import ro.tuc.ds2020.dtos.RegisterDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.enums.UserRole;

import java.util.ArrayList;
import java.util.List;

public class UserBuilder {



    public LoginDTO toLoginDTO(User user) {
        return LoginDTO.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }

    public RegisterDTO toRegisterDTO(User user){
        return RegisterDTO.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .role(user.getRole().toString())
                .build();
    }

    public UserDTO toUserDTO(User user){

        System.out.println(user.getDevices());

        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .role(user.getRole().toString())
                .build();
    }

    public User toEntityFromRegisterDTO(RegisterDTO registerDTO){
        return User.builder()
                .username(registerDTO.getUsername())
                .password(registerDTO.getPassword())
                .name(registerDTO.getName())
                .role(UserRole.valueOf(registerDTO.getRole()))
                .build();
    }

}
