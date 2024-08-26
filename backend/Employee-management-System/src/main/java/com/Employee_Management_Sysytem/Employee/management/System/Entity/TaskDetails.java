package com.Employee_Management_Sysytem.Employee.management.System.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class TaskDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long taskId;
	
	@NotBlank
	private String taskName;
	
	@NotBlank
	private String taskDesc;
	
	@NotBlank
	private String StartDate;
	
	@NotBlank
	private String endDate;
	
	@NotBlank
	private String assignedBY;
	
	@NotNull
	private int rollCode;
	
	@NotBlank
	private String assignedTo;
	
	@NotBlank
	private String status;
	
	
}
