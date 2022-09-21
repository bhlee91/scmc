package com.scmc.api.info.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.info.service.TruckSpecService;
import com.scmc.api.jpa.domain.TbInfoTruckSpec;
import com.scmc.api.jpa.repository.TbInfoTruckSpecRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TruckSpecServiceImpl implements TruckSpecService {

	private final TbInfoTruckSpecRepository tbInfoTruckSpecRepository;
	
	@Override
	public List<TbInfoTruckSpec> searchTruckSpec() {
		
		return tbInfoTruckSpecRepository.findAllByOrderByIdAsc();
	}

}
