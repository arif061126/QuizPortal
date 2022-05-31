package com.quizportal.service.impl;

import com.quizportal.entity.User;
import com.quizportal.entity.UserRole;
import com.quizportal.repository.RoleRepository;
import com.quizportal.repository.UserRepository;
import com.quizportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());

        if(local!=null){
            System.out.println("User is already present!");
            throw new Exception("User is already present!");
        }else {
            //need to create user
            for(UserRole role:userRoles){
                this.roleRepository.save(role.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }

        return local;
    }


    //get user by username:

    @Override
    public User getUser(String userName) {
        return this.userRepository.findByUsername(userName);
    }

    @Override
    public void deleteUser(Integer id) {
        this.userRepository.deleteById(id);
    }

    /*@Override
    public User updateUser(Integer id) {
        return this.userRepository.updateById(id);
    }*/
}
