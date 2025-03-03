package com.demo.jwt.Repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.demo.jwt.Model.Leave;
import com.demo.jwt.Model.LeaveStatus;
import com.demo.jwt.Model.LeaveType;

public interface LeaveRepo extends JpaRepository<Leave, Long> {

    List<Leave> findByEmployeeId(Long id);

    Optional <Leave> findById(Long id);

    List<Leave>findByStatus(String status);

    List<Leave> findByLeaveTypeAndEmployeeId(LeaveType type,Long id);

    @Query("SELECT l FROM Leave l WHERE :startDate <= l.endDate AND :endDate >= l.startDate AND l.employee.id = :employeeId")
    List<Leave> findOverlappingLeaves(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate ,@Param("employeeId") Long employeeId);

    List<Leave> findByLeaveType(LeaveType type);

    List<Leave> findByStatus(LeaveStatus status);

}
