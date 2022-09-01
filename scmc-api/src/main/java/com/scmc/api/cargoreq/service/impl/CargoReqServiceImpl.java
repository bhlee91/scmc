package com.scmc.api.cargoreq.service.impl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
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
		
		
		List<TbCargoRequest> list = em.createQuery("select distinct r from TbCargoRequest r left join fetch r.images i where r.ownerUid = :ownerUid"
				, TbCargoRequest.class )
				.setParameter("ownerUid", ownerUid)
				.getResultList();
	
		return list;
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

	@Override
	public int createRequest(Map<String, Object> param) {
		TbCargoRequest tbcr = new TbCargoRequest();
		try {
			tbcr.setOwnerUid((Long)param.get("ownerUid"));
			tbcr.setCargoName((String)param.get("cargoName"));
			tbcr.setTruckUid((Long)param.get("truckUid"));
			tbcr.setCweight((float)param.get("cweight"));
			tbcr.setCheight((float)param.get("cheight"));
			tbcr.setCwidth((float)param.get("cwidth"));
			tbcr.setCverticalreal((float)param.get("cverticalreal"));
			tbcr.setDepartDatetimes( (Date)param.get("departDatetimes"));
			tbcr.setArrivalDatetimes((Date)param.get("arrivalDateTimes"));
			tbcr.setDepartAddrSt((String)param.get("departAddrSt"));
			tbcr.setDepartAddrSt2((String)param.get("departAddrSt2"));
			tbcr.setDepartAddrOld((String)param.get("departAddrOld"));
			tbcr.setDepartAddrOld2((String)param.get("departAddrOld2"));
			tbcr.setArrivalAddrSt((String)param.get("arrivalAddrSt"));
			tbcr.setArrivalAddrSt2((String)param.get("arrivalAddrSt2"));
			tbcr.setArrivalAddrOld((String)param.get("arrivalAddrOld"));
			tbcr.setArrivalAddrOld2((String)param.get("arrivalAddrOld2"));
			tbcr.setReceiverPhone((String)param.get("receiverPhone"));
			tbcr.setDepartLatitude((String)param.get("departLatitude"));
			tbcr.setDepartLongitude((String)param.get("departLongitude"));
			tbcr.setArrivalLatitude((String)param.get("arrivalLatitude"));
			tbcr.setArrivalLongitude((String)param.get("arrivalLongitude"));
			tbcr.setLoadMethod((String)param.get("loadMethod"));
			tbcr.setUnloadMethod((String)param.get("unloadMethod"));
			tbcr.setRequestItems((String)param.get("requestItems"));
			tbcr.setTransitFare((Integer)param.get("transitFare"));
			tbcr.setAdditionalFare((Integer)param.get("additionalFare"));
			tbcr.setReqComyn((String)param.get("reqComyn"));
			tbcr.setStatus((String)param.get("status"));
			tbcr.setRegId((String)param.get("regId"));
			tbcr.setRegDt((Date)param.get("regDt"));
			tbcr.setRegComDate((Date)param.get("regComDate"));
			tbcr.setModDt((Date)param.get("modDt"));
			
			tbCargoReqeustRepository.save(tbcr);
			
			return 1;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
	
	
}
