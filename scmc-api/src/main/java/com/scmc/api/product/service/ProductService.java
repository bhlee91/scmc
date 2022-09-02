package com.scmc.api.product.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbInfoProduct;

public interface ProductService {

	List<TbInfoProduct> selectProduct(String useyn);
}
