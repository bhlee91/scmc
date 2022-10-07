package com.scmc.api.jpa.repository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.jpa.domain.QTbMemberTruckOwner;
import com.scmc.api.jpa.domain.QTbTruckOwnerCargoInfo;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class TbTruckOwnerCargoInfoRepositoryImpl implements TbTruckOwnerCargoInfoRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public Map<String, Object> dynamicByTruckOwnerMainInfo(long truckownerUid) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		QTbMemberTruckOwner qOwner = QTbMemberTruckOwner.tbMemberTruckOwner;
		BooleanBuilder qOwnerBuilder = new BooleanBuilder();
		
		qOwnerBuilder.and(qOwner.truckownerUid.eq(truckownerUid));
		
		Tuple tuple = queryFactory
						.select(
								qOwner.truckownerUid
								, qOwner.carNumber
						)
						.from(qOwner)
						.where(qOwnerBuilder)
						.fetchOne();
		
		HashMap<String, Object> owner = new HashMap<String, Object>();
		owner.put("truckownerUid", tuple.get(qOwner.truckownerUid));
		owner.put("carNumber", tuple.get(qOwner.carNumber));
		
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
