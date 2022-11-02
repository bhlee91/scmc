package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoHist;
import com.scmc.api.member.truck.dto.HistoryDto;

@Repository
public interface TbCargoHistRepository extends JpaRepository<TbCargoHist, Long>{
	
	List<HistoryDto> findAllByTruckowner_truckownerUidAndStatusNotIn(Long truckownerUid, List<String> statusList);
	
	TbCargoHist findByRequest_ReqId(Long reqId);
}
