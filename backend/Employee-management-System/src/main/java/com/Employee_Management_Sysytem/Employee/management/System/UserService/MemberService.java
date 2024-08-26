package com.Employee_Management_Sysytem.Employee.management.System.UserService;

import java.util.List;

import com.Employee_Management_Sysytem.Employee.management.System.Entity.MemberEntity;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;

public interface MemberService {

	List<TaskDetails> getTaskDetail(String token);

	MemberEntity getDetail(String token);

	

}
