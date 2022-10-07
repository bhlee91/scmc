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

import org.springframework.stereotype.Service;

import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.common.utils.CommonUtil;
import com.scmc.api.common.utils.KaKaoLocalUtil;
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
	
	private final TbCommonCdRepository tbCommonCdRepository;
	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbCargoImageRepository tbCargoImageRepository;
	private final TbCargoHistRepository tbCargoHistReqository;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private final TbCargoRequestRepositoryCustom tbCargoRequestRepositoryCustom;

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
	public int saveRequest(Map<String, Object> param) {
		TbCargoRequest tbcr = null;
		
		try {
			tbcr = tbCargoRequestRepository.save(new TbCargoRequest(param));
			
			@SuppressWarnings("unchecked")
			List<HashMap<String, Object>> imageList = (List<HashMap<String, Object>>) param.get("imageList");
			
			for (HashMap<String, Object> image : imageList) {
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
}
