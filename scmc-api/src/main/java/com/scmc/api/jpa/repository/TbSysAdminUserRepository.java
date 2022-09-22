package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbSysAdminUser;

@Repository
public interface TbSysAdminUserRepository extends JpaRepository<TbSysAdminUser, Long> {

	TbSysAdminUser findByEmail(String email);
	boolean existsByEmail(String email);
}
