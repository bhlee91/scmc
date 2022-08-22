package com.scmc.api.code.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbCommonCd;
import com.scmc.api.jpa.repository.TbCommonCdRepository;
import com.scmc.api.code.service.CommonCodeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommonCodeServiceImpl implements CommonCodeService {

	private final TbCommonCdRepository tbCommonCdRepository;
	
	@Override
	public List<TbCommonCd> selectCommonCode() {
		
		return tbCommonCdRepository.findAll();
	}

}
