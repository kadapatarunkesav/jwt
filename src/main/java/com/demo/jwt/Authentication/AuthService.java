package com.demo.jwt.Authentication;


import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demo.jwt.Config.JwtService;
import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.Role;
import com.demo.jwt.Repo.EmployeeRepo;

import lombok.RequiredArgsConstructor;
import lombok.var;




@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private final EmployeeRepo employeeRepo;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final PasswordEncoder encoder;

    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest registerRequest) {
        var newUser=Employee.builder()
        .firstname(registerRequest.getFirstname())
        .lasttname(registerRequest.getLastname())
        .email(registerRequest.getEmail())
        .password(encoder.encode(registerRequest.getPassword()))
        .role(Role.EMPLOYEE)
        .dailyLogin(true)
        .build();
        var savedUser=employeeRepo.save(newUser);
        String jwtToken=jwtService.generateToken(savedUser);
        return AuthResponse.builder().accessToken(jwtToken).build();
    }

    public AuthResponse authenticate(AuthRequest authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
        (authRequest.getEmail(), authRequest.getPassword()));
        var user=employeeRepo.findByEmail(authRequest.getEmail()).orElseThrow();
        String jwtToken=jwtService.generateToken(user);
        System.out.println(LocalTime.now());
        System.out.println(LocalTime.now());
        System.out.println(LocalTime.now());
        System.out.println(LocalTime.now());
        return AuthResponse.builder().accessToken(jwtToken).build();
    }
}