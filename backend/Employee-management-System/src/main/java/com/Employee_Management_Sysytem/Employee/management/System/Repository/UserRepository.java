package com.Employee_Management_Sysytem.Employee.management.System.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Employee_Management_Sysytem.Employee.management.System.DTO.AllTlandMemberDTO;
import com.Employee_Management_Sysytem.Employee.management.System.DTO.ManagerDTO;
import com.Employee_Management_Sysytem.Employee.management.System.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

	public UserEntity findByEmail(String email);
	
	@Query(nativeQuery = true,value = "SELECT u.rollcode from user_entity u where u.email=:email")
	public int findRollCode(String email);
	
	@Query(nativeQuery = true,value = "SELECT c.name from user_entity p JOIN manager_entity c ON p.user_id = c.user_id where p.email=:email")
	public String findName(String email);
	
	@Query(nativeQuery = true,value = "SELECT c.name,p.email,p.user_id from user_entity p JOIN tl_entity c ON p.user_id = c.user_id where p.rollcode =2")
	public List<Object[]> findAllTl();
	
	@Query(nativeQuery = true,value = "SELECT c.name,p.email,p.user_id from user_entity p JOIN member_entity c ON p.user_id = c.user_id where p.rollcode =3")
	public List<Object[]> findAllMember();
	
	public default AllTlandMemberDTO mapToDto(Object[] result) {
		return new AllTlandMemberDTO((String) result[0],(String) result[1],(Long) result[2]); 
	}

	@Query(nativeQuery = true,value = "SELECT * FROM user_entity u JOIN tl_entity t ON u.user_id = t.user_id where u.email=:email")
	public ManagerDTO getDetails(String email);

	@Query(nativeQuery = true,value = "SELECT * FROM user_entity u JOIN member_entity m ON u.user_id = m.user_id where u.email=:email")
	public Object getMemberDetails(String email);

	@Query(nativeQuery = true,value = "SELECT c.name from user_entity p JOIN member_entity c ON p.user_id = c.user_id where p.email=:email")
	public String findMemberName(String email);
	
	@Query(nativeQuery = true,value = "SELECT c.name from user_entity p JOIN tl_entity c ON p.user_id = c.user_id where p.email=:email")
	public String findTlName(String email);
	

}

