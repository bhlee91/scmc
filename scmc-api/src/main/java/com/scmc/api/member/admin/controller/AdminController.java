package com.scmc.api.member.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.member.admin.service.AdminService;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "관리자용")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

	private final AdminService adminService;
	
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboardInfo() {
		log.info("========================");
		log.info("관리자 페이지 대시보드 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(adminService.getDashboardInfo(), HttpStatus.OK);
	}
}
