package com.scmc.api.info.service;

import java.util.HashMap;
import java.util.List;

import com.scmc.api.customer.dto.TermsDto;
import com.scmc.api.info.dto.ProductInfoDto;
import com.scmc.api.jpa.domain.TbCommonTerms;
import com.scmc.api.jpa.domain.TbInfoProduct;
import com.scmc.api.jpa.domain.TbInfoTruckSpec;
import com.scmc.api.jpa.domain.TbSysAppversion;

public interface SystemInfoService {

	List<TbSysAppversion> searchVersionList();
	List<TbInfoTruckSpec> searchTruckSpec();
	List<TbInfoProduct> searchProductInfo();
	TbInfoProduct saveProductInfo(ProductInfoDto dto);
	HashMap<String, Object> getDashboardInfo();
	List<TbCommonTerms> searchTermsInfo();
	TbCommonTerms saveTermsInfo(TermsDto dto);
}
