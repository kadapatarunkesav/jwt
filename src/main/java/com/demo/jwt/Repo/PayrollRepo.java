package com.demo.jwt.Repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.jwt.Model.Payroll;

public interface PayrollRepo extends JpaRepository<Payroll,Long>{

    List<Payroll> findByEmployeeId(Long empId);


    // Optional<Payroll> findByEmployeeId(Long empId);

    Optional <Payroll> findPayrollByEmployeeId(Long id);

    Optional <Payroll> findById(Long id);


}
