package com.scmc.api.banner.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.banner.service.BannerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "배너관리")
@RestController
@RequestMapping("/banner")
@RequiredArgsConstructor
@Slf4j
public class BannerController {

	
	private final BannerService bannerService;
	
	 @ApiOperation(value = "배너 전체 조회", notes = "배너를 조회한다.")
	@GetMapping({"/list/{useyn}"})
	public ResponseEntity<?> selectBannerList(
			@ApiParam(value = "사용여부", example = "Y") @PathVariable(value = "bannerUseyn") String bannerUseyn
			) throws Exception {
		log.info("========================");
		log.info("배너 리스트 조회");
		log.info("========================");
		
		return new ResponseEntity<>(bannerService.selectBannerByUseyn(bannerUseyn), HttpStatus.OK);
	}
	
	@ApiOperation(value = "배너 등록/수정", notes = "배너를 등록/수정 한다.")
	@PostMapping("/insert")
	public ResponseEntity<?> createBanner(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("========================");
		log.info("배너 등록/수정");
		log.info("========================");
	
		return new ResponseEntity<>(bannerService.insertAndUpdateBanner(param), HttpStatus.OK);
	}
	
}
