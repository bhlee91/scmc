package com.scmc.api.cargoreq.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.cargoreq.service.CargoReqService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "의뢰내역")
@RestController
@RequestMapping("/req")
@RequiredArgsConstructor
@Slf4j
public class CargoReqController {

	private final CargoReqService cargoReqService;
	
	@ApiOperation(value = "화주별 이용내역 전체 조회", notes = "화주별 이용내역 리스트를 조회한다.")
	@GetMapping("/list/{ownerUid}")
	public ResponseEntity<?> selectCargoRequest(
			@ApiParam(value = "화주 uid", example = "1") @PathVariable(value = "ownerUid") Long ownerUid
			) throws Exception {
		log.info("========================");
		log.info("사용자별 이용내역 리스트 조회");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectCargoRequestByOwnerUid(ownerUid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "의뢰 내역 상태 변경", notes = "의뢰내역 상태를 변경한다.")
	@GetMapping("/update/{status}/{reqId}")
	public ResponseEntity<?> updateCargoRequestStatus(
			@ApiParam(value = "상태 값", example = "MF") @PathVariable(value = "status") String status
			,@ApiParam(value = "요청번호", example = "1") @PathVariable(value = "reqId") Long reqId
			) throws Exception {
		log.info("========================");
		log.info("의뢰내역 상태 변경");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.updateStatus(status, reqId), HttpStatus.OK);
	}
	
}
