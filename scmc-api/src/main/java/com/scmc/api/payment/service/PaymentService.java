package com.scmc.api.payment.service;

import java.util.Map;

public interface PaymentService {

	int insertAndUpdatePayment(Map<String, Object> param);
	
	int updateTruckOwnerFreeYn(Long truckownerUid, String freeyn);
}
