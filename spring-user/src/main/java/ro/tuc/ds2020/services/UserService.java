package ro.tuc.ds2020.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.RegisterDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.enums.UserRole;
import ro.tuc.ds2020.enums.Warning;
import ro.tuc.ds2020.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final static Logger LOGGER = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private UserBuilder userBuilder;

    public UserService(){
        bCryptPasswordEncoder=new BCryptPasswordEncoder();
        userBuilder = new UserBuilder();
        LOGGER.setLevel(Level.INFO);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public List<User> getRegularUsers() {
        return  userRepository.findAll()
                .stream()
                .filter(u -> u.getRole()==UserRole.ROLE_USER)
                .collect(Collectors.toList());
    }

    public boolean isUsernameUnique(String username){

        List<User> allUsers=userRepository.findAll();
        for(User u:allUsers){
            if(u.getUsername().equals(username)){
                return false;
            }
        }
        return true;
    }

    public Warning insertUser(RegisterDTO registerDTO){

        if(isUsernameUnique(registerDTO.getUsername())){
            registerDTO.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));
            User user = userBuilder.toEntityFromRegisterDTO(registerDTO);
            userRepository.save(user);
            return Warning.SUCCESS;
        }else{
            return Warning.DUPLICATE;
        }
    }

    public Warning deleteUser(String username){
        Optional<User> user=userRepository.findByUsername(username);
        if(user.isPresent()) {
            userRepository.delete(user.get());
            return Warning.SUCCESS;
        }

        return Warning.NOT_FOUND;
    }

    public UserDTO updateUser(UserDTO userDTO){
        Optional<User> user=userRepository.findById(userDTO.getId());
        if(user.isPresent()){
            if(!user.get().getUsername().equals(userDTO.getUsername())) {
                if (isUsernameUnique(userDTO.getUsername())) {
                    user.get().setName(userDTO.getName());
                    user.get().setUsername(userDTO.getUsername());
                    user.get().setRole(UserRole.valueOf(userDTO.getRole()));
                    userRepository.save(user.get());
                    return userDTO;
                } else {
                    return null;
                }
            }else{
                user.get().setName(userDTO.getName());
                user.get().setUsername(userDTO.getUsername());
                user.get().setRole(UserRole.valueOf(userDTO.getRole()));
                userRepository.save(user.get());
                return userDTO;
            }
        }
        return null;
    }
}
