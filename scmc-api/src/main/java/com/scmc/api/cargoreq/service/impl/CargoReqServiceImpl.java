package com.scmc.api.cargoreq.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.common.utils.KaKaoLocalUtil;
import com.scmc.api.jpa.domain.TbCargoHist;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.repository.TbCargoHistRepository;
import com.scmc.api.jpa.repository.TbCargoImageRepository;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class CargoReqServiceImpl implements CargoReqService{
	
	@PersistenceContext
	private EntityManager em;
	
	private final KaKaoLocalUtil kakaoLocalUtil;
	
	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbCargoImageRepository tbCargoImageRepository;
	private final TbCargoHistRepository tbCargoHistReqository;

	@Override
	@Transactional
	public List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid) {
		
		List<TbCargoRequest> result = tbCargoRequestRepository.findWithTbCargoImageUsingFetchJoinByOwnerUid(ownerUid);
		
		for (TbCargoRequest obj : result) {
			for (TbCargoImage images : obj.getImages()) {
				images.setContents(new String(images.getImageContents()));
			}
		}
	
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
	public int insertAndUpdateRequest(Map<String, Object> param) {
		TbCargoRequest tbcr = null;
		
		try {
			log.info("param => " + param.toString());
			log.info("departDatetimes => " + param.get("departDatetimes").equals(""));
			log.info("arrivalDatetimes => " + param.get("arrivalDatetimes").equals(""));
			tbcr = new TbCargoRequest(param);
			tbCargoRequestRepository.save(tbcr);
			
			@SuppressWarnings("unchecked")
			List<HashMap<String, Object>> imageList = (List<HashMap<String, Object>>) param.get("imageList");
			
			for (HashMap<String, Object> image : imageList) {
				image.put("memDiv", "M01");
				
				TbCargoImage tci = new TbCargoImage(image);
				tci.setTbCargoRequest(tbcr);
				
				tbCargoImageRepository.save(tci);
			}
			
			return 1;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}

	@Override
	public String searchAddress(String query) {
		String result;
		try {
			result = kakaoLocalUtil.searchAddress(query);
		} catch (UnsupportedEncodingException e) {
			result = "잘못된 주소입니다.";
			e.printStackTrace();
		}
		
		return result;
	}
}
