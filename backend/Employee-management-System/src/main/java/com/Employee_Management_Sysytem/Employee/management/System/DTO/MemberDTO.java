package com.Employee_Management_Sysytem.Employee.management.System.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MemberDTO {
	

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
	
	@NotBlank
	private String gender; 
	
	@NotBlank
	private String password;
	
	@NotBlank
	private String department;

}
