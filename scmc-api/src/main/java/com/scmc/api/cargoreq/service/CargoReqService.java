package com.scmc.api.cargoreq.service;

import java.util.List;
import java.util.Map;

import com.scmc.api.jpa.domain.TbCargoRequest;


public interface CargoReqService {
	
	List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid);
	
	int updateStatus(String status, Long reqId);
	
	int createRequest(Map<String, Object> param);
}
