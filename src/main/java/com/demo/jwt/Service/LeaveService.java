package com.demo.jwt.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.demo.jwt.DTO.LeaveDTO;
import com.demo.jwt.DTO.LeaveManagementDTO;
import com.demo.jwt.Model.Employee;
import com.demo.jwt.Model.Leave;
import com.demo.jwt.Model.LeaveStatus;
import com.demo.jwt.Model.LeaveType;
import com.demo.jwt.Repo.EmployeeRepo;
import com.demo.jwt.Repo.LeaveRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final LeaveRepo leaveRepo;

    private final EmployeeRepo employeeRepo;

    public void applyLeaveByStatus(Leave leaveRequest, Long id) {
        Employee employee = employeeRepo.findById(id).get();
        LeaveType leaveType=leaveRequest.getLeaveType();//---> 1
        List<Leave> leaves=leaveRepo.findByLeaveTypeAndEmployeeId(leaveType,id);
        int totalLeaves = leaves != null ? leaves.stream()
        .mapToInt(Leave::getTotalLeavesTaken).sum():0;//---> 2
        
        int maxLeaves=leaveType.getMaxAllowed();//---enum class method
        
        int duration = (int) ChronoUnit.DAYS.between(leaveRequest.getStartDate(), leaveRequest.getEndDate()) + 1;
        
        if(totalLeaves+duration>maxLeaves){
            throw new IllegalArgumentException("Leave request exceeds the allowed limit for " + leaveType);
        }

        Leave leave = new Leave();
        leave.setEmployee(employee);
        leave.setLeaveType(leaveType);//---> coming from 1
        leave.setStartDate(leaveRequest.getStartDate());
        leave.setEndDate(leaveRequest.getEndDate());
        leave.setReason(leaveRequest.getReason());
        leave.setTotalLeavesTaken(totalLeaves+duration);//---> coiming from 2
        leave.setStatus(LeaveStatus.PENDING);
        leave.setDuration(duration);
        leaveRepo.save(leave);
    }

    public List<Leave> allLeaves() {
        return leaveRepo.findAll();
    }

    public List<Leave> leaveById(Long id) {
        return leaveRepo.findByEmployeeId(id);
    }

    public boolean findLeavesPresent(LocalDate startDate,LocalDate endDate,Long id){
        List<Leave>leavesPresent=leaveRepo.findOverlappingLeaves(startDate,endDate,id);
        System.out.println(leavesPresent);
        if(leavesPresent==null){
            return true;
        }
        return false;
    }
    
    public List <LeaveDTO>leavesByEmpId(Long id){
        List <Leave> leaves = leaveRepo.findByEmployeeId(id);
        return leaves.stream().map(leave->new LeaveDTO(leave.getId(),leave.getLeaveType(),
         leave.getStartDate(), leave.getEndDate(), leave.getStatus(), 
         leave.getReason(), leave.getDuration())).
         collect(Collectors.toList());
    }

    public Leave leaveApproval(Long id, LeaveStatus leaveStatus) {
        Leave leave = leaveRepo.findById(id).get();
        leave.setStatus(leaveStatus);
        return leaveRepo.save(leave);
    }

    public int getLeavesbyType(LeaveType type,Long id){
        int maxLeaves=type.getMaxAllowed();
        List<Leave>leaves=leaveRepo.findByLeaveTypeAndEmployeeId(type,id);
        int leavesByType=maxLeaves - leaves.stream()
        .mapToInt(Leave::getTotalLeavesTaken).sum();
        return  leavesByType;

    }

    public List <LeaveManagementDTO>getAllLeavesByStatus(LeaveStatus leaveStatus){
        List<Leave> leaves=leaveRepo.findByStatus(leaveStatus);
        return 
         leaves.stream().map(leave->new LeaveManagementDTO(leave.getId(),leave.getEmployee().getFirstname()
         ,leave.getEmployee().getLasttname(),leave.getLeaveType(),
        leave.getStartDate(), leave.getEndDate(), leave.getStatus(), 
        leave.getReason(), leave.getDuration())).
        collect(Collectors.toList());
    }

    public List<LeaveManagementDTO> allLeavesByDTO() {
        List<Leave> leaves=leaveRepo.findAll();
        return 
         leaves.stream().map(leave->new LeaveManagementDTO(leave.getId(),leave.getEmployee().getFirstname()
         ,leave.getEmployee().getLasttname(),leave.getLeaveType(),
        leave.getStartDate(), leave.getEndDate(), leave.getStatus(), 
        leave.getReason(), leave.getDuration()))
        .collect(Collectors.toList());
    }
}
