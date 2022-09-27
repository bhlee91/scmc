package com.scmc.api.info.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.info.dto.ProductInfoDto;
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

		return tbInfoProductRepository.findAllByOrderByUseynDescProductUidAsc();
	}
	
	@Transactional
	@Override
	public TbInfoProduct saveProductInfo(ProductInfoDto dto) {
		try {
			if (dto.getProductUid() == 0) {
				TbInfoProduct tip = TbInfoProduct.insertProductInfo()
						.productName(dto.getProductName())
						.price(dto.getPrice())
						.discountRate(dto.getDiscountRate())
						.productStartdt(dto.getProductStartdt())
						.productEnddt(dto.getProductEnddt())
						.useyn(dto.getUseyn())
						.regId(dto.getRegId())
						.build();

				return tbInfoProductRepository.save(tip);
			} else {
				TbInfoProduct tip = tbInfoProductRepository.findByProductUid(dto.getProductUid());
				
				tip.updateProductInfo(
					dto.getProductName(), 
					dto.getPrice(), 
					dto.getDiscountRate(), 
					dto.getProductStartdt(), 
					dto.getProductEnddt(), 
					dto.getUseyn()
				);
				
				return tip;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public HashMap<String, Object> getDashboardInfo() {
		
		return dashBoardRepositoryImpl.getDashboardInfo();
	}
}
