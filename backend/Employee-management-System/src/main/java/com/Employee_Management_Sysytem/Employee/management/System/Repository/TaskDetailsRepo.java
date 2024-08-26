package com.Employee_Management_Sysytem.Employee.management.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Employee_Management_Sysytem.Employee.management.System.Entity.TaskDetails;

@Repository
public interface TaskDetailsRepo extends JpaRepository<TaskDetails, Long>{

	List<TaskDetails> findByRollCode(int i);
	
	List<TaskDetails> findByAssignedTo(String email);

}
