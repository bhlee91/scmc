package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbSysSmslog;

@Repository
public interface TbSysSmslogRepository extends JpaRepository<TbSysSmslog, Long> {
	
}
