package com.scmc.api.member.truck.service;

import java.util.HashMap;
import java.util.Optional;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckownerCargoinfo;

public interface TruckOwnerService {

	TbMemberTruckOwner setTruckOwner(HashMap<String, Object> obj, String q);
	Optional<TbMemberTruckOwner> getTruckOwner(long uid);
	String getSmsAuthNumber(String phoneNumber);
	TbTruckownerCargoinfo setTruckOwnerCargoInfo(HashMap<String, Object> obj);
}
