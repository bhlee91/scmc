package com.scmc.api.code.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbCommonCd;

public interface CommonCodeService {
	
	List<TbCommonCd> selectCommonCode();
	List<TbCommonCd> selectCommonCodeByCodeType(String codeType);
}
