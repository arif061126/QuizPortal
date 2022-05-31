package com.quizportal.repository;

import com.quizportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    //User findUserById()

    //User findUserByUserName(String useName);
    //@Query("from User where userName =: ?")
    User findByUsername(String userName);

    void deleteById(Integer id);

    //User updateById(Integer id);

}
