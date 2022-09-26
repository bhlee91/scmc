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
public class DashBoardRepositoryCustomImpl implements DashBoardRepositoryCustom {

	private final TbCargoRequestRepository tbCargoRequestRepository;
	private final TbMemberTruckOwnerRepository tbMemberTruckOwnerRepository;
	private final TbFareTempRepository tbFareTempRepository;
	private final TbFareTemp2Repository tbFareTemp2Repository;
	
	@Autowired
	EntityManager em;
	
	@Override
	public HashMap<String, Object> getDashboardInfo() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
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
		
		String temp_query1 = "select m.count "
						  + "  from ("
						  + "	 select t.month, count(t.month)"
						  + "	   from ("
						  + "		 select substring(input_date, 1 ,7) as month"
						  + "		   from tb_fare_temp2"
						  + "	   ) t"
						  + "     group by t.month"
						  + "     order by t.month"
						  + "  ) m"
						  + " where m.month like concat('2021', '%')";

		List<?> list_temp_query1 = em.createNativeQuery(temp_query1).getResultList();
		
		String temp_query2 = "select m.count "
						  + "  from ("
						  + "	 select t.month, count(t.month)"
						  + "	   from ("
						  + "		 select substring(input_date, 1 ,7) as month"
						  + "		   from tb_fare_temp"
						  + "	   ) t"
						  + "     group by t.month"
						  + "     order by t.month"
						  + "  ) m"
						  + " where m.month like concat('2021', '%')";
		
		List<?> list_temp_query2 = em.createNativeQuery(temp_query2).getResultList();
		

		
//		result.put("tf_count", tbCargoRequestRepository.countByStatus("TF"));
//		result.put("truckowner_count", tbMemberTruckOwnerRepository.count());
//		result.put("request_count", tbCargoRequestRepository.count());
		result.put("tf_count", tbFareTempRepository.count());
		result.put("truckowner_count", tbMemberTruckOwnerRepository.count());
		result.put("request_count", tbFareTemp2Repository.count());
		result.put("count_by_month", cbm_list);
		result.put("temp_request", list_temp_query1);
		result.put("temp_complete", list_temp_query2);
		
		return result;
	}
}
