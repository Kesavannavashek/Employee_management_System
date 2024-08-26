package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;
import com.Employee_Management_Sysytem.Employee.management.System.JWT.JwtUtil;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.TaskDetailsRepo;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.UserRepository;

@Service
public class TlServiceImpl implements TlService {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskDetailsRepo taskDetailsRepo;

	@Override
	public List<TaskDetails> getTaskDetails() {
		List<TaskDetails> taskDetails = taskDetailsRepo.findByRollCode(3);
		for (TaskDetails task : taskDetails) {
			System.out.println("hfhghj  "+task.getAssignedTo());
			System.out.println("qwerty  "+userRepository.findMemberName(task.getAssignedTo()));
			task.setAssignedTo(userRepository.findMemberName(task.getAssignedTo()));	
		}
		return taskDetails;
	}

	@Override
	public List<TaskDetails> getTaskDetail(String token) {
		String usr = jwtUtil.getUserName(token);
		List<TaskDetails> taskDetails = taskDetailsRepo.findByAssignedTo(usr);
		return taskDetails;
	}

	@Override
	public ManagerDTO getDetail(String token) {
		String usr = jwtUtil.getUserName(token);
		ManagerDTO managerDTO = userRepository.getDetails(usr);
		return managerDTO;
	}
	
	

}
