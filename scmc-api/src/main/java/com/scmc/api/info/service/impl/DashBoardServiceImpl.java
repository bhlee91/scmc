package com.scmc.api.info.service.impl;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.scmc.api.info.service.DashBoardService;
import com.scmc.api.jpa.repository.DashBoardRepositoryCustomImpl;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService {

	private final DashBoardRepositoryCustomImpl dashBoardRepositoryImpl;
	
	@Override
	public HashMap<String, Object> getDashboardInfo() {
		return dashBoardRepositoryImpl.getDashboardInfo();
	}
}
