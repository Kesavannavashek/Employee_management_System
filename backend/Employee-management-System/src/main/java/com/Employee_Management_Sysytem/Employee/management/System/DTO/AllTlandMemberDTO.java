package com.Employee_Management_Sysytem.Employee.management.System.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllTlandMemberDTO {

	@NotBlank
	private String name;
	@NotBlank
	private String email;
	@NotNull
	private Long userId;
}
