package com.Employee_Management_Sysytem.Employee.management.System.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ManagerDTO {

	@NotBlank
	private String name;
	
	@NotBlank
	private String dob;
	
	@NotBlank
	private String mobNo;
	
	@NotBlank
	private String email;
	
	@NotBlank
	private String address;
	
	private String role; 
	
	@NotBlank
	private String gender; 
	
	@NotBlank
	private String password;
	
	
}
