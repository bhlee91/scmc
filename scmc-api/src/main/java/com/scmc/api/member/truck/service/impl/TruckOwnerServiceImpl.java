package com.scmc.api.member.truck.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.common.utils.HiWorksUtil;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckownerCargoinfo;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.member.truck.service.TruckOwnerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TruckOwnerServiceImpl implements TruckOwnerService {

	private final HiWorksUtil hiWorksUtil;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	
	@Transactional
	@Override
	public TbMemberTruckOwner setTruckOwner(HashMap<String, Object> obj, String q) {
		TbMemberTruckOwner tmto;
		
		if (q.equals("password")) {
			tmto = TbMemberTruckOwner.builder()
					.truckownerUid(Long.parseLong(obj.get("password").toString()))
					.password(obj.get("password").toString())
					.build();
		} else {
			tmto = TbMemberTruckOwner.builder()
					.carNumber(obj.get("carNumber").toString())
					.phoneNumber(obj.get("phoneNumber").toString())
					.password(obj.get("passworkd").toString())
					.truckownerName(obj.get("truckownerName").toString())
					.businessNo(obj.get("businessNo").toString())
					.truckTons(obj.get("truckTons").toString())
					.longYn(obj.get("longYn").toString())
					.refrigeratedFrozen(obj.get("refrigeratedFrozen").toString())
					.stowageType(obj.get("stowageType").toString())
					.liftType(obj.get("liftType").toString())
					.build();
		}

		return tbMemberTruckOwnerRepository.save(tmto);
	}

	@Override
	public Optional<TbMemberTruckOwner> getTruckOwner(long uid) {
		
		return tbMemberTruckOwnerRepository.findById(uid);
	}

	@Override
	public String getSmsAuthNumber(String phoneNumber) {
		LinkedHashMap<String, String> sms = new LinkedHashMap<String, String>();
		sms.put("user_id", "megasys");
		sms.put("sms_type", "S");
		sms.put("sender", "0424888741");
		sms.put("receiver", phoneNumber);
		
		try {
			String result = hiWorksUtil.sendSms(sms);
			 
			return result;
		} catch (UnsupportedEncodingException e) {
			return e.getMessage();
		}
	}

	@Override
	public TbTruckownerCargoinfo setTruckOwnerCargoInfo(HashMap<String, Object> obj) {
											
		return null;
	}

}
