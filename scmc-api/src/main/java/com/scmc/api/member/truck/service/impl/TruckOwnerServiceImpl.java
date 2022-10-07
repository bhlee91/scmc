package com.scmc.api.member.truck.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.common.utils.HiWorksUtil;
import com.scmc.api.common.utils.KaKaoLocalUtil;
import com.scmc.api.jpa.domain.QTbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbSysSmslog;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.jpa.repository.TbSysSmslogRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerCargoInfoRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerCargoInfoRepositoryCustom;
import com.scmc.api.member.truck.dto.CargoInfoDto;
import com.scmc.api.member.truck.service.TruckOwnerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TruckOwnerServiceImpl implements TruckOwnerService {

	private final HiWorksUtil hiWorksUtil;
	private final KaKaoLocalUtil kakaoLocalUtil;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private final TbTruckOwnerCargoInfoRepository tbTruckOwnerCargoInfoRepository;
	private final TbTruckOwnerCargoInfoRepositoryCustom tbTruckOwnerCargoInfoRepositoryCustom;
	private final TbSysSmslogRepository tbSysSmslogRepository;
	
	private JPAQueryFactory query;
	
	@Autowired
	private EntityManager em;
	
	QTbMemberTruckOwner tmto = QTbMemberTruckOwner.tbMemberTruckOwner;
	
	@Transactional
	@Override
	public String insertTruckOwner(HashMap<String, Object> obj) {

		TbMemberTruckOwner tmto = TbMemberTruckOwner.insertBuilder()
				.carNumber(obj.get("carNumber").toString())
				.phoneNumber(obj.get("phoneNumber").toString())
				.password(obj.get("password").toString())
				.truckownerName(obj.get("truckownerName").toString())
				.businessNo(obj.get("businessNo").toString())
				.truckTons(obj.get("truckTons").toString())
				.longyn(obj.get("longyn").toString())
				.refrigeratedFrozen(obj.get("refrigeratedFrozen").toString())
				.stowageType(obj.get("stowageType").toString())
				.liftType(obj.get("liftType").toString())
				.build();
		
		tmto = tbMemberTruckOwnerRepository.save(tmto);
		
		String msg = tmto.getTruckownerName() + " 님의 회원가입이 완료되었습니다.";

		return msg;
	}
	
	@Transactional
	@Override
	public String updateTruckOwner(HashMap<String, Object> obj, long uid) {
		Optional<TbMemberTruckOwner> tmto = tbMemberTruckOwnerRepository.findById(uid);
		
		tmto.ifPresent(user -> {
			user.setPassword(obj.get("password").toString());
			user.setCarNumber(obj.get("carNumber").toString());
			user.setPhoneNumber(obj.get("phoneNumber").toString());
			user.setStowageType(obj.get("stowageType").toString());
			//user.setBusinessNo(obj.get("businessNo").toString());
			user.setLongyn(obj.get("longyn").toString());
			user.setRefrigeratedFrozen(obj.get("refrigeratedFrozen").toString());
			user.setLiftType(obj.get("liftType").toString());
			user.setTruckTons(obj.get("truckTons").toString());
			user.setFreeyn(obj.get("freeyn").toString());
			tbMemberTruckOwnerRepository.save(user);
		});
		
		String msg = "회원정보 변경이 완료되었습니다.";

		return msg;
	}

	@Override
	public TbMemberTruckOwner getTruckOwner(long uid) {
		return tbMemberTruckOwnerRepository.findByTruckownerUid(uid);
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
	public TbSysSmslog getRegSmsLog(String receiverNumber, String authNumber) {
		TbSysSmslog tssl = tbSysSmslogRepository.findTop1ByReceiverNumberAndAuthNumberOrderByRegDtDesc(receiverNumber, authNumber);
		return tssl;
	}

	@Transactional
	@Override
	public TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(CargoInfoDto dto) throws ParseException, UnsupportedEncodingException {
		if (dto.getTruckownerUid() == 0) return null;
		
		JSONObject json = kakaoLocalUtil.searchAddress(dto.getDepartAddrSt()).getJSONArray("documents").getJSONObject(0);
		
		// x : 경도 : longitude
		// y : 위도 : latitude
		dto.setDepartLatitude(json.getString("y"));
		dto.setDepartLongitude(json.getString("x"));
		
		json = kakaoLocalUtil.searchAddress(dto.getArrivalAddrSt()).getJSONArray("documents").getJSONObject(0);
		dto.setArrivalLatitude(json.getString("y"));
		dto.setArrivalLongitude(json.getString("x"));
		
		if (dto.getCargoUid() == 0) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			TbTruckOwnerCargoInfo toci = TbTruckOwnerCargoInfo.insertCargoInfo()
											.truckownerUid(dto.getTruckownerUid())
											.loadDt(format.parse(dto.getLoadDt()))
											.unloadDt(format.parse(dto.getUnloadDt()))
											.departAddrSt(dto.getDepartAddrSt())
											.departAddrSt2(dto.getDepartAddrSt2())
											.departLatitude(dto.getDepartLatitude())
											.departLongitude(dto.getDepartLongitude())
											.arrivalAddrSt(dto.getArrivalAddrSt())
											.arrivalAddrSt2(dto.getArrivalAddrSt2())
											.arrivalLatitude(dto.getArrivalLatitude())
											.arrivalLongitude(dto.getArrivalLongitude())
											.spaceRate(dto.getSpaceRate())
											.cargoWeight(dto.getCargoWeight())
											.build();
			
			return tbTruckOwnerCargoInfoRepository.save(toci);
		} else {
			TbTruckOwnerCargoInfo toci = tbTruckOwnerCargoInfoRepository.findByCargoUid(dto.getCargoUid());
			
			toci.updateCargoInfo(
					dto.getLoadDt(), 
					dto.getUnloadDt(),
					dto.getSpaceRate(), 
					dto.getCargoWeight(), 
					dto.getDepartAddrSt(), 
					dto.getDepartAddrSt2(), 
					dto.getDepartLatitude(), 
					dto.getDepartLongitude(), 
					dto.getArrivalAddrSt(), 
					dto.getArrivalAddrSt2(),
					dto.getArrivalLatitude(),
					dto.getArrivalLongitude()
				);
			
			return toci;
		}
	}
	
	@Override
	public String removeTruckOwnerCargoInfo(long uid) {
		
		tbTruckOwnerCargoInfoRepository.deleteById(uid);
		
		return "해당 화물 정보가 삭제되었습니다.";
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
		} else {
			return null;
		}
	}
	
	private BooleanExpression truckownerNameEq(String truckownerName) {
		if(truckownerName != null) {
			return tmto.truckownerName.contains(truckownerName);   
		} else {
			return null;
		}
	}
	
	private BooleanExpression businessNoEq(String businessNo) {
		if(businessNo != null) {
			return tmto.businessNo.contains(businessNo);   
		} else {
			return null;
		}
	}

	@Override
	public Map<String, Object> getTruckOwnerMainInfo(long truckownerUid) {
		
		return tbTruckOwnerCargoInfoRepositoryCustom.dynamicByTruckOwnerMainInfo(truckownerUid);
	}


}
