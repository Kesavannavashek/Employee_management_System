package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Employee_Management_Sysytem.Employee.management.System.Entity.MemberEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.UserEntity;
import com.Employee_Management_Sysytem.Employee.management.System.JWT.JwtUtil;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.MemberRepository;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.TaskDetailsRepo;
import com.Employee_Management_Sysytem.Employee.management.System.Repository.UserRepository;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private TaskDetailsRepo taskDetailsRepo;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	public List<TaskDetails> getTaskDetail(String token) {
		String usr = jwtUtil.getUserName(token);
		List<TaskDetails> taskDetails = taskDetailsRepo.findByAssignedTo(usr);
		return taskDetails;
	}

	@Override
	public MemberEntity getDetail(String token) {
		String usr = jwtUtil.getUserName(token);
		UserEntity usrEntity = userRepository.findByEmail(usr);
		System.out.println("qwet: "+usrEntity.getUserId());
		MemberEntity memberEntity = memberRepository.findByUserId(usrEntity.getUserId());
		memberEntity.setUserEntity(usrEntity);
		return  memberEntity;	
		}

	
}
