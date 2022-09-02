package com.scmc.api.product.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbInfoProduct;
import com.scmc.api.jpa.repository.TbInfoProductRepository;
import com.scmc.api.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

	private final TbInfoProductRepository tbInfoProductRepository;
	
	@Override
	public List<TbInfoProduct> selectProduct(String useyn){
		List<TbInfoProduct> list = tbInfoProductRepository.findByUseynOrderByPriceDesc(useyn);
		
		return list;
	}
}
