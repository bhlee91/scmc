package com.scmc.api.banner.service.impl;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

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
	@Transactional
	public List<TbCommonBanner> selectBannerByUseyn(String bannerUseyn) {

		List<TbCommonBanner> list = tbCommonBannerRepository.findByBannerUseyn(bannerUseyn);
		
		return list;
	}

	@Override
	@Transactional
	public int insertAndUpdateBanner(Map<String, Object> param) {
		TbCommonBanner tcb = null;
		
		try {
			tcb = new TbCommonBanner(param);
			tbCommonBannerRepository.save(tcb);
			
			return 1;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
}
