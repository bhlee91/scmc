package com.scmc.api.customer.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbCommonTerms;

public interface CommonTermsService {

	List<TbCommonTerms> selectCommonTerms();
	List<TbCommonTerms> selectCommonTermsByTermsType(String termsType);
}
