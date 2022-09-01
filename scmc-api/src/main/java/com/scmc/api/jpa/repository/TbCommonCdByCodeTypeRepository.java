package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scmc.api.jpa.domain.TbCommonCdByCodeType;

public interface TbCommonCdByCodeTypeRepository extends JpaRepository<TbCommonCdByCodeType, String> {
	
	TbCommonCdByCodeType findDistinctByCodeType(String codeType);
}
