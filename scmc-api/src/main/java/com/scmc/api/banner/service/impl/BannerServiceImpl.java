package com.scmc.api.banner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.banner.service.BannerService;
import com.scmc.api.jpa.domain.TbCommonBanner;
import com.scmc.api.jpa.repository.TbCommonBannerRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BannerServiceImpl implements BannerService{

	private final TbCommonBannerRepository tbCommonBannerRepository;

	@Override
	public List<TbCommonBanner> selectBannerByUseyn(String bannerUseyn) {

		List<TbCommonBanner> list = tbCommonBannerRepository.findByBannerUseyn(bannerUseyn);
		
		return list;
	}
}
