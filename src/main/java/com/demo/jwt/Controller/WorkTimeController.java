package com.demo.jwt.Controller;


import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import com.demo.jwt.DTO.TimeSheetDTO;
import com.demo.jwt.Model.WorkTime;
import com.demo.jwt.Service.WorkTimeService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/time")
@RequiredArgsConstructor
public class WorkTimeController {

    private final WorkTimeService workTimeService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @PostMapping("/start/{empId}")
    public ResponseEntity<?> loginTime(@PathVariable Long empId) {
        // workTimeService.firstLogin(empId);
        WorkTime workTime=workTimeService.firstLogin(empId);
        return ResponseEntity.ok(workTime);
    }
    
    // @PatchMapping("/end/{workId}")
    // public ResponseEntity<?>logoutTime(@PathVariable Long workId){
        //     WorkTime workTime=workTimeService.lastLogin(workId);
        //     return ResponseEntity.ok(workTime);
        // }
        
        @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @PatchMapping("/end/{empId}")
    public ResponseEntity<?>logoutTimeByEmpIdAndDate(@PathVariable Long empId){
        WorkTime workTime=workTimeService.LastLoginByDate(empId);
        return ResponseEntity.ok(workTime);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @GetMapping("/totalwork/{id}")
    public ResponseEntity<?>timeDetailsById(@PathVariable Long id){
        List <TimeSheetDTO> timeSheets=workTimeService.getDetailsById(id);
        return ResponseEntity.ok(timeSheets);
    }

    @GetMapping("/todaywork/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?>timeTodayWorked(@PathVariable Long id){
        return ResponseEntity.ok(workTimeService.workTime(id));
    }

    @GetMapping("/finddate/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> getMethodName(@PathVariable Long id,@RequestParam LocalDate date) {
        TimeSheetDTO timeSheetDTO=workTimeService.getTimeByDateAndEmpId(id,date);
        return ResponseEntity.ok(timeSheetDTO);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @GetMapping("/allWorkById/{id}")
    public ResponseEntity<?>allTimeWorked(@PathVariable Long id){
        List <TimeSheetDTO> timeSheets=workTimeService.getAllDetailsById(id);
        return ResponseEntity.ok(timeSheets);
    }
}
