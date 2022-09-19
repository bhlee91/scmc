package com.scmc.api.jpa.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.scmc.api.jpa.domain.QTbCargoRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRepositoryCustomImpl implements AdminRepositoryCustom {

	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	
	@Autowired
	EntityManager em;
	
	@Override
	public HashMap<String, Object> getDashboardInfo() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		int tf_count = tbCargoRequestRepository.countByStatus("TF");
		
		JPAQueryFactory queryFactory = new JPAQueryFactory(em);
		QTbCargoRequest tbCargoRequest = QTbCargoRequest.tbCargoRequest;  
		
		StringTemplate template = Expressions.stringTemplate("to_char({0}, 'YYYY-MM')", tbCargoRequest.regDt);
		
		List<Tuple> countByMonth = queryFactory
									.select(
										template.as("month")
										, tbCargoRequest.count().as("month_count")
									)
									.from(tbCargoRequest)
									.groupBy(template)
									.orderBy(template.asc())
									.fetch();
		
		List<HashMap<String, Object>> cbm_list = new ArrayList<HashMap<String, Object>>();
		HashMap<String, Object> cbm;
		
		for (Tuple row : countByMonth) {
			cbm = new HashMap<String, Object>();
			cbm.put(row.get(0, String.class), row.get(1, Integer.class));
			
			cbm_list.add(cbm);
		}
		
		result.put("tf_count", tf_count);
		result.put("truckowner_count", tbMemberTruckOwnerRepository.count());
		result.put("request_count", tbCargoRequestRepository.count());
		result.put("count_by_month", cbm_list);
		
		return result;
	}
}
