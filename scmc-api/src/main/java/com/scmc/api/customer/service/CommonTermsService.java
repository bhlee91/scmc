package com.scmc.api.customer.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbCommonTerms;

public interface CommonTermsService {

	List<TbCommonTerms> selectTerms(String UseYn);
	List<TbCommonTerms> selectCommonTermsByTermsType(String termsType, String expDiv, String UseYn);
}
