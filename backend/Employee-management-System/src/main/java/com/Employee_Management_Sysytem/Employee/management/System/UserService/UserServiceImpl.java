package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.ManagerEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.UserEntity;
import com.Employee_Management_Sysytem.Employee.management.System.JWT.JwtUtil;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.ManagerRepository;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Override
	public ResponseEntity<?> saveManager(ManagerDTO managerDTO) {
		
		UserEntity userEntity = new UserEntity();
		ManagerEntity managerEntity = new ManagerEntity();

		
		try {
			userEntity.setEmail(managerDTO.getEmail());
			userEntity.setPassword(managerDTO.getPassword());
			userEntity.setRollcode(1);
//			System.out.println(userEntity.getEmail()+"    "+userEntity.getPassword());
			

//			UserEntity user=userRepository.findByEmail(managerDTO.getEmail());

			managerEntity.setAddress(managerDTO.getAddress());
			managerEntity.setDob(managerDTO.getDob());
			managerEntity.setGender(managerDTO.getGender());
			managerEntity.setMobNo(managerDTO.getMobNo());
			managerEntity.setName(managerDTO.getName());
			managerEntity.setUserEntity(userEntity);
			
			 managerRepository.save(managerEntity);
			return new ResponseEntity<>("User Details saved Successfully",HttpStatus.ACCEPTED);
			}catch (Exception e) {
				return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
				}
		

		

	}


	@Override
	public String authenticateUser(String email, String password) {
		UserEntity userEntity = userRepository.findByEmail(email);	
		if(userEntity != null && userEntity.getPassword().equals(password)) {
		return	jwtUtil.generateToken(email);
		}
		return "Invalid Credentials";
	}
	
	

}
