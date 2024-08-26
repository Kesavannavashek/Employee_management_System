package com.Employee_Management_Sysytem.Employee.management.System.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {

	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
}
