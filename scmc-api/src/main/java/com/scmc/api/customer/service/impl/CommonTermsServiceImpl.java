package com.scmc.api.customer.service.impl;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.customer.service.CommonTermsService;
import com.scmc.api.jpa.domain.TbCommonTerms;
import com.scmc.api.jpa.repository.TbCommonTermsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommonTermsServiceImpl implements CommonTermsService{

	private final TbCommonTermsRepository tbCommonTermsRepository;
	
	@Override
	public List<TbCommonTerms> selectTerms(String useYn) {
		
		List<TbCommonTerms> list = tbCommonTermsRepository.findByUseYnOrderByTermsTypeAsc(useYn);
		
		return list;
	}
	
	@Override
	public List<TbCommonTerms> selectCommonTermsByTermsType(String termsType, String expDiv, String useYn) {
		
		return tbCommonTermsRepository.findByTermsTypeAndExpDivAndUseYnOrderByVersionsDesc(termsType, expDiv, useYn);
	}
	
	@Override
	@Transactional
	public int insertAndUpdateTerms(Map<String, Object> param) {
		TbCommonTerms tct = null;
		
		try {
			tct = new TbCommonTerms(param);
			tbCommonTermsRepository.save(tct);
			
			return 1;
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
}
