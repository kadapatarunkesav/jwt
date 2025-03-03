package com.demo.jwt.DTO;





import javax.management.relation.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDataDTO {

    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private Role role;
    
}
