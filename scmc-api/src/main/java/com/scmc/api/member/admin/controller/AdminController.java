package com.scmc.api.member.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.member.admin.dto.LogInDto;
import com.scmc.api.member.admin.dto.SignUpDto;
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
	
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> logIn(@RequestBody LogInDto dto) {
		log.info("==================");
		log.info("관리자 로그인 => " + dto.toString());
		log.info("==================");
		
		return new ResponseEntity<>(adminService.login(dto), HttpStatus.OK);
	}
	
	// 회원가입
	@PostMapping("/signup")
	public ResponseEntity<?> signIn(@RequestBody SignUpDto dto) {
		log.info("==================");
		log.info("관리자 회원가입 => " + dto.toString());
		log.info("==================");
		
		return new ResponseEntity<>(adminService.signup(dto), HttpStatus.OK);
	}
}
