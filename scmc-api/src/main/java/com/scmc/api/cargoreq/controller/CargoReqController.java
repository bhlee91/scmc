package com.scmc.api.cargoreq.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.cargoreq.service.CargoReqService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "의뢰내역")
@RestController
@RequestMapping("/cargo")
@RequiredArgsConstructor
@Slf4j
public class CargoReqController {

	private final CargoReqService cargoReqService;
	
	@ApiOperation(value = "화주별 이용내역 전체 조회", notes = "화주별 이용내역 리스트를 조회한다.")
	@GetMapping({"/request", "/request/{ownerUid}"})
	public ResponseEntity<?> selectCargoRequest(
			@ApiParam(value = "화주 uid", example = "1") @PathVariable(value = "ownerUid") Long ownerUid
			) throws Exception {
		log.info("========================");
		log.info("사용자별 이용내역 리스트 조회");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectCargoRequestByOwnerUid(ownerUid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "의뢰 내역 등록/수정", notes = "의뢰내역을 등록/수정한다.")
	@PostMapping("/request")
	public ResponseEntity<?> createCargoRequest(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("========================");
		log.info("의뢰내역 등록/수정");
		log.info("========================");
	
		return new ResponseEntity<>(cargoReqService.insertAndUpdateRequest(param), HttpStatus.OK);
	}
	
	/*
	 * 진행상태 
	 * RO: 준비/등록중 
	 * MO: 최적차량검색
	 * MF: 매칭완료
	 * LC: 상차완료
	 * TO: 운송중
	 * UC: 하차완료
	 * TF: 운송완료
	 * TN: 운송취소
	 */
	@ApiOperation(value = "의뢰 내역 상태 변경", notes = "의뢰내역 상태를 변경한다.")
	@PostMapping("/update")
	public ResponseEntity<?> updateCargoRequestStatus(
			@ApiParam(value = "진행 상태", example = "RO") @RequestParam(value = "status") String status,
			@ApiParam(value = "의뢰 번호", example = "1") @RequestParam(value = "reqId")  Long reqId
			) throws Exception {
		log.info("========================");
		log.info("의뢰내역 상태 변경");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.updateStatus(status, reqId), HttpStatus.OK);
	}
	

	
}
