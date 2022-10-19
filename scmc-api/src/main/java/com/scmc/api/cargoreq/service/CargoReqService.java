package com.scmc.api.cargoreq.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.scmc.api.cargoreq.dto.RequestDetailDto;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.dto.MatchingDto;

public interface CargoReqService {
	
	List<TbCargoRequest> selectCargoRequest(Long ownerUid, String departDate, String arrivalDate, String phoneNumber, String status) throws ParseException;
	
	List<MatchingDto> selectRequestMatching(String departDate, String arrivalDate, String phoneNumber, String cargoName, String status) throws ParseException;
	
	int insertHistory(Map<String, Object> obj);
	
	int updateStatus(String status, Long reqId);
	
	int saveRequest(Map<String, Object> obj);
	
	int saveRequestFare(Map<String, Object> obj);
	
	String searchAddress(String query);
	
	List<TbMemberTruckOwner> selectCargoRequestByTruckOwnerUid(Long truckownerUid);
	
	TbCargoRequest selectCargoRequestDetail(Long reqId);
	boolean updateCargoRequestDetail(RequestDetailDto dto);
}
