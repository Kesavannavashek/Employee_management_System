package com.Employee_Management_Sysytem.Employee.management.System.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class MemberEntity {

	@Id
	private Long memberId;
	
	@NotBlank
	private String name;

	@Column	(name = "user_id",insertable = false,updatable = false)
	private Long userId;
	
	@NotBlank
	private String dob;
	
	
	@NotBlank
	private String mobNo;
	
	
	@NotBlank
	private String address;
	
	
	@NotBlank
	private String gender; 
	
	@NotBlank
	private String department;
	
	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinColumn( name = "user_id",referencedColumnName = "userId")
	private UserEntity userEntity;
	
	
}
