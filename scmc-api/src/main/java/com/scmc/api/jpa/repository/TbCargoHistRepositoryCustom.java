package com.scmc.api.jpa.repository;

import java.util.List;

import com.scmc.api.member.truck.dto.HistoryDto;

public interface TbCargoHistRepositoryCustom {

	List<HistoryDto> dynamicBytruckownerUidAndStatusNotIn(Long truckownerUid, List<String> statusList); 
}
