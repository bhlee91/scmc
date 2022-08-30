package com.scmc.api.code.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.code.service.CommonCodeService;
import com.scmc.api.jpa.domain.TbCommonCd;
import com.scmc.api.jpa.repository.TbCommonCdRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommonCodeServiceImpl implements CommonCodeService {

	private final TbCommonCdRepository tbCommonCdRepository;
	
	@Override
	public List<TbCommonCd> selectCommonCode() {
		
		return tbCommonCdRepository.findAllByOrderByCodeTypeAscSortOrderAsc();
	}

	@Override
	public List<TbCommonCd> selectCommonCodeByCodeType(String codeType) {
		
		return tbCommonCdRepository.findByCodeTypeOrderBySortOrderAsc(codeType);
	}

	@Override
	public HashMap<String, List<TbCommonCd>> selectCommonCodeByRequestItem() {
		
		return null;
	}
}
