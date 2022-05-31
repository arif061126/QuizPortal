package com.quizportal.service;

import com.quizportal.entity.User;
import com.quizportal.entity.UserRole;
import org.springframework.stereotype.Service;

import java.util.Set;

public interface UserService {
    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    public User getUser(String userName);

    //delete user by id
    public void deleteUser(Integer id);

    //update user by id
    //public User updateUser(Integer id);
}
