package com.scmc.api.info.service;

import java.util.List;

import com.scmc.api.jpa.domain.TbInfoTruckSpec;

public interface TruckSpecService {

	List<TbInfoTruckSpec> searchTruckSpec();
}
