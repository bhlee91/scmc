package com.scmc.api.banner.service;

import java.util.List;
import java.util.Map;

import com.scmc.api.jpa.domain.TbCommonBanner;

public interface BannerService {

	List<TbCommonBanner> selectBannerByUseyn(String bannerUseyn);
	
	int insertAndUpdateBanner(Map<String, Object> param);
	
}
