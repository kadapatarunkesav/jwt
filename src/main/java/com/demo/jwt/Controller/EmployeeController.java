package com.demo.jwt.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.Role;
import com.demo.jwt.Service.EmployeeService;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")

public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/details/{email}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?>getDetails(@PathVariable String email){
        Optional<Employee> employee=employeeService.getDetails(email);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/roleDetails")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getRolesById() {
        return ResponseEntity.ok(employeeService.getDetailsForRoles());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/changeRoles/{empId}")
    public ResponseEntity<?>changeRolesById(@PathVariable Long empId , 
    @RequestBody Map<String, String>  updates){
        Role role=Role.valueOf(updates.get("statusRole"));
        Employee employee = employeeService.changeRoles(role, empId);
        return ResponseEntity.ok(employee);
    }
    

}
