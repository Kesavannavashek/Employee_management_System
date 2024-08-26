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
import lombok.Data;

@Entity
@Data
public class TlEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tlId;
	
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
