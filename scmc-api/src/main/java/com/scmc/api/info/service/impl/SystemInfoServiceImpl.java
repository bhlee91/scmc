package com.scmc.api.info.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.info.service.SystemInfoService;
import com.scmc.api.jpa.domain.TbInfoProduct;
import com.scmc.api.jpa.domain.TbInfoTruckSpec;
import com.scmc.api.jpa.repository.DashBoardRepositoryCustomImpl;
import com.scmc.api.jpa.repository.TbInfoProductRepository;
import com.scmc.api.jpa.repository.TbInfoTruckSpecRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SystemInfoServiceImpl implements SystemInfoService {

	private final TbInfoTruckSpecRepository tbInfoTruckSpecRepository;
	private final TbInfoProductRepository tbInfoProductRepository;
	private final DashBoardRepositoryCustomImpl dashBoardRepositoryImpl;
	
	@Override
	public List<TbInfoTruckSpec> searchTruckSpec() {
		
		return tbInfoTruckSpecRepository.findAllByOrderByIdAsc();
	}
	
	@Override
	public List<TbInfoProduct> searchProductInfo() {

		return tbInfoProductRepository.findByUseynOrderByPriceDesc("Y");
	}

	@Override
	public HashMap<String, Object> getDashboardInfo() {
		
		return dashBoardRepositoryImpl.getDashboardInfo();
	}

}
