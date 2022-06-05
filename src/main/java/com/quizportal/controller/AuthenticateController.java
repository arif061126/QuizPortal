package com.quizportal.controller;

import com.quizportal.entity.User;
import com.quizportal.helper.JwtUtil;
import com.quizportal.model.JwtRequest;
import com.quizportal.model.JwtResponse;
import com.quizportal.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl service;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        System.out.println(jwtRequest);

        try {
            authenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
        }catch (UsernameNotFoundException u){
            u.printStackTrace();
            throw new Exception("It is Username Not Found Exception");
        }catch (BadCredentialsException e){
            e.printStackTrace();
            throw new Exception("It is a Bad Credentials");
        }

        UserDetails userDetails = this.service.loadUserByUsername(jwtRequest.getUsername());

        String token = this.jwtUtil.generateToken(userDetails);

        System.out.println("JWT: "+token);

        return ResponseEntity.ok(new JwtResponse(token));

    }

    public void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
        }catch (DisabledException e){
            e.printStackTrace();
            throw new Exception("USER DISABLED "+e.getMessage());
        }catch (BadCredentialsException e){
            throw new Exception("Invalid credentials "+e.getMessage());
        }
    }

    //to get logged in user details
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        return (User) this.service.loadUserByUsername(principal.getName());
    }

}
