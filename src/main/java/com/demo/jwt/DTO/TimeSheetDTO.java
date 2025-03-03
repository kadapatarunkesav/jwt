package com.demo.jwt.DTO;



import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeSheetDTO {

    private LocalDate localDate;

    private LocalDateTime loginTime;

    private LocalDateTime logoutTime;

    private int timeWorked;

}
