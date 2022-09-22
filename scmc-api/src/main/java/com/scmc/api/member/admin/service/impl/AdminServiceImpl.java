package com.scmc.api.member.admin.service.impl;

import java.util.HashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbSysAdminUser;
import com.scmc.api.jpa.repository.TbSysAdminUserRepository;
import com.scmc.api.member.admin.dto.LogInDto;
import com.scmc.api.member.admin.dto.SignUpDto;
import com.scmc.api.member.admin.service.AdminService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {
	
	private final TbSysAdminUserRepository tbSysAdminUserRepository;
	private final PasswordEncoder passwordEncoder;

	// 로그인
	@Override
	public HashMap<String, Object> login(LogInDto dto) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		TbSysAdminUser user = null;
		
		try {
			user = tbSysAdminUserRepository.findByEmail(dto.getEmail());
			
			if (user == null) {
				result.put("msg", "이메일 또는 비밀번호를 확인해주세요.");
				result.put("data", dto.getEmail());
				
				return result;
			}
			
			log.info("user => " + user.toString());
			
			if (passwordEncoder.matches(dto.getPassword(), user.getPasswd())) {
				user.successLogin();
				tbSysAdminUserRepository.save(user);
				
				result.put("msg", "로그인되었습니다.");
				result.put("data", user);
			} else {
				user.addPasswdFailCnt(user.getPasswdFailCnt() + 1);
				
				tbSysAdminUserRepository.save(user);
				
				result.put("msg", "이메일 또는 비밀번호를 확인해주세요.");
				result.put("data", dto.getPassword());
			}
			
			return result;
		} catch(Exception e) {
			e.printStackTrace();
			result.put("msg", "이메일 또는 비밀번호를 확인해주세요.");
			result.put("data", user);
			
			return result;
		}
	}

	@Override
	public HashMap<String, Object> signup(SignUpDto dto) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		if (tbSysAdminUserRepository.existsByEmail(dto.getEmail())) {
			result.put("msg", "이미 등록된 이메일입니다.");
			result.put("data", null);
			
			return result;
		}
		
		TbSysAdminUser user = TbSysAdminUser.signupBuilder()
									.email(dto.getEmail())
									.passwd(passwordEncoder.encode(dto.getPassword()))
									.passwdFailCnt(0)
									.build();
		
		TbSysAdminUser signUpUser = tbSysAdminUserRepository.save(user);
		
		result.put("msg", "관리자 회원가입이 완료되었습니다.");
		result.put("data", signUpUser);
		
		return result;
	}
}
