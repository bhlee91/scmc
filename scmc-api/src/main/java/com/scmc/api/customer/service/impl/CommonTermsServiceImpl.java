package com.scmc.api.customer.service.impl;

import java.util.List;

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
	public List<TbCommonTerms> selectCommonTerms() {
		
		return tbCommonTermsRepository.findAllByOrderByTermsTypeAsc();
	}
	
	@Override
	public List<TbCommonTerms> selectCommonTermsByTermsType(String termsType) {
		
		return tbCommonTermsRepository.findByTermsTypeOrderByVersionsDesc(termsType);
	}	
}
