package com.demo.jwt.DTO;

import java.time.LocalDate;

import com.demo.jwt.Model.LeaveStatus;
import com.demo.jwt.Model.LeaveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveDTO {

    private Long id;

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private LeaveStatus status;

    private String reason;

    private int duration; 
}
