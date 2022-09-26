package com.scmc.api.statistics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "통계")
@RestController
@RequestMapping("/stat")
@RequiredArgsConstructor
@Slf4j
public class StatisticsController {
	
	@ApiOperation(value = "상품별 통계", notes = "상품별 건수, 금액을 조회한다.")
	@GetMapping("/product")
	public ResponseEntity<?> statsAmountAndPriceByProduct() throws Exception {
		log.info("========================");
		log.info("상품별 건수, 금액 조회");
		log.info("========================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "날짜별 가입 통계", notes = "날짜별 가입 건수를 조회한다.")
	@GetMapping("/date")
	public ResponseEntity<?> statsSignAmountByDate() throws Exception {
		log.info("========================");
		log.info("날짜별 건수 조회");
		log.info("========================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
