package com.demo.jwt.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.demo.jwt.DTO.TimeSheetDTO;
import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.WorkTime;
import com.demo.jwt.Repo.EmployeeRepo;
import com.demo.jwt.Repo.WorkTimeRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkTimeService {

    private final WorkTimeRepo workTimeRepo;

    private final EmployeeRepo employeeRepo;

    public WorkTime firstLogin(Long id){
        Employee employee=employeeRepo.findById(id).get();
        LocalDateTime time=LocalDateTime.now();
        WorkTime workTime=new WorkTime();
        Boolean loginStatus=employee.getDailyLogin();
        System.out.println(loginStatus);
        if(loginStatus==true){
            employee.setDailyLogin(false);
            changeDailyLogin(id);
            workTime.setEmployee(employee);
            workTime.setDate(LocalDate.now());
            workTime.setLoginTime(time);
            workTimeRepo.save(workTime);
            return workTime;
        }
        else{
            return workTime;
        }
    } 

    public void changeDailyLogin(Long id){
        Employee employee=employeeRepo.findById(id).get();
        employee.setDailyLogin(false);
        employeeRepo.save(employee);
    }
    
    public WorkTime lastLogin(Long id){
        WorkTime workTime = workTimeRepo.findById(id).get();
            workTime.setLogoutTime(LocalDateTime.now());
            int duration = (int) ChronoUnit.MINUTES.between(workTime.getLoginTime() , workTime.getLogoutTime()) + 1;
            workTime.setTimeWorked(duration);
            workTimeRepo.save(workTime);
            return workTime;
    }

    public List<TimeSheetDTO>getDetailsById(Long id){
        List<WorkTime> work=workTimeRepo.findByEmployeeId(id);
        return work.stream()
        .sorted((w1, w2) -> w2.getDate().compareTo(w1.getDate())) // Sort in reverse order (latest first)
        .limit(10) // Take only the first 10 entries
        .map(newWork -> new TimeSheetDTO(
            newWork.getDate(),
            newWork.getLoginTime(),
            newWork.getLogoutTime(),
            newWork.getTimeWorked()
        )) // Map to TimeSheetDTO
        .collect(Collectors.toList());
    }

    public WorkTime LastLoginByDate(Long id){
        LocalDate date=LocalDate.now();
        WorkTime workTime=workTimeRepo.findByEmployeeIdAndDate(id,date);
            workTime.setLogoutTime(LocalDateTime.now());
            int duration = (int) ChronoUnit.MINUTES.between(workTime.getLoginTime() , workTime.getLogoutTime()) + 1;
            workTime.setTimeWorked(duration);
            workTimeRepo.save(workTime);
            return workTime;
    }

    public TimeSheetDTO workTime(Long id){
        LocalDate date=LocalDate.now();
        WorkTime work=workTimeRepo.findByEmployeeIdAndDate(id,date);
        TimeSheetDTO dto=new TimeSheetDTO();
        dto.setLocalDate(work.getDate());
        dto.setLoginTime(work.getLoginTime());
        dto.setLogoutTime(work.getLogoutTime());
        dto.setTimeWorked(work.getTimeWorked());
        return dto;
    }

    public TimeSheetDTO getTimeByDateAndEmpId(Long id, LocalDate date) {
        WorkTime work=workTimeRepo.findByEmployeeIdAndDate(id,date);
        TimeSheetDTO dto=new TimeSheetDTO();
        dto.setLocalDate(work.getDate());
        dto.setLoginTime(work.getLoginTime());
        dto.setLogoutTime(work.getLogoutTime());
        dto.setTimeWorked(work.getTimeWorked());
        return dto;
    }

    public List<TimeSheetDTO>getAllDetailsById(Long id){
        List<WorkTime> work=workTimeRepo.findByEmployeeId(id);
        return work.stream()
        .sorted((w1, w2) -> w2.getDate().compareTo(w1.getDate())) // Sort in reverse order (latest first)
        .map(newWork -> new TimeSheetDTO(
            newWork.getDate(),
            newWork.getLoginTime(),
            newWork.getLogoutTime(),
            newWork.getTimeWorked()
        ))
        .collect(Collectors.toList());
    }
}
