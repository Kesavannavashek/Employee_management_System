package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.AllTlandMemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.MemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;


public interface ManagerService {

public ResponseEntity<?> addMember(MemberDTO memberDTO);


public ResponseEntity<?> addTlorMember(ManagerDTO managerDto);


ResponseEntity<?> addTask(TaskDetails taskDetails, String token);



public List<AllTlandMemberDTO> findAllTl();


public List<AllTlandMemberDTO> findAllMember();


public List<TaskDetails> taskDetails();

}
