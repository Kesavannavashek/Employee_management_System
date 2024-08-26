package com.Employee_Management_Sysytem.Employee.management.System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.LoginDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.UserService.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	private ResponseEntity<?> registration(@RequestBody ManagerDTO managerDTO) {

		ResponseEntity<?> response = userService.saveManager(managerDTO);
		return response;
	}

	@PostMapping("/login")
	private String Login(@RequestBody LoginDTO loginDTO) {

		String isAuth = userService.authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());
		
		return isAuth;

	}

}
