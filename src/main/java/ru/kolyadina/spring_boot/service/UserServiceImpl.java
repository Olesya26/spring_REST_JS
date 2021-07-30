package ru.kolyadina.spring_boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kolyadina.spring_boot.model.User;
import ru.kolyadina.spring_boot.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User user) {
        user.setPasswordUser(getPasswordEncoder().encode(user.getPasswordUser()));
        return userRepository.save(user);
    }

    @Override
    public User getUserById(long id) {
      return userRepository.findById(id).get();
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        if (!user.getPasswordUser().equals(getUserById(user.getId()).getPasswordUser())) {
            user.setPasswordUser(getPasswordEncoder().encode(user.getPasswordUser()));
        }
       return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
