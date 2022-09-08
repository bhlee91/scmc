package com.scmc.api.customer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.customer.service.CommonTermsService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "고객 센터")
@RestController 
@RequestMapping("/customer")
@RequiredArgsConstructor
@Slf4j
public class CommonTermsController {

	private final CommonTermsService commonTermsService;
	
	@ApiOperation(value = "모든 약관 조회", notes = "모든 약관을 조회한다.")
	@GetMapping("/terms/{useYn}")
	public ResponseEntity<?> selectCommonTerms(
			@ApiParam(value = "사용여부", example = "Y") @PathVariable(value = "useYn") String useYn
		) throws Exception {
		log.info("=========");
		log.info("모든 약관 조회");
		log.info("=========");
		
		return new ResponseEntity<>(commonTermsService.selectTerms(useYn), HttpStatus.OK);
	}
	
	/*
	 * terms type 종류
	 * T01: 운송약관
	 * T02: 이용약관
	 * T03: 개인정보보호방침
	 * 
	 * USEYN: 사용/미사용여부
	 * 
	 * expdiv (노출채널) 종류
	 * MAPP : APP
	 * MWEB: 모파일웹
	 * PWEB: PCWEB
	 * ALLE : 모두 노출
	 */
	@ApiOperation(value = "타입별 노출채널 약관 조회", notes = "선택 약관을 조회한다.")
	@GetMapping("/terms/termstype")	
	public ResponseEntity<?> selectCommonTermsByTermsType(
			@ApiParam(value = "약관 타입", example = "T01") @RequestParam(value = "termsType") String termsType,
			@ApiParam(value = "노출 채널", example = "ALLE") @RequestParam(value = "expDiv") String expDiv,
			@ApiParam(value = "사용유무", example = "Y") @RequestParam(value = "useYn") String useYn
		) throws Exception {
		log.info("================");
		log.info("약관 타입별 약관 조회");
		log.info("termsType => " + termsType);
		log.info("expDiv => " + expDiv);
		log.info("================");
		
		return new ResponseEntity<>(commonTermsService.selectCommonTermsByTermsType(termsType, expDiv, useYn), HttpStatus.OK);		
	}
}
