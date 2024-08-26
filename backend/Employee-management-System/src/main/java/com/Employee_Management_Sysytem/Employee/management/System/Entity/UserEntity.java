package com.Employee_Management_Sysytem.Employee.management.System.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity{

	@Id
//    @SequenceGenerator(name = "user_seq_generator", sequenceName = "user_seq_gen", allocationSize = 1,initialValue = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long userId;
	
	@NotBlank
	@Column(unique = true)
	private String email;
	
	@NotNull
	private Integer rollcode;
	
	@NotBlank
	private String password;
	
	
}
