package com.scmc.api.jpa.repository;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbSysAttachfile;


@Repository
public interface TbSysAttachfileRepository extends JpaRepository<TbSysAttachfile, Long> {

	TbSysAttachfile findByAttachId(Long attachId);
	int save(Map<String, Object> params);

}
