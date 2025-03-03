package com.demo.jwt.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.demo.jwt.Model.Leave;
import com.demo.jwt.Model.LeaveStatus;
import com.demo.jwt.Model.LeaveType;
import com.demo.jwt.Service.LeaveService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/leave")
public class LeaveController {

    private final LeaveService leaveService;

    // @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or
    // hasRole('MANAGER')")
    // @PostMapping("/apply/{employeeId}")
    // public ResponseEntity<?> postMethodName(@RequestBody Leave leave,
    // @PathVariable Long employeeId) {
    // leaveService.applyLeave(leave, employeeId);
    // return ResponseEntity.ok(leave);
    // }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @PostMapping("/applyByFilters/{employeeId}")
    public ResponseEntity<?> applyLeaveByFilters(@RequestBody Leave leave, @PathVariable Long employeeId) {
        leaveService.applyLeaveByStatus(leave, employeeId);
        return ResponseEntity.ok(leave);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllLeaves() {
        return ResponseEntity.ok(leaveService.allLeaves());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/allDTO")
    public ResponseEntity<?> getAllLeavesDTO() {
        return ResponseEntity.ok(leaveService.allLeavesByDTO());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @GetMapping("/emp/{empId}")
    public ResponseEntity<?> getMethodName(@PathVariable Long empId) {
        return ResponseEntity.ok(leaveService.leaveById(empId));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @GetMapping("/empById/{empId}")
    public ResponseEntity<?> getEmoplyeeById(@PathVariable Long empId) {
        return ResponseEntity.ok(leaveService.leavesByEmpId(empId));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @PatchMapping("/leaveStatus/{leaveId}")
    public ResponseEntity<?> leaveApproval(@RequestBody Map<String, String> updates, @PathVariable Long leaveId) {
        LeaveStatus leaveStatus = LeaveStatus.valueOf(updates.get("status"));
        Leave leave = leaveService.leaveApproval(leaveId, leaveStatus);
        return ResponseEntity.ok(leave);
    }

    @GetMapping("/byStatus/employeeId/{empId}/status/{status}" )
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    public ResponseEntity<?> leavesByType(@PathVariable String status, @PathVariable Long empId) {
        LeaveType leaveType = LeaveType.valueOf(status.toUpperCase());
        return ResponseEntity.ok(leaveService.getLeavesbyType(leaveType, empId));
        
    }
    
    
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('MANAGER')")
    @GetMapping("/allLeavesByStatus/{param}")
    public ResponseEntity<?> getLeavesbyStatus(@PathVariable LeaveStatus param) {
        return ResponseEntity.ok(leaveService.getAllLeavesByStatus(param));
    }

}