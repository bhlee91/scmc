package com.scmc.api.member.truck.service;

import java.util.HashMap;
import java.util.Optional;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

public interface TruckOwnerService {

	TbMemberTruckOwner setTruckOwner(HashMap<String, Object> obj, String q);
	Optional<TbMemberTruckOwner> getTruckOwner(long uid);
	String getSmsAuthNumber(String phoneNumber);
	TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(HashMap<String, Object> obj);
}
