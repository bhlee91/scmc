package com.scmc.api.cargoreq.service.impl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CargoReqServiceImpl implements CargoReqService{
	
	@PersistenceContext
	private EntityManager em;
	
	private final TbCargoRequestRepository tbCargoReqeustRepository;
	
//	@Override
//	@Transactional
//	public List<TbCargoRequest> findAllByOwnerUidWithTbCargoImageUsingFetchJoin(Long ownerUid) {
//		
//		return tbCargoReqeustRepository.findAllWithTbCargoImageByOwnerUidUsingFetchJoin(ownerUid);
//	}

	@Override
	@Transactional
	public List<TbCargoRequest> selectCargoRequestByOwnerUid(Long ownerUid) {
		
		List<TbCargoRequest> list = em.createQuery("select r from TbCargoRequest r left join  r.images i where r.ownerUid = :ownerUid"
				, TbCargoRequest.class )
				.setParameter("ownerUid", ownerUid)
				.getResultList();
	
		
		return list;//.stream().map(List<TbCargoRequest>::list);
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
}
