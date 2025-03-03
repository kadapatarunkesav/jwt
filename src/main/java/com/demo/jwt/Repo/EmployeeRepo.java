package com.demo.jwt.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.demo.jwt.Model.Employee;
import jakarta.transaction.Transactional;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee,Long>{

    Optional <Employee> findById(Long  id);

    @Modifying
    @Transactional
    @Query("UPDATE Employee u SET u.dailyLogin = true WHERE u.dailyLogin = false")
    void dailyLoginReset();

    Optional<Employee> findByEmail(String username);
}
