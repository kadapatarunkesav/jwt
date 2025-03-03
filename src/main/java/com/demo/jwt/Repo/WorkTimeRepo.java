package com.demo.jwt.Repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.jwt.Model.WorkTime;

public interface WorkTimeRepo extends JpaRepository<WorkTime,Long>{

    List<WorkTime> findByEmployeeId(Long id);

    WorkTime findByEmployeeIdAndDate(Long id, LocalDate date);

}
