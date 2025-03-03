package com.demo.jwt.DTO;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayRollDTO {


    private Double baseSalary;

    private Double bonus;

    private Double deductions;

    private Double netPay;

    private LocalDate payDate;

}
