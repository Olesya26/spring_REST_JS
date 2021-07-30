package ru.kolyadina.spring_boot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import ru.kolyadina.spring_boot.model.Role;
import ru.kolyadina.spring_boot.model.User;
import ru.kolyadina.spring_boot.service.RoleService;
import ru.kolyadina.spring_boot.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout, Model model){
        model.addAttribute("error",error!=null);
        model.addAttribute("logout",logout!=null);
        return "login";
    }

//    @GetMapping(value = "/user")
//    public String getUserInfo(@AuthenticationPrincipal User user, Model model){
//        model.addAttribute("user", user);
//        return "userPanel";
//    }




//    @GetMapping(value = "/admin")
//    public String getAllUsers(@AuthenticationPrincipal User user, Model model) {
//        model.addAttribute("user", user);
//        model.addAttribute("allUsers", userService.getAllUsers());
//        return "adminPanel";
//    }
}
