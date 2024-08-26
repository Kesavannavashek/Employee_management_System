package com.Employee_Management_Sysytem.Employee.management.System.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Employee_Management_Sysytem.Employee.management.System.Entity.TlEntity;

@Repository
public interface TlRepository extends JpaRepository<TlEntity, Long>{

}
