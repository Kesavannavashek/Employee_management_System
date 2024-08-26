package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.AllTlandMemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.MemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.ManagerEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.MemberEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TlEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.UserEntity;
import com.Employee_Management_Sysytem.Employee.management.System.JWT.JwtUtil;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.ManagerRepository;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.MemberRepository;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.TaskDetailsRepo;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.TlRepository;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.UserRepository;

@Service
public class ManagerServiceImpl implements ManagerService {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ManagerRepository managerRepository;

	@Autowired
	private TlRepository tlRepository;

	@Autowired
	private TaskDetailsRepo taskDetailsRepo;

	@Override
	public ResponseEntity<?> addMember(MemberDTO memberDTO) {

		UserEntity userEntity = new UserEntity();
		userEntity.setEmail(memberDTO.getEmail());
		userEntity.setPassword(memberDTO.getPassword());
		userEntity.setRollcode(3);

		MemberEntity memberEntity = new MemberEntity();
		memberEntity.setAddress(memberDTO.getAddress());
		memberEntity.setDepartment(memberDTO.getDepartment());
		memberEntity.setDob(memberDTO.getDob());
		memberEntity.setGender(memberDTO.getGender());
		memberEntity.setMobNo(memberDTO.getMobNo());
		memberEntity.setName(memberDTO.getName());
		memberEntity.setUserEntity(userEntity);

		 
		try {
			memberRepository.save(memberEntity);
			return new ResponseEntity<>("Added Succesfully", HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>("User Already exists", HttpStatus.CONFLICT);
		}

	}

	@Override
	public ResponseEntity<?> addTlorMember(ManagerDTO managerDto) {
		String roll = managerDto.getRole();
		UserEntity userEntity = new UserEntity();
		userEntity.setEmail(managerDto.getEmail());
		userEntity.setPassword(managerDto.getPassword());

		if (roll.equalsIgnoreCase("TL")) {
			userEntity.setRollcode(2);

			TlEntity tlEntity = new TlEntity();
			tlEntity.setAddress(managerDto.getAddress());
			tlEntity.setDob(managerDto.getDob());
			tlEntity.setGender(managerDto.getGender());
			tlEntity.setMobNo(managerDto.getMobNo());
			tlEntity.setName(managerDto.getName());
			tlEntity.setUserEntity(userEntity);
			try {
				tlRepository.save(tlEntity);
				return new ResponseEntity<>("Added Succesfully", HttpStatus.ACCEPTED);
			} catch (Exception e) {
				return new ResponseEntity<>("User Already exists", HttpStatus.CONFLICT);
			}
		} else if (roll.equalsIgnoreCase("manager")) {

			userEntity.setRollcode(1);
			ManagerEntity managerEntity = new ManagerEntity();
			managerEntity.setAddress(managerDto.getAddress());
			managerEntity.setDob(managerDto.getDob());
			managerEntity.setGender(managerDto.getGender());
			managerEntity.setMobNo(managerDto.getMobNo());
			managerEntity.setName(managerDto.getName());
			managerEntity.setUserEntity(userEntity);

			try {
				managerRepository.save(managerEntity);
				return new ResponseEntity<>("Added Succesfully", HttpStatus.ACCEPTED);
			} catch (Exception e) {
				return new ResponseEntity<>("User Already exists", HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<>("Error occured",HttpStatus.BAD_REQUEST);	}

	@Override
	public ResponseEntity<?> addTask(TaskDetails taskDetails, String token) {
		String usr = jwtUtil.getUserName(token);
		String name = userRepository.findName(usr);
		taskDetails.setAssignedBY(name);
		taskDetails.setStatus("Pending");
		 try {
			 taskDetailsRepo.save(taskDetails);
				return new ResponseEntity<>("Added Succesfully", HttpStatus.ACCEPTED);
			} catch (Exception e) {
				return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
	}

	@Override
	public List<AllTlandMemberDTO> findAllTl() {
		List<AllTlandMemberDTO> res = new ArrayList<AllTlandMemberDTO>();
		List<Object[]> nameList = userRepository.findAllTl();
		if (nameList.isEmpty()){
			return res;		}
		for(Object[] item : nameList) {
			res.add(userRepository.mapToDto(item));
			
		}
			return res;
	}

	@Override
	public List<AllTlandMemberDTO> findAllMember() {
		List<AllTlandMemberDTO> res = new ArrayList<AllTlandMemberDTO>();
		List<Object[]> nameList = userRepository.findAllMember();
		if (nameList.isEmpty()){
			return res;		}
			for(Object[] item : nameList) {
				res.add(userRepository.mapToDto(item));
				
			}
			return res;
		}
			

	@Override
	public List<TaskDetails> taskDetails() {
		List<TaskDetails> taskDetail = taskDetailsRepo.findAll();
		for (TaskDetails task : taskDetail) {
			if(task.getRollCode() == 3	) {
				
				task.setAssignedTo(userRepository.findMemberName(task.getAssignedTo()));
			}
			else {
			
			task.setAssignedTo(userRepository.findTlName(task.getAssignedTo()));
			}
		}
		return taskDetail;
	}

}
