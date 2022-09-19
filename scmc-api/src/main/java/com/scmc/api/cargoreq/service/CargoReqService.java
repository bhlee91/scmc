package com.scmc.api.cargoreq.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;

public interface CargoReqService {
	
	List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid, String departDate, String arrivalDate, String phoneNumber, String status) throws ParseException;
	
	int insertHistory(Map<String, Object> param);
	
	int updateStatus(String status, Long reqId);
	
	int saveRequest(Map<String, Object> param);
	
	String searchAddress(String query);
	
	List<TbMemberTruckOwner> selectCargoRequestByTruckOwnerUid(Long truckownerUid);
}
