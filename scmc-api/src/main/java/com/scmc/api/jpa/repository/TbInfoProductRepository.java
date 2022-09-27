package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbInfoProduct;

@Repository
public interface TbInfoProductRepository extends JpaRepository<TbInfoProduct, Long>{

	TbInfoProduct findByProductUid(Long productUid);
	List<TbInfoProduct> findAllByOrderByUseynDescProductUidAsc();
	List<TbInfoProduct> findByUseynOrderByPriceAsc(String useyn);
}
