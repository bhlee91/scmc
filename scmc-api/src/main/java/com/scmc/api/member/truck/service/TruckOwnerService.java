package com.scmc.api.member.truck.service;

import java.util.HashMap;
import java.util.Optional;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;

public interface TruckOwnerService {

	TbMemberTruckOwner postTruckOwner(HashMap<String, Object> obj, String q);
	Optional<TbMemberTruckOwner> getTruckOwner(long uid);
	
	String getSmsAuthNumber(String phoneNumber);
}
