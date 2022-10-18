package com.scmc.api.member.truck.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.common.jwt.JwtTokenProvider;
import com.scmc.api.common.jwt.TokenDto;
import com.scmc.api.common.utils.HiWorksUtil;
import com.scmc.api.common.utils.KaKaoLocalUtil;
import com.scmc.api.jpa.domain.QTbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbCargoHist;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbSysSmslog;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;
import com.scmc.api.jpa.repository.TbCargoHistRepository;
import com.scmc.api.jpa.repository.TbCargoHistRepositoryCustom;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.jpa.repository.TbSysSmslogRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerCargoInfoRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerCargoInfoRepositoryCustom;
import com.scmc.api.member.truck.dto.CargoInfoDto;
import com.scmc.api.member.truck.dto.HistoryDto;
import com.scmc.api.member.truck.dto.TruckOwnerDto;
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
	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbCargoHistRepository tbCargoHistRepository;
	private final TbCargoHistRepositoryCustom tbCargoHistRepositoryCustom;
	
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private JPAQueryFactory query;
	
	@Autowired
	private EntityManager em;
	
	QTbMemberTruckOwner tmto = QTbMemberTruckOwner.tbMemberTruckOwner;
	
	@Override
	public Map<String, Object> truckOwnerLogin(HashMap<String, Object> param) {
		Map<String, Object> obj = new HashMap<String, Object>();
		TbMemberTruckOwner user = 
				tbMemberTruckOwnerRepository.findByCarNumber(param.get("carNumber").toString())
				.orElseThrow(() -> new IllegalArgumentException("가입되지 않은 차량 번호입니다."));
		if(!passwordEncoder.matches((CharSequence) param.get("password"), user.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호 입니다.");
		}
		
		
		TokenDto token = jwtTokenProvider.createTruckToken(user.getCarNumber());
		if(user != null) {
			user.setRefreshToken(token.getRefreshToken());
			tbMemberTruckOwnerRepository.save(user);
		}
		obj.put("truckownerUid", user.getTruckownerUid());
		obj.put("truckownerName", user.getTruckownerName());
		obj.put("phoneNumber", user.getPhoneNumber());
		obj.put("carNumber", user.getCarNumber());
		obj.put("token", token);
																				
		return obj;
	}
	
	@Override
	public String confirmAccount(HashMap<String, Object> param) {
		String msg = "";
		TbMemberTruckOwner user = 
				tbMemberTruckOwnerRepository.findByCarNumber(param.get("carNumber").toString())
				.orElseThrow();
		if(!passwordEncoder.matches((CharSequence) param.get("password"), user.getPassword())) {
			throw new IllegalArgumentException("잘못된 비밀번호 입니다.");
		} else {
			msg = "확인되었습니다.";
		}
		return msg;
	}
	
	@Override
	public TruckOwnerDto getTruckOwner(String carNumber) {
		TruckOwnerDto to = new TruckOwnerDto();
		
		TbMemberTruckOwner user = 
				tbMemberTruckOwnerRepository.findByCarNumber(carNumber)
				.orElseThrow();
		
		to.setTruckownerUid(user.getTruckownerUid());
		to.setTruckownerName(user.getTruckownerName());
		to.setBusinessNo(user.getBusinessNo());
		to.setCarNumber(carNumber);
		to.setLiftType(user.getLiftType());
		to.setLongyn(user.getLongyn());
		to.setRefrigeratedFrozen(user.getRefrigeratedFrozen());
		to.setStowageType(user.getStowageType());
		to.setTruckTons(user.getTruckTons());
		to.setPhoneNumber(user.getPhoneNumber());
		
		return to;
	}
	
	@Override
	@Transactional
	public String changePassowrd(HashMap<String, Object> param) {
		
		String msg = "";
		
		TbMemberTruckOwner tmto = tbMemberTruckOwnerRepository.findByPhoneNumber(param.get("phoneNumber").toString());
		
		if(tmto != null) {
			tmto.setPassword(passwordEncoder.encode((CharSequence) param.get("password".toString())));
			tbMemberTruckOwnerRepository.save(tmto);
			msg = " 비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.";	
		} else { 
			msg = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
		}
		
		return msg;
	}
	
	@Transactional
	@Override
	public String insertTruckOwner(HashMap<String, Object> obj) {

		TbMemberTruckOwner tmto = TbMemberTruckOwner.insertBuilder()
				.carNumber(obj.get("carNumber").toString())
				.phoneNumber(obj.get("phoneNumber").toString())
				.password(passwordEncoder.encode(obj.get("password").toString()))
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
	public Map<String, Object> getTruckOwnerMainInfo(long uid, String lat, String lon) {
		Map<String, Object> result = tbTruckOwnerCargoInfoRepositoryCustom.dynamicByTruckOwnerMainInfo(uid);
		result.put("documents", this.getTruckOwnerCurrentLocation(lat, lon));
		result.put("cargo_list", this.getCargoListByTruckOwner(uid));
		
		return result;
	}
	
	@Override
	public Map<String, Object> getTruckOwnerCurrentLocation(String lat, String lon) {
		Map<String, Object> loc_map = null;
		
		if (!(lat.equals("0") || lon.equals("0")))
			loc_map = kakaoLocalUtil.coord2Address(lat, lon).getJSONArray("documents").getJSONObject(0).toMap();
		
		return loc_map;
	}
	
	@Override
	public List<HistoryDto> getCargoListByTruckOwner(long uid) {
		List<HistoryDto> hist_list = tbCargoHistRepositoryCustom.dynamicBytruckownerUidAndStatusNotIn(uid, Arrays.asList("MO", "RO", "TF", "TN"));
		
		return hist_list;
	}

	@Override
	public List<?> getCargoListInRadius(double lat, double lon, int rad, String d) {
		List<TbCargoRequest> result = null;
		
		if (lat == 0 || lon == 0) return result;
		
		if (d.equals("dist")) result = tbCargoRequestRepository.findByEarthDistanceByDistance(lat, lon, rad);
		else if (d.equals("reg")) result = tbCargoRequestRepository.findByEarthDistanceByReg(lat, lon, rad);
		
		if (result != null) {
			for (TbCargoRequest request : result) {
				
				for (TbCargoImage image : request.getImages()) {
					image.setContents(new String(image.getImageContents()));
				}
			}
		}
		
		return result;
	}
	
	@Transactional
	@Override
	public boolean setRequestTransportConfirm(Map<String, Long> dto) {
		TbCargoRequest request = tbCargoRequestRepository.findByReqId(dto.get("reqId"));
		TbMemberTruckOwner truckowner = tbMemberTruckOwnerRepository.findByTruckownerUid(dto.get("truckownerUid"));
		
		/*
		 * RO: 준비/등록중
		 * MO: 최적차량검색
		 * MF: 매칭완료
		 * LC: 상차완료
		 * TO: 운송중
		 * UC: 하차완료
		 * TF: 운송완료
		 * TN: 운송취소
		 */
		TbCargoHist hist = new TbCargoHist(request, truckowner, "MF");
		
		try {
			tbCargoHistRepository.save(hist);
			
			request.setStatus("MF");
			request.setModDt(new Date());
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}


}
