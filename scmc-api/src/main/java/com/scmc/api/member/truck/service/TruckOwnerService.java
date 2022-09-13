package com.scmc.api.member.truck.service;

import java.util.HashMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

public interface TruckOwnerService {

	String insertTruckOwner(HashMap<String, Object> obj);
	String updateTruckOwner(HashMap<String, Object> obj, long uid);
	TbMemberTruckOwner getTruckOwner(long uid);
	String getSmsAuthNumber(String phoneNumber);
	TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(HashMap<String, Object> obj);
	String removeTruckOwnerCargoInfo(long uid);
	Page<TbMemberTruckOwner> selectTruckOwner(String carNumber, String truckownerName, String businessNo, Pageable page);
}
