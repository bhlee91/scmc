package com.scmc.api.jpa.repository;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.common.utils.CommonUtil;
import com.scmc.api.jpa.domain.QTbCargoImage;
import com.scmc.api.jpa.domain.QTbCargoRequest;
import com.scmc.api.jpa.domain.QTbCommonCd;
import com.scmc.api.jpa.domain.QTbMemberCargoOwner;
import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.dto.MatchingDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class TbCargoRequestRepositoryImpl implements TbCargoRequestRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<TbCargoRequest> dynamicByDepartDatetimesAndArrivalDatetimesAndPhoneNumberAndStatus(String departDate,
			String arrivalDate, String phoneNumber, String status) throws ParseException {
		
		QTbCargoRequest request = QTbCargoRequest.tbCargoRequest;
		
		BooleanBuilder builder = new BooleanBuilder();
		
		if (!CommonUtil.isStringEmpty(departDate)) {
			builder.and(request.departDatetimes.goe(Expressions.dateTimeTemplate(Date.class, "TO_TIMESTAMP({0}, 'YYYY-MM-DD 00:00:00')", departDate)));
		}
		
		if (!CommonUtil.isStringEmpty(arrivalDate)) {
			arrivalDate = arrivalDate + " 23:59:59";
			builder.and(request.arrivalDatetimes.loe(Expressions.dateTimeTemplate(Date.class, "TO_TIMESTAMP({0}, 'YYYY-MM-DD HH24:MI:SS')", arrivalDate)));
		}

		if (!CommonUtil.isStringEmpty(phoneNumber)) {
			builder.and(request.receiverPhone.eq(phoneNumber));
		}

		if (!CommonUtil.isStringEmpty(status) && !status.equals("all")) {
			builder.and(request.status.eq(status));
		}
		
		return queryFactory
				.selectFrom(request)
				.where(builder)
				.orderBy(request.reqId.asc())
				.fetch();
	}

	@Override
	public List<MatchingDto> dynamicByMatching(String departDate, String arrivalDate, String phoneNumber,
			String cargoName, String status) throws ParseException {
		
		QTbCargoRequest request = QTbCargoRequest.tbCargoRequest;
		QTbMemberCargoOwner cargoOwner = QTbMemberCargoOwner.tbMemberCargoOwner;
		QTbCommonCd common = QTbCommonCd.tbCommonCd;
		QTbCargoImage images = QTbCargoImage.tbCargoImage; 
		
		BooleanBuilder builder = new BooleanBuilder();
		
		if (!CommonUtil.isStringEmpty(departDate)) {
			builder.and(request.departDatetimes.goe(Expressions.dateTimeTemplate(Date.class, "TO_TIMESTAMP({0}, 'YYYY-MM-DD 00:00:00')", departDate)));
		}
		
		if (!CommonUtil.isStringEmpty(arrivalDate)) {
			arrivalDate = arrivalDate + " 23:59:59";
			builder.and(request.arrivalDatetimes.loe(Expressions.dateTimeTemplate(Date.class, "TO_TIMESTAMP({0}, 'YYYY-MM-DD HH24:MI:SS')", arrivalDate)));
		}

		if (!CommonUtil.isStringEmpty(phoneNumber)) {
			builder.and(request.receiverPhone.eq(phoneNumber));
		}
		
		if (!CommonUtil.isStringEmpty(cargoName)) {
			builder.and(request.cargoName.contains(Expressions.stringTemplate("REGEXP_REPLACE({0}, '\s', '', 'g')", cargoName)));
		}

		if (!CommonUtil.isStringEmpty(status) && !status.equals("all")) {
			builder.and(request.status.eq(status));
		}
		
		Map<TbCargoRequest, List<TbCargoImage>> resultMap = queryFactory
										.select(
												Projections.fields(
													MatchingDto.class,
													request.reqId, 
													request.ownerUid, 
													Expressions.as(
															JPAExpressions
																.select(cargoOwner.ownerName)
																.from(cargoOwner)
																.where(cargoOwner.ownerUid.eq(request.ownerUid))
															, "cargoownerName"),
													request.cargoName,
													request.truckUid,
													request.cweight,
													request.cheight,
													request.cwidth,
													request.cverticalreal,
													request.departDatetimes,
													request.arrivalDatetimes,
													request.departAddrSt,
													request.arrivalAddrSt,
													request.receiverPhone,
													request.departLatitude,
													request.departLongitude,
													request.arrivalLatitude,
													request.arrivalLongitude,
													request.loadMethod,
													request.unloadMethod,
													request.requestItems,
													request.transitFare,
													request.additionalFare,
													request.reqComyn,
													request.status,
													Expressions.as(
															JPAExpressions
																.select(common.codeName)
																.from(common)
																.where(common.cdid.eq(request.status))
															, "statusName")
												)
										)
										.from(request)
										.leftJoin(request.images, images).fetchJoin()
										.where(builder)
										.orderBy(request.reqId.asc())
										.transform(GroupBy.groupBy(request).as(GroupBy.list(images)));
		
		return resultMap.entrySet().stream()
				.map(entry -> new MatchingDto(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
		
//		List<MatchingDto> result = queryFactory
//									.select(Projections.fields(
//												MatchingDto.class,
//												request.reqId, 
//												request.ownerUid, 
//												Expressions.as(
//														JPAExpressions
//															.select(cargoOwner.ownerName)
//															.from(cargoOwner)
//															.where(cargoOwner.ownerUid.eq(request.ownerUid))
//														, "cargoownerName"),
//												request.cargoName,
//												request.truckUid,
//												request.cweight,
//												request.cheight,
//												request.cwidth,
//												request.cverticalreal,
//												request.departDatetimes,
//												request.arrivalDatetimes,
//												request.departAddrSt,
//												request.arrivalAddrSt,
//												request.receiverPhone,
//												request.departLatitude,
//												request.departLongitude,
//												request.arrivalLatitude,
//												request.arrivalLongitude,
//												request.loadMethod,
//												request.unloadMethod,
//												request.requestItems,
//												request.transitFare,
//												request.additionalFare,
//												request.reqComyn,
//												request.status,
//												Expressions.as(
//														JPAExpressions
//															.select(common.codeName)
//															.from(common)
//															.where(common.cdid.eq(request.status))
//														, "statusName")
//											))
//									.from(request)
//									.where(builder)
//									.orderBy(request.reqId.asc())
//									.fetch();
		
	}
}
