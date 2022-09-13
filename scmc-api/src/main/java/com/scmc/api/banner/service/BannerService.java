package com.scmc.api.banner.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbCommonBanner;

public interface BannerService {

	List<TbCommonBanner> selectBannerByUseyn(String bannerUseyn);
}
