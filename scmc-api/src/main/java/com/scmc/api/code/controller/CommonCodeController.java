package com.scmc.api.code.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.code.service.CommonCodeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "공통코드")
@RestController
@RequestMapping("/common")
@RequiredArgsConstructor
@Slf4j
public class CommonCodeController {
	
	private final CommonCodeService commonCodeService;

	@ApiOperation(value = "공통 코드 조회", notes = "공통 코드를 조회한다.")
	@GetMapping("/code")
	public ResponseEntity<?> selectCommonCode() throws Exception {
		log.info("=========");
		log.info("공통 코드 조회");
		log.info("=========");
		
		return new ResponseEntity<>(commonCodeService.selectCommonCode(), HttpStatus.OK);
	}
	
	/*
	 * code type 종류
	 * CNAME: 차량명칭
	 * CTYPE: 차량종류
	 * LDULD: 상차/하차방법
	 * LFTYN: 리프트여부
	 * LORYN: 초장축여부
	 * MEDIV: 멤버구분
	 * REQIT: 요청사항
	 * RFOFZ: 냉장/냉동여부
	 * STATU: 진행상태
	 * STOTY: 적재함형태
	 * TERMS: 약관
	 * USEYN: 사용/미사용여부
	 */
	@ApiOperation(value = "코드 타입별 공통 코드 조회", notes = "공통 코드를 조회한다.")
	@ApiImplicitParam(name = "codeType", value = "코드 타입", required = true, dataType = "string", paramType = "path", defaultValue = "CNAME")
	@GetMapping("/code/{codeType}")
	public ResponseEntity<?> selectCommonCodeByCodeType(
			@ApiParam(value = "코드 타입", example = "CNAME") @PathVariable(value = "codeType") String codeType
		) throws Exception {
		log.info("================");
		log.info("코드 타입별 공통 코드 조회");
		log.info("codeType => " + codeType);
		log.info("================");
		
		return new ResponseEntity<>(commonCodeService.selectCommonCodeByCodeType(codeType), HttpStatus.OK);
	}
	
	@ApiOperation(value = "요청 사항 공통 코드 조회", notes = "요청 사항 공통 코드를 조회한다.")
	@GetMapping("/code/request-item")
	public ResponseEntity<?> selectCommonCodeByRequestItem() throws Exception {
		log.info("================");
		log.info("요청 사항 공통 코드 조회");
		log.info("================");
		
		return new ResponseEntity<>(commonCodeService.selectCommonCodeByRequestItem(), HttpStatus.OK);
	}
}
