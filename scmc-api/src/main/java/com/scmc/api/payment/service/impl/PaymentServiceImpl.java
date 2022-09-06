package com.scmc.api.payment.service.impl;

import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerPayment;
import com.scmc.api.jpa.repository.TbMemberTruckOwnerRepository;
import com.scmc.api.jpa.repository.TbTruckOwnerPaymentRepository;
import com.scmc.api.payment.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService{
	
	@PersistenceContext
	private EntityManager em;
	
	private final TbTruckOwnerPaymentRepository tbTruckOwnerPaymentRepository;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	
	@Override
	@Transactional
	public int insertAndUpdatePayment(Map<String, Object> param) {
		TbTruckOwnerPayment top = null;
		
		try {
			top = new TbTruckOwnerPayment(param);
			tbTruckOwnerPaymentRepository.save(top);
			
			return 1;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
		
	}

	@Override
	@Transactional
	@Modifying(clearAutomatically = true)
	public int updateTruckOwnerFreeYn(Long truckownerUid, String freeyn) {
		try {
			TbMemberTruckOwner tmto = tbMemberTruckOwnerRepository.findByTruckownerUid(truckownerUid);
			if(tmto != null) {
				tmto.setFreeyn(freeyn);
				
			}else {
				System.out.println("수정 실패");
				return 0;
			}
			
			return 1;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
	

}
