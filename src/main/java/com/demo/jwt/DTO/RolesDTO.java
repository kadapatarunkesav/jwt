package com.demo.jwt.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolesDTO {

    private Long id;

    private String firstname;

    private String lastname;
    
    private String email;

    private String role;

}
