package com.scmc.api.code.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.code.service.CommonCodeService;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "공통코드")
@RestController
@RequestMapping("/common")
@RequiredArgsConstructor
@Slf4j
public class CommonCodeController {
	
	private final CommonCodeService commonCodeService;

	@GetMapping("/code")
	public ResponseEntity<?> selectCommonCode() throws Exception {
		log.info("common code select test");
		return new ResponseEntity<>(commonCodeService.selectCommonCode(), HttpStatus.OK);
	}
}
