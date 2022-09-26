package com.scmc.api.info.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	@ApiOperation(value = "적재함 정보 조회", notes = "적재함 정보 조회한다.")
	@GetMapping("/product")
	public ResponseEntity<?> searchProductsInfo() throws Exception {
		log.info("========================");
		log.info("이용료 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchProductInfo(), HttpStatus.OK);
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboardInfo() {
		log.info("========================");
		log.info("관리자 페이지 대시보드 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.getDashboardInfo(), HttpStatus.OK);
	}
}
