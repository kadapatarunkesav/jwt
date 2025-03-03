package com.demo.jwt.Service;


import java.util.*;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.demo.jwt.DTO.RolesDTO;
import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.Role;
import com.demo.jwt.Repo.EmployeeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepo employeeRepo;


    public Optional<Employee> getDetails(String email){
        Optional<Employee> employee = employeeRepo.findByEmail(email);
        return employee;
    }
    
    // public Employee addEmployee(@RequestBody Employee employee){
    //     Employee newEmployee=new Employee();
    //     newEmployee.setDailyLogin(true);
    //     newEmployee.setEmail(employee.getEmail());
    //     newEmployee.setName(employee.getName());
    //     employeeRepo.save(newEmployee);
    //     return newEmployee;
    // }

    // @Scheduled(cron = "0 */1 * * * *")
    @Scheduled(cron = "0 0 0 * * *")
    public void resetDailyTaskCompletedFlag() {
        employeeRepo.dailyLoginReset();
        System.out.println("Daily task completion flags reset to false at midnight.");
    }

    public List<RolesDTO>getDetailsForRoles(){
        List<Employee> employee=employeeRepo.findAll();
        return employee.stream().map(roles->new RolesDTO(roles.getId(),roles.getFirstname()
        ,roles.getLasttname(),roles.getEmail(),roles.getRole().toString())).collect(Collectors.toList());
    }

    public Employee changeRoles(Role role,Long empId) {
        Employee employee=employeeRepo.findById(empId).get();
         employee.setRole(role);
         return employeeRepo.save(employee);
    }
}