package com.scmc.api.customer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.customer.service.CommonTermsService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
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
	@GetMapping("/terms")
	public ResponseEntity<?> selectCommonTerms() throws Exception {
		log.info("=========");
		log.info("모든 약관 조회");
		log.info("=========");
		
		return new ResponseEntity<>(commonTermsService.selectCommonTerms(), HttpStatus.OK);
	}
	
	/*
	 * terms type 종류
	 * T01: 운송약관
	 * T02: 이용약관
	 * T03: 개인정보보호방침
	 * 
	 * USEYN: 사용/미사용여부
	 */	
	@ApiOperation(value = "약관 타입별 약관 조회", notes = "선택 약관을 조회한다.")
	@ApiImplicitParam(name = "termsType", value = "약관 타입", required = true, dataType = "string", paramType = "path", defaultValue = "T01")
	@GetMapping("/terms/{termsType}")	
	public ResponseEntity<?> selectCommonTermsByTermsType(
			@ApiParam(value = "약관 타입", example = "T01") @PathVariable(value = "termsType") String termsType
		) throws Exception {
		log.info("================");
		log.info("약관 타입별 약관 조회");
		log.info("termsType => " + termsType);
		log.info("================");
		
		return new ResponseEntity<>(commonTermsService.selectCommonTermsByTermsType(termsType), HttpStatus.OK);		
	}
}
