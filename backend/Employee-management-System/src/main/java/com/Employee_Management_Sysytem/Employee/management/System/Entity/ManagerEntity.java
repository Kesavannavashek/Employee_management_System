package com.Employee_Management_Sysytem.Employee.management.System.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerEntity {
	
	@Id
//	@SequenceGenerator(name = "manager_seq_generator",sequenceName = "manager_id_gen",allocationSize = 1,initialValue = 1)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "manager_seq_generator")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long managerId;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String dob;
	
	@NotBlank
	private String mobNo;
	
	@NotBlank
	private String address;
	
	@NotBlank
	private String gender; 
	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn( name = "user_id",referencedColumnName = "userId")
	private UserEntity userEntity;
	


}
