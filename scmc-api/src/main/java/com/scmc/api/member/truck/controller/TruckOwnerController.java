package com.scmc.api.member.truck.controller;

import java.util.HashMap;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.member.truck.service.TruckOwnerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "차주 회원용")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class TruckOwnerController {
	
	private final TruckOwnerService truckOwnerService;
	
	@ApiOperation(value = "차주 등록/수정", notes = "차주 등록/수정")
	@PostMapping("/truck")
	@GetMapping("/truck")
	public ResponseEntity<?> postTruckOwner(@RequestBody HashMap<String, Object> obj,
			@ApiParam(value = "등록/수정 구분값", example = "post") @RequestParam(value = "q") String q
			) throws Exception {
		log.info("==================");
		log.info("차주 등록/수정");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.setTruckOwner(obj, q) ,HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 회원정보 조회", notes = "차주의 회원정보를 조회한다.")
	@GetMapping("/truck/{uid}")
	public ResponseEntity<?> getTruckOwner(
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "uid") Long uid
			) throws Exception {
		log.info("==================");
		log.info("차주 회원정보 조회");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.getTruckOwner(uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 회원가입시 sms 인증", notes = "입력한 휴대폰 번호에 인증 번호 메시지를 보낸다.")
	@GetMapping("/sms")
	public ResponseEntity<?> getSmsAuthNumber(
			@ApiParam(value = "휴대폰번호('-'없이 입력)") @RequestParam(value = "phoneNumber", required = true) String phoneNumber
			) throws Exception {
		String authNumber = truckOwnerService.getSmsAuthNumber(phoneNumber);
		log.info("==================");
		log.info("sms 인증번호 조회");
		log.info("==================");
		
		return new ResponseEntity<>(authNumber, HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 화물정보 입력", notes = "차주의 화물정보를 입력한다.")
	@GetMapping("/cargo")
	public ResponseEntity<?> setCargoInfo(@RequestBody HashMap<String, Object> obj) throws Exception {
		log.info("==================");
		log.info("차주 화물정보 입력");
		log.info("==================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 목록 조회(검색)", notes = "차주목록을 조회한다.")
	@GetMapping("/truck/ownerList")
	public ResponseEntity<?> selectTruckOwner(
			@ApiParam(value = "차량 번호", example = "45오4545") @RequestParam(value = "carNumber", required = false) String carNumber,
			@ApiParam(value = "차주 성명", example = "") @RequestParam(value = "truckownerName", required = false) String truckownerName,
			@ApiParam(value = "사업자번호", example = "") @RequestParam(value = "businessNo", required = false) String businessNo,
			@PageableDefault(sort = {"truckownerUid"}, direction = Sort.Direction.ASC) Pageable page
			
			) throws Exception {
		log.info("==================");
		log.info("차주 목록 조회(검색)");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.selectTruckOwner(carNumber,truckownerName,businessNo, page), HttpStatus.OK);
	}
}
