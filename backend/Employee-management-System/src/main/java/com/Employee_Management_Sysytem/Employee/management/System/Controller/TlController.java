package com.Employee_Management_Sysytem.Employee.management.System.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;
import com.Employee_Management_Sysytem.Employee.management.System.UserService.TlService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/Tl")
public class TlController {

	
	@Autowired
	private TlService tlService;

	@GetMapping("/getAllTaskDetails")
	public ResponseEntity<?> getTaskDetails(){
		List<TaskDetails> taskDetails = tlService.getTaskDetails();
		if(taskDetails.isEmpty()) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_ACCEPTABLE);
		}
		return new ResponseEntity<>(taskDetails,HttpStatus.OK);
	}
	
	
	@GetMapping("/findTask")
	public ResponseEntity<?> findTask(HttpServletRequest request){
		String token = null;
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			token = header.substring(7);
		}
		List<TaskDetails> taskDetails = tlService.getTaskDetail(token);
		if(taskDetails.isEmpty()) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(taskDetails,HttpStatus.OK);
	}
	
	@GetMapping("/getDetails")
	public ResponseEntity<?> getDetails(HttpServletRequest request){
		String token = null;
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			token = header.substring(7);
		}
		ManagerDTO details = tlService.getDetail(token);
		if(details == null) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(details,HttpStatus.OK);
	}
}
