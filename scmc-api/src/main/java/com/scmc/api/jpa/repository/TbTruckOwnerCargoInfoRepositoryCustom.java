package com.scmc.api.jpa.repository;

import java.util.Map;

public interface TbTruckOwnerCargoInfoRepositoryCustom {

	Map<String, Object> dynamicByTruckOwnerMainInfo(long truckownerUid);
}
