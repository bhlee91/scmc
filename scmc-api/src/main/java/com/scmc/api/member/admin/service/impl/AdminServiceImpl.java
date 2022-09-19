package com.scmc.api.member.admin.service.impl;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.repository.AdminRepositoryCustomImpl;
import com.scmc.api.member.admin.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminRepositoryCustomImpl adminRepositoryImpl;

	@Override
	public HashMap<String, Object> getDashboardInfo() {
		return adminRepositoryImpl.getDashboardInfo();
	}
}
