package com.Employee_Management_Sysytem.Employee.management.System.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.AllTlandMemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.MemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;
import com.Employee_Management_Sysytem.Employee.management.System.UserService.ManagerService;

import jakarta.servlet.http.HttpServletRequest;



@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/manager")
public class ManagerController {

	@Autowired
	private ManagerService managerService;

	@PostMapping("/addMember")
	public ResponseEntity<?> addMember(@RequestBody MemberDTO memberDTO) {

		ResponseEntity<?> res = managerService.addMember(memberDTO);
		return res;
	}

	
	@PostMapping("/addTlOrManager")
	public ResponseEntity<?> addTlOrMember(@RequestBody ManagerDTO managerDto) {

		ResponseEntity<?> res = managerService.addTlorMember(managerDto);
		return res;
	}

	
	@PostMapping("/addTask")
	public ResponseEntity<?> addTask(@RequestBody TaskDetails taskDetails, HttpServletRequest request) {
		String token = null;
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			token = header.substring(7);
			System.out.println("token: "+token);
		}
		ResponseEntity<?> res = managerService.addTask(taskDetails, token);
		return res;
	}
	
	
	@GetMapping("/findAllTl")
	public ResponseEntity<?> findAllTl(){
		
List<AllTlandMemberDTO> allTl= managerService.findAllTl();
		if(allTl.isEmpty()) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_ACCEPTABLE);		
			}
		return new ResponseEntity<>(allTl,HttpStatus.OK);
	}
	
	
	@GetMapping("/findAllMember")
	public ResponseEntity<?> findAllMember(){
		
		List<AllTlandMemberDTO> allMember= managerService.findAllMember();
		if(allMember.isEmpty()) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_ACCEPTABLE);		
			}
		return new ResponseEntity<>(allMember,HttpStatus.OK);
	}
	
	
	@GetMapping("/taskDetails")
	public ResponseEntity<?> retriveTask() {
		List<TaskDetails> res = managerService.taskDetails();
		if(res.isEmpty()) {
			return new ResponseEntity<>("NotFound",HttpStatus.NOT_ACCEPTABLE);		
			}
		return new ResponseEntity<>(res,HttpStatus.OK);
	}

}
