package com.scmc.api.cargoreq.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
import com.scmc.api.jpa.domain.TbCargoRequest;

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
	@PostMapping("/update")
	public ResponseEntity<?> updateCargoRequestStatus(
			@RequestParam(value = "status") String status
			,@RequestParam(value = "reqId")  Long reqId
			) throws Exception {
		log.info("========================");
		log.info("의뢰내역 상태 변경");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.updateStatus(status, reqId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "의뢰 내역 등록/수정", notes = "의뢰내역을 등록/수정한다.")
	@PostMapping("/create")
	public ResponseEntity<?> createCargoRequest(
			@RequestBody Map<String, Object> param
			) throws Exception {
		log.info("========================");
		log.info("의뢰내역 등록 or 수정");
		log.info("========================");
		
//		param.put("ownerUid", 1L);
//		param.put("reqComyn", "N");
//		param.put("status", "RO");
//		param.put("regDt", new Timestamp(0));
	
		return new ResponseEntity<>(cargoReqService.createRequest(param), HttpStatus.OK);
	}
	
}
