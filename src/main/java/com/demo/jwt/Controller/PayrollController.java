package com.demo.jwt.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.jwt.Model.Payroll;
import com.demo.jwt.Service.PayrollService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/payroll")
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/add/{empId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> addPayroll(@RequestBody Payroll addsPayroll, @PathVariable Long empId) {
        payrollService.addPayrollById(addsPayroll, empId);
        return ResponseEntity.ok(addsPayroll);
    }

    @GetMapping("/getEmp/{empId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> getPayrollByEmpId(@PathVariable Long empId) {
        return ResponseEntity.ok(payrollService.getPayroll(empId));
    }

    @GetMapping("/get/{Id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> getPayrollById(@PathVariable Long Id) {
        return ResponseEntity.ok(payrollService.getPayroll(Id));
    }

    @GetMapping("/getall")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> getAllPayRoll() {
        return ResponseEntity.ok(payrollService.getAllPayroll());
    }

    @PostMapping("/addNoData/{empId}")
    public ResponseEntity<?>addPayRoll(@PathVariable Long empId){
        payrollService.addPayrollRegistered(empId);
        return ResponseEntity.ok("Data added successfully");
    }
}
