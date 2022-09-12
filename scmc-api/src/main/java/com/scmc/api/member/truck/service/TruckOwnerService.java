package com.scmc.api.member.truck.service;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

public interface TruckOwnerService {

	TbMemberTruckOwner setTruckOwner(HashMap<String, Object> obj, String q);
	Optional<TbMemberTruckOwner> getTruckOwner(long uid);
	String getSmsAuthNumber(String phoneNumber);
	TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(HashMap<String, Object> obj);
	Page<TbMemberTruckOwner> selectTruckOwner(String carNumber, String truckownerName, String businessNo, Pageable page);
}
