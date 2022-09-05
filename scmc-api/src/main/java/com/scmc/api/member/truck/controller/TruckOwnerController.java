package com.scmc.api.member.truck.controller;

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

import com.scmc.api.member.truck.service.TruckOwnerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "차주용 API")
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
		log.info("차주 등록/수정 => " + q);
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.postTruckOwner(obj, q) ,HttpStatus.OK);
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
	
	@ApiOperation(value = "차주 회원정보 조회", notes = "차주의 회원정보를 조회한다.")
	@GetMapping("/sms")
	public ResponseEntity<?> getSmsAuthNumber(
			@ApiParam(value = "휴대폰번호") @RequestParam(value = "phoneNumber", required = true) String phoneNumber
			) throws Exception {
		String authNumber = truckOwnerService.getSmsAuthNumber(phoneNumber);
		log.info("==================");
		log.info("sms 인증번호 조회");
		log.info("==================");
		
		return new ResponseEntity<>(authNumber, HttpStatus.OK);
	}
}
