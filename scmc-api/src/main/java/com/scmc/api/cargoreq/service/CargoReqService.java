package com.scmc.api.cargoreq.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbCargoRequest;


public interface CargoReqService {
	
	List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid);
	
	int updateStatus(String status, Long reqId);

}
