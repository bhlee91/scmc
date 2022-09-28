package com.scmc.api.info.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.customer.dto.TermsDto;
import com.scmc.api.info.dto.ProductInfoDto;
import com.scmc.api.info.service.SystemInfoService;
import com.scmc.api.jpa.domain.TbCommonTerms;
import com.scmc.api.jpa.domain.TbInfoProduct;
import com.scmc.api.jpa.domain.TbInfoTruckSpec;
import com.scmc.api.jpa.domain.TbSysAppversion;
import com.scmc.api.jpa.repository.DashBoardRepositoryCustomImpl;
import com.scmc.api.jpa.repository.TbCommonTermsRepository;
import com.scmc.api.jpa.repository.TbInfoProductRepository;
import com.scmc.api.jpa.repository.TbInfoTruckSpecRepository;
import com.scmc.api.jpa.repository.TbSysAppversionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SystemInfoServiceImpl implements SystemInfoService {

	private final TbSysAppversionRepository tbAppversionRepository;
	private final TbInfoTruckSpecRepository tbInfoTruckSpecRepository;
	private final TbInfoProductRepository tbInfoProductRepository;
	private final TbCommonTermsRepository tbCommonTermsRepository;
	private final DashBoardRepositoryCustomImpl dashBoardRepositoryImpl;
	
	@Override
	public List<TbSysAppversion> searchVersionList() {

		return tbAppversionRepository.findAllByOrderByVerUidAsc();
	}
	
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

	@Override
	public List<TbCommonTerms> searchTermsInfo() {
		
		return tbCommonTermsRepository.findAllByOrderByUseYnDescTermsType();
	}

    @Transactional
	@Override
	public TbCommonTerms saveTermsInfo(TermsDto dto) {
		if (dto.getTermsUid() == 0) {
			TbCommonTerms tct = TbCommonTerms.insertTerms()
					.termsType(dto.getTermsType())
					.versions(dto.getVersions())
					.contents(dto.getContents())
					.expDiv(dto.getExpDiv())
					.useYn(dto.getUseYn())
					.regId(dto.getRegId())
					.build();

			return tbCommonTermsRepository.save(tct);
		} else {
			TbCommonTerms tct = tbCommonTermsRepository.findByTermsUid(dto.getTermsUid());
			tct.updateTerms(dto.getTermsType(), dto.getVersions(), dto.getContents(), dto.getExpDiv(), dto.getUseYn(), dto.getRegId());
			
			return tct;
		}
	}


}
