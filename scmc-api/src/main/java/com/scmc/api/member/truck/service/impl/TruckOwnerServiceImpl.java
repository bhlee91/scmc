package com.scmc.api.member.truck.service.impl;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.common.utils.HiWorksUtil;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerCargoInfoRepository;
import com.scmc.api.member.truck.service.TruckOwnerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TruckOwnerServiceImpl implements TruckOwnerService {

	private final HiWorksUtil hiWorksUtil;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private final TbTruckOwnerCargoInfoRepository tbTruckOwnerCargoInfoRepository;
	
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
					.longyn(obj.get("longYn").toString())
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
	public TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(HashMap<String, Object> obj) {
		if (obj.get("truckownerUid").equals(0) || obj.get("truckownerUid").equals(null)) {
			return null;
		}
		long truckownerUid = Long.parseLong(obj.get("truckownerUid").toString());
		
		TbTruckOwnerCargoInfo toci = TbTruckOwnerCargoInfo.builder()
										.truckownerUid(truckownerUid)
										.loadDt(Timestamp.valueOf(obj.get("loadDt").toString()))
										.unloadDt(Timestamp.valueOf(obj.get("unloadDt").toString()))
										.spaceRate(Integer.parseInt(obj.get("spaceRate").toString()))
										.cargoWeight(Integer.parseInt(obj.get("cargoWeight").toString()))
										.departAddrSt(obj.get("departAddrSt").toString())
										.departAddrSt2(obj.get("departAddrSt2").toString())
										.departLatitude(obj.get("departLatitude").toString())
										.departLongitude(obj.get("departLongitude").toString())
										.arrivalAddrSt(obj.get("arrivalAddrSt").toString())
										.arrivalAddrSt2(obj.get("arrivalAddrSt2").toString())
										.arrivalLatitude(obj.get("arrivalLatitude").toString())
										.arrivalLongitude(obj.get("arrivalLongitude").toString())
										.build();
		
		return tbTruckOwnerCargoInfoRepository.save(toci);
	}

}
