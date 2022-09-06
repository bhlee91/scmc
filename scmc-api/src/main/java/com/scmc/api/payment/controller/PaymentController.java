package com.scmc.api.payment.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.cargoreq.controller.CargoReqController;
import com.scmc.api.cargoreq.service.CargoReqService;
import com.scmc.api.payment.service.PaymentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "결제 관리")
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

	private final PaymentService paymentService;
	
	@ApiOperation(value = "차주 유/무료 회원 상태 변경", notes = "차주의 유/무료 회원 상태를 변경한다.")
	@PostMapping("/updateFree")
	public ResponseEntity<?> updateTruckOwnerFreeyn(
			@ApiParam(value = "차주 uid", example = "1") @RequestParam(value = "truckownerUid")  Long truckownerUid,
			@ApiParam(value = "유/무료 회원 여부", example = "Y") @RequestParam(value = "freeyn") String freeyn
			
			) throws Exception {
		log.info("========================");
		log.info("유/무료 회원 상태 변경");
		log.info("========================");
		
		return new ResponseEntity<>(paymentService.updateTruckOwnerFreeYn(truckownerUid, freeyn), HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "결제 이력 등록", notes = "결제 이력을 등록한다.")
	@PostMapping("/insert")
	public ResponseEntity<?> createCargoHist(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("========================");
		log.info("결제이력 등록/수정");
		log.info("========================");
	
		return new ResponseEntity<>(paymentService.insertAndUpdatePayment(param), HttpStatus.OK);
	}
}
