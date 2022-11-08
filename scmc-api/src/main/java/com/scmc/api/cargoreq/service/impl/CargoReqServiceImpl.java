package com.scmc.api.cargoreq.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.scmc.api.cargoreq.dto.ImageDto;
import com.scmc.api.cargoreq.dto.RequestDetailDto;
import com.scmc.api.cargoreq.dto.RequestDto;
import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.common.utils.CommonUtil;
import com.scmc.api.common.utils.KaKaoLocalUtil;
import com.scmc.api.common.utils.NaverDirectionUtil;
import com.scmc.api.jpa.domain.TbCargoHist;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.dto.MatchingDto;
import com.scmc.api.jpa.repository.TbCargoHistRepository;
import com.scmc.api.jpa.repository.TbCargoImageRepository;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;
import com.scmc.api.jpa.repository.TbCargoRequestRepositoryCustom;
import com.scmc.api.jpa.repository.TbCommonCdRepository;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CargoReqServiceImpl implements CargoReqService {
	
	@PersistenceContext
	private EntityManager em;
	
	private final KaKaoLocalUtil kakaoLocalUtil;
	private final NaverDirectionUtil naverDirectionUtil;
	
	private final TbCommonCdRepository tbCommonCdRepository;
	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbCargoImageRepository tbCargoImageRepository;
	private final TbCargoHistRepository tbCargoHistReqository;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private final TbCargoRequestRepositoryCustom tbCargoRequestRepositoryCustom;
	private final TbCargoHistRepository tbCargoHistRepository;

	@Override
	@Transactional
	public List<TbCargoRequest> selectCargoRequest(Long ownerUid, String departDate, String arrivalDate, String phoneNumber, String status) throws ParseException {
		List<TbCargoRequest> result;
		
		if (ownerUid == null) {
			result = tbCargoRequestRepositoryCustom.dynamicByDepartDatetimesAndArrivalDatetimesAndPhoneNumberAndStatus(departDate, arrivalDate, phoneNumber, status);
		} else {
			result = tbCargoRequestRepository.findWithTbCargoImageUsingFetchJoinByOwnerUidOrderByReqIdAsc(ownerUid);
		}
		
		for (TbCargoRequest obj : result) {
			obj.setStatusName(tbCommonCdRepository.findByCdid(obj.getStatus()).getCodeName());
			
			for (TbCargoImage images : obj.getImages()) {
				images.setContents(new String(images.getImageContents()));
			}
		}
	
		return result;
	}
	
	@Override
	@Transactional
	public List<TbCargoRequest> selectCargoRequestByStatus(Long ownerUid, List<String> status){
		List<TbCargoRequest> list = tbCargoRequestRepository.findByOwnerUidAndStatusIn(ownerUid, status);
		return list;
	}
	
	@Override
	public List<MatchingDto> selectRequestMatching(String departDate, String arrivalDate, String phoneNumber,
			String cargoName, String status) throws ParseException {
		
		List<MatchingDto> result = tbCargoRequestRepositoryCustom.dynamicByMatching(departDate, arrivalDate, phoneNumber, cargoName, status);
		
		return result;
	}
	
	@Override
	@Transactional
	public int insertHistory(Map<String, Object> param) {
		TbCargoHist tbch = null;
		
		try {
			tbch = new TbCargoHist(param);
			tbCargoHistReqository.save(tbch);
			
			return 1;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			
			return 0;
		}
	}
	
	@Override
	@Transactional
	public int updateStatus(String status, Long reqId) {
		int cnt = em.createQuery("UPDATE TbCargoRequest SET status = :status WHERE reqId = :reqId")
						.setParameter("status", status)
						.setParameter("reqId", reqId)		
						.executeUpdate();
		return cnt;
	}
	
	@Transactional
	@Override
	public int saveRequest(RequestDto dto) {
		TbCargoRequest tbcr = null;
		
		try {
			String start = String.format("%f,%f", dto.getDepartLongitude(), dto.getDepartLatitude());
			String goal = String.format("%f,%f", dto.getArrivalLongitude(), dto.getArrivalLatitude());
			JSONObject driving = new JSONObject(naverDirectionUtil.getCoord(start, goal, "traoptimal"));
			
			JSONObject summary = driving.getJSONObject("route").getJSONArray("traoptimal").getJSONObject(0).getJSONObject("summary");
			
			int realDistance = summary.getInt("distance");
			int directDistance = CommonUtil.distance(dto.getDepartLatitude(), dto.getDepartLongitude(), dto.getArrivalLatitude(), dto.getArrivalLongitude(), "m");
					
			dto.setRealDistance(realDistance);
			dto.setDirectDistance(directDistance);
			
			tbcr = tbCargoRequestRepository.save(new TbCargoRequest(dto)); 
			
			for (ImageDto image : dto.getImageList()) {
				TbCargoImage tci = new TbCargoImage(image);
				tci.setTbCargoRequest(tbcr);
				
				tbCargoImageRepository.save(tci);
			}
			
			return 1;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
	
	@Override
	public Map<String, Integer> selectRequestFare(Map<String, Float> obj) {
		try {
			String start = String.format("%f,%f", obj.get("departLongitude"), obj.get("departLatitude"));
			String goal = String.format("%f,%f", obj.get("arrivalLongitude"), obj.get("arrivalLatitude"));
			JSONObject driving = new JSONObject(naverDirectionUtil.getCoord(start, goal, "traoptimal"));
			
			JSONObject summary = driving.getJSONObject("route").getJSONArray("traoptimal").getJSONObject(0).getJSONObject("summary");

			int realDistance = summary.getInt("distance");
			int directDistance = CommonUtil.distance(obj.get("departLongitude"), obj.get("departLatitude"), obj.get("arrivalLongitude"), obj.get("arrivalLatitude"), "m");

			// 거리 계산을 위해 m -> km 변환
			int rd = Math.round(realDistance / 1000);
			
			int additionalFare = CommonUtil.fareByDistance(rd);
			
			Map<String, Integer> res = new HashMap<String, Integer>();
			
			res.put("realDistance", realDistance);
			res.put("directDistance", directDistance);
			res.put("additionalFare", additionalFare);

			return res;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@Override
	public int saveRequestFare(Map<String, Object> obj) {
		TbCargoRequest tbcr = null;
		
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
			tbcr = tbCargoRequestRepository.findByReqId(Long.parseLong(obj.get("reqId").toString()));
			
			tbcr.setTransitFare(Integer.parseInt(obj.get("transitFare").toString()));
			tbcr.setAdditionalFare(Integer.parseInt(obj.get("additionalFare").toString()));
			tbcr.setModDt(format.parse(CommonUtil.getNowDate()));
			
			tbCargoRequestRepository.save(tbcr);
			
			return 1;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}

	@Override
	public String searchAddress(String query) {
		String result;
		try {
			result = kakaoLocalUtil.searchAddress(query).toString();
		} catch (UnsupportedEncodingException e) {
			result = "잘못된 주소입니다.";
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	@Transactional
	public List<TbMemberTruckOwner> selectCargoRequestByTruckOwnerUid(Long truckownerUid) {

		List<TbMemberTruckOwner> result = tbMemberTruckOwnerRepository.findWithTbCargoHistUsingFetchJoinByTruckownerUid(truckownerUid);
		
		return result;
	}

	@Override
	public TbCargoRequest selectCargoRequestDetail(Long reqId) {

		TbCargoRequest request = tbCargoRequestRepository.findByReqId(reqId);
		
		for (TbCargoImage image : request.getImages()) {
			image.setContents(new String(image.getImageContents()));
			
			if (image.getMemDiv().equals("M01")) {
				request.getCargoImages().add(image);
			} else if (image.getMemDiv().equals("M02")) {
				if (image.getMethodDiv().equals("LM")) {
					request.getLoadImages().add(image);
				} else {
					request.getUnloadImages().add(image);
				}
			}
		}
		
		return request;
	}

	@Override
	public TbCargoHist selectCargoHist(Long reqId) {
		TbCargoHist hist = tbCargoHistRepository.findByRequest_ReqId(reqId);
		return hist;
	}
	
	@Transactional
	@Override
	public boolean updateCargoRequestDetail(RequestDetailDto dto) {
		boolean res = true;
		
		try {
			TbCargoRequest request = tbCargoRequestRepository.findByReqId(dto.getReqId());
			
			if (dto.getLmFiles().size() > 0) {
				for (ImageDto i : dto.getLmFiles()) {
					TbCargoImage tci = new TbCargoImage(i);
					tci.setTbCargoRequest(request);
					
					tbCargoImageRepository.save(tci);
				}
			}
			
			if (dto.getUmFiles().size() > 0) {
				for (ImageDto i : dto.getUmFiles()) {
					TbCargoImage tci = new TbCargoImage(i);
					tci.setTbCargoRequest(request);
					
					tbCargoImageRepository.save(tci);
				}
			}
			
			return res;
		} catch (Exception e) {
			res = false;
			e.printStackTrace();
			return res;
		}
	}

	@Override
	@Transactional
	public String updateAddFare(Long reqId, int additionalFare) {

		String msg = "";
		try {
			
			TbCargoRequest request = tbCargoRequestRepository.findByReqId(reqId);
			request.setAdditionalFare(request.getAdditionalFare() + additionalFare);
			tbCargoRequestRepository.save(request);
			
		} catch(Exception e) {
			System.out.println(e.getMessage());
			msg = "운송비 추가에 실패 했습니다. 잠시 후 다시 시도해주세요.";
			
		}
		msg = "운송비가 변경 되었습니다.";
		
		return msg;
	}
	
}
