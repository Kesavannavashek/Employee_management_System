package com.Employee_Management_Sysytem.Employee.management.System.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskDTO {


	@NotBlank
	private String taskName;
	
	@NotBlank
	private String taskDesc;
	
	@NotBlank
	private String StartDate;
	
	@NotBlank
	private String endDate;
	
	
	private String assignedBY;
	
	@NotBlank
	private String assignedTo;
	
}
