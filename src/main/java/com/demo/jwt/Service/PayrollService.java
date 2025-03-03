package com.demo.jwt.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.Payroll;
import com.demo.jwt.Repo.EmployeeRepo;
import com.demo.jwt.Repo.PayrollRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepo payrollRepo;

    private final EmployeeRepo employeeRepo;

    public void addPayrollById(Payroll payroll, Long id) {
        Employee employee = (Employee) employeeRepo.findById(id).get();
        // Payroll newPayroll=new Payroll();
        // newPayroll.setEmployee(employee);
        // newPayroll.setBaseSalary(payroll.getBaseSalary());
        // newPayroll.setBonus(payroll.getBonus());
        // newPayroll.setDeductions(payroll.getDeductions());
        // newPayroll.setNetPay(payroll.getNetPay());
        // newPayroll.setPayDate(payroll.getPayDate());
        payroll.setEmployee(employee);
        employee.setPayroll(payroll);
        payrollRepo.save(payroll);
    }

    public void addPayrollRegistered(Long id) {
        Employee employee = employeeRepo.findById(id).get();
        Payroll payroll = new Payroll();
        payroll.setBaseSalary(12000d);
        payroll.setBonus(0d);
        payroll.setDeductions(0d);
        payroll.setAllowances(8000d);
        payroll.setNetPay(payroll.getBaseSalary() + payroll.getAllowances());
        payroll.setPayDate(LocalDate.now());
        payroll.setEmployee(employee);
        payrollRepo.save(payroll);
    }


    public List<Payroll> getAllPayroll() {
        List<Payroll> payrolls = payrollRepo.findAll();
        return payrolls;
    }

    public Optional<Payroll> getPayroll(Long EmpId) {
        Optional<Payroll> payroll = payrollRepo.findPayrollByEmployeeId(EmpId);
        return payroll;
    }

}
