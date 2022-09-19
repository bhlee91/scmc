package com.scmc.api.jpa.repository;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.scmc.api.jpa.domain.QTbCargoRequest;
import com.scmc.api.jpa.domain.TbCargoRequest;

@Service
public class TbCargoRequestRepositoryCustomImpl extends QuerydslRepositorySupport implements TbCargoRequestRepositoryCustom {

	public TbCargoRequestRepositoryCustomImpl() {
		super(TbCargoRequest.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<TbCargoRequest> dynamicByDepartDatetimesAndArrivalDatetimesAndPhoneNumberAndStatus(String departDate,
			String arrivalDate, String phoneNumber, String status) throws ParseException {
		
		QTbCargoRequest tbCargoRequest = QTbCargoRequest.tbCargoRequest;
		
		BooleanBuilder builder = new BooleanBuilder();
		
		if (!departDate.equals("")) {
			builder.and(tbCargoRequest.departDatetimes.goe(Expressions.dateTimeTemplate(Date.class, "to_timestamp({0}, 'YYYY-MM-DD 00:00:00')", departDate)));
		}
		
		if (!arrivalDate.equals("")) {
			arrivalDate = arrivalDate + " 23:59:59";
			builder.and(tbCargoRequest.arrivalDatetimes.loe(Expressions.dateTimeTemplate(Date.class, "to_timestamp({0}, 'YYYY-MM-DD HH24:MI:SS')", arrivalDate)));
		}

		if (!phoneNumber.equals("")) {
			builder.and(tbCargoRequest.receiverPhone.eq(phoneNumber));
		}

		if (!status.equals("") && !status.equals("all")) {
			builder.and(tbCargoRequest.status.eq(status));
		}
		
		return from(tbCargoRequest)
				.where(builder)
				.orderBy(tbCargoRequest.reqId.asc())
				.fetch();
	}
}
