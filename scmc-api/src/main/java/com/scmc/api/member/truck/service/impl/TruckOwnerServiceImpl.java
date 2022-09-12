package com.scmc.api.member.truck.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.common.utils.HiWorksUtil;
import com.scmc.api.jpa.domain.QTbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.member.truck.service.TruckOwnerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TruckOwnerServiceImpl implements TruckOwnerService {

	private final HiWorksUtil hiWorksUtil;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private JPAQueryFactory query;
	
	@Autowired
	private EntityManager em;
	
	QTbMemberTruckOwner tmto = QTbMemberTruckOwner.tbMemberTruckOwner;
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
	public TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(HashMap<String, Object> obj) {
											
		return null;
	}

	
	@Override
	@Transactional
	public Page<TbMemberTruckOwner> selectTruckOwner(String carNumber
												   , String truckownerName
												   , String businessNo
												   , Pageable page) { 
		this.query = new JPAQueryFactory(em);
		List<TbMemberTruckOwner> list = query
									.selectFrom(tmto)
									.where(
											carNumberEq(carNumber),
											truckownerNameEq(truckownerName),
											businessNoEq(businessNo)
										   )
									.offset(page.getOffset())
									.limit(page.getPageSize())
									.fetch();
									
		return new PageImpl<>(list);
	}

   
   private BooleanExpression carNumberEq(String carNumber) {
	   if(carNumber != null) {
		   return tmto.carNumber.contains(carNumber);   
	   }else {
		  return null;
	   }
   }
   
   private BooleanExpression truckownerNameEq(String truckownerName) {
	   if(truckownerName != null) {
		   return tmto.truckownerName.contains(truckownerName);   
	   }else {
		  return null;
	   }
   }
 
   private BooleanExpression businessNoEq(String businessNo) {
	   if(businessNo != null) {
		   return tmto.carNumber.contains(businessNo);   
	   }else {
		  return null;
	   }
   }
}
