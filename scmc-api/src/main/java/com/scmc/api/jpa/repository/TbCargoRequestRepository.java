package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
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
	List<TbCargoRequest> findByOwnerUidAndStatusIn(Long ownerUid, List<String> status);
	
	// admin 용
	int countByStatus(String status);
	
	@Query(value = "SELECT t.* "
				+ "  FROM ( "
				+ "	SELECT "
				+ "		req.*"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.status) as statusName"
				+ "		, (SELECT owner_name FROM tb_member_cargoowner WHERE owner_uid = req.owner_uid) as cargoownerName"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.load_method) as loadMethodName"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.unload_method) as unloadMethodName"
				+ "		, EARTH_DISTANCE(LL_TO_EARTH(:lat, :lon), LL_TO_EARTH(CAST(req.depart_latitude AS double precision), CAST(req.depart_longitude AS double precision))) * 0.001 AS distance "
				+ "	  FROM tb_cargo_request req"
				+ "	 WHERE req.depart_latitude != '' "
				+ "	   AND req.depart_longitude != '' "
				+ "	   AND (req.status = 'MO' OR req.status = 'RO')"
				+ "  ) t "
				+ " WHERE t.distance < :rad"
				+ " ORDER BY t.distance ASC"
			, nativeQuery = true)
	List<TbCargoRequest> findByEarthDistanceByDistance(@Param("lat") double lat, @Param("lon") double lon, @Param("rad") int rad, Pageable page);
	@Query(value = "SELECT t.* "
				+ "  FROM ( "
				+ "	SELECT "
				+ "		req.*"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.status) as statusName"
				+ "		, (SELECT owner_name FROM tb_member_cargoowner WHERE owner_uid = req.owner_uid) as cargoownerName"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.load_method) as loadMethodName"
				+ "		, (SELECT code_name FROM tb_common_cd WHERE cdid = req.unload_method) as unloadMethodName"
				+ "		, EARTH_DISTANCE(LL_TO_EARTH(:lat, :lon), LL_TO_EARTH(CAST(req.depart_latitude AS double precision), CAST(req.depart_longitude AS double precision))) * 0.001 AS distance "
				+ "	  FROM tb_cargo_request req"
				+ "	 WHERE req.depart_latitude != '' "
				+ "	   AND req.depart_longitude != '' "
				+ "	   AND (req.status = 'MO' OR req.status = 'RO')"
				+ "  ) t "
				+ " WHERE t.distance < :rad"
				+ " ORDER BY t.req_id DESC"
			, nativeQuery = true)
	List<TbCargoRequest> findByEarthDistanceByReg(@Param("lat") double lat, @Param("lon") double lon, @Param("rad") int rad, Pageable page);
}
