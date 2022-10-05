package com.scmc.api.jpa.repository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.jpa.domain.QTbTruckOwnerCargoInfo;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class TbTruckOwnerCargoInfoRepositoryImpl implements TbTruckOwnerCargoInfoRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;

	@Override
	public Map<String, Object> dynamicByTruckOwnerMainInfo(long truckownerUid) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		TbMemberTruckOwner owner = tbMemberTruckOwnerRepository.findByTruckownerUid(truckownerUid);
		
		QTbTruckOwnerCargoInfo qInfo = QTbTruckOwnerCargoInfo.tbTruckOwnerCargoInfo;
		BooleanBuilder qInfoBuilder = new BooleanBuilder();
		
		qInfoBuilder.and(qInfo.truckownerUid.eq(truckownerUid));
		qInfoBuilder.and(qInfo.cancelyn.eq("N"));
		qInfoBuilder.and(qInfo.loadDt.loe(new Date()));
		qInfoBuilder.and(qInfo.unloadDt.goe(new Date()));
		
		TbTruckOwnerCargoInfo info = queryFactory
										.selectFrom(qInfo)
										.where(qInfoBuilder)
										.fetchOne();
		
		result.put("owner", owner);
		result.put("info", info);
		
		return result;
	}
}
