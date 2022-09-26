package com.scmc.api.info.service;

import java.util.HashMap;
import java.util.List;

import com.scmc.api.jpa.domain.TbInfoProduct;
import com.scmc.api.jpa.domain.TbInfoTruckSpec;

public interface SystemInfoService {

	List<TbInfoTruckSpec> searchTruckSpec();
	List<TbInfoProduct> searchProductInfo();
	HashMap<String, Object> getDashboardInfo();
}
