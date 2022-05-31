package com.quizportal.controller;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.quizportal.entity.Role;
import com.quizportal.entity.User;
import com.quizportal.entity.UserRole;
import com.quizportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @PostMapping(value = "/")
    public User createUser(@RequestBody User user) throws Exception {

        System.out.println(user);

        Role role = new Role();

        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();

        userRole.setUser(user);
        userRole.setRole(role);

        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(userRole);

        return this.userService.createUser(user,userRoles);
    }

    @GetMapping("/{username}")
    User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable("id") Integer id){
        this.userService.deleteUser(id);
    }

    /*@PutMapping("{id}")
    User updateUser(@PathVariable("id") Integer id){
        return this.userService.updateUser(id);
    }*/
}
