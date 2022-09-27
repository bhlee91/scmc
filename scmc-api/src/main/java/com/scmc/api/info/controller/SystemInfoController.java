package com.scmc.api.info.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.info.dto.ProductInfoDto;
import com.scmc.api.info.service.SystemInfoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "시스템관리")
@RestController
@RequestMapping("/info")
@RequiredArgsConstructor
@Slf4j
public class SystemInfoController {
	
	private final SystemInfoService systemInfoService;

	@ApiOperation(value = "적재함 정보 조회", notes = "적재함 정보 조회한다.")
	@GetMapping("/truck/spec")
	public ResponseEntity<?> searchTruckSpecInfo() throws Exception {
		log.info("========================");
		log.info("적재함 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchTruckSpec(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "이용료 조회", notes = "이용료의 정보가 조회한다.")
	@GetMapping("/product")
	public ResponseEntity<?> searchProductsInfo() throws Exception {
		log.info("========================");
		log.info("이용료 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchProductInfo(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "이용료 정보 저장", notes = "이용료의 정보를 저장한다.")
	@PostMapping("/product")
	public ResponseEntity<?> saveProductInfo(@RequestBody ProductInfoDto dto) throws Exception {
		log.info("========================");
		log.info("이용료 저장 => " + dto.toString());
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.saveProductInfo(dto), HttpStatus.OK);
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboardInfo() {
		log.info("========================");
		log.info("관리자 페이지 대시보드 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.getDashboardInfo(), HttpStatus.OK);
	}
}
