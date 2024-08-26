package com.Employee_Management_Sysytem.Employee.management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Employee_Management_Sysytem.Employee.management.System.Entity.MemberEntity;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long>{

//	@Query(nativeQuery = true,value = "SELECT * FROM member_entity m WHERE m.user_id =: user_id")
	public MemberEntity findByUserId(Long userId);
}
