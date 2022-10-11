package com.scmc.api.jpa.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoRequest;

@Repository
public interface TbCargoRequestRepository extends JpaRepository<TbCargoRequest, Long> {
	
	TbCargoRequest findByReqId(Long reqId);
	List<TbCargoRequest> findWithTbCargoImageUsingFetchJoinByOwnerUidOrderByReqIdAsc(Long ownerUid);
	List<TbCargoRequest> findAllByOrderByReqIdAsc();
	
	// admin 용
	int countByStatus(String status);
	
	@Query(
			value = "SELECT t.* "
					+ "  FROM ( "
					+ "	SELECT "
					+ "		req.req_id as reqId"
					+ "		, req.cweight"
					+ "		, req.cheight"
					+ "		, req.cwidth"
					+ "		, req.cverticalreal"
					+ "		, req.depart_datetimes"
					+ "		, req.arrival_datetimes"
					+ "		, req.depart_addr_st"
					+ "		, req.depart_addr_st2"
					+ "		, req.arrival_addr_st"
					+ "		, req.arrival_addr_st2"
					+ "		, req.transit_fare"
					+ "		, req.additional_fare"
					+ "		, EARTH_DISTANCE(LL_TO_EARTH(:lat, :lon), LL_TO_EARTH(CAST(req.depart_latitude AS double precision), CAST(req.depart_longitude AS double precision))) * 0.001 AS distance "
					+ "	  FROM tb_cargo_request req"
					+ "	 WHERE req.depart_latitude != '' "
					+ "	   AND req.depart_longitude != '' "
					+ "  ) t "
					+ " WHERE t.distance < :rad"
					+ " ORDER BY t.distance ASC"
					+ " LIMIT 2" 
			, nativeQuery = true)
	List<Map<String, Object>> findByEarthDistance(@Param("lat") double lat, @Param("lon") double lon, @Param("rad") int rad);
}
