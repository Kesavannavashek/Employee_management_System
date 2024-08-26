package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import org.springframework.http.ResponseEntity;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;

public interface UserService {

   public ResponseEntity<?> saveManager(ManagerDTO managerDTO);

   public String authenticateUser(String email, String password);


}
