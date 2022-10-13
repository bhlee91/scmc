package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.jpa.domain.QTbCargoHist;
import com.scmc.api.member.truck.dto.HistoryDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class TbCargoHistRepositoryImpl implements TbCargoHistRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	
	@Override
	public List<HistoryDto> dynamicBytruckownerUidAndStatusNotIn(Long truckownerUid, List<String> statusList) {
		
		QTbCargoHist history = QTbCargoHist.tbCargoHist;
		
		List<HistoryDto> resultList = queryFactory
											.select(
													Projections.constructor(
															HistoryDto.class, 
															history.histUid,
															history.request,
															history.status))
											.from(history)
											.where(
													history.truckowner.truckownerUid.eq(truckownerUid),
													history.status.notIn(statusList)
													)
											.fetch();
		
		return resultList;
	}

}
