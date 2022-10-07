package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

public interface TbTruckOwnerCargoInfoRepository extends JpaRepository<TbTruckOwnerCargoInfo, Long> {

	TbTruckOwnerCargoInfo findByCargoUid(long cargoUid);
}
