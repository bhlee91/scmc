package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scmc.api.jpa.domain.TbInfoTruckSpec;

public interface TbInfoTruckSpecRepository extends JpaRepository<TbInfoTruckSpec, Long> {

	List<TbInfoTruckSpec> findAllByOrderByIdAsc();
}
