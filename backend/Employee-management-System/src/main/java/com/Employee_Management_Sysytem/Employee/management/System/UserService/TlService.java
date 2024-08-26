package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.List;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;

public interface TlService {

	List<TaskDetails> getTaskDetails();

	List<TaskDetails> getTaskDetail(String token);

	ManagerDTO getDetail(String token);

}
