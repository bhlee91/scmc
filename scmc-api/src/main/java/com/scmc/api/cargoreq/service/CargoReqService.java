package com.scmc.api.cargoreq.service;

import java.util.List;
import java.util.Map;

import com.scmc.api.jpa.domain.TbCargoRequest;


public interface CargoReqService {
	
	List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid);
	
	int insertHistory(Map<String, Object> param);
	
	int updateStatus(String status, Long reqId);
	
	int insertAndUpdateRequest(Map<String, Object> param);
	
}
