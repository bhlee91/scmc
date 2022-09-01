package com.scmc.api.cargoreq.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.repository.TbCargoImageRepository;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CargoReqServiceImpl implements CargoReqService{
	
	@PersistenceContext
	private EntityManager em;
	
	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbCargoImageRepository tbCargoImageRepository;

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
}
