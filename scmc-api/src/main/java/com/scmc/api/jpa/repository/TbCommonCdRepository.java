package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCommonCd;

@Repository
public interface TbCommonCdRepository extends JpaRepository<TbCommonCd, String> {
	
	/*
	 * jpa 기본 메소드
	 * save()	: 레코드 저장(insert, update)
	 * findOne(): primary key로 한 row 찾기
	 * findAll(): 전체 data 찾기, 정렬(Sort)과 페이징 처리(pageable) 가능
	 * count()	: row 개수
	 * delete()	: row 삭제
	 */
	
	List<TbCommonCd> findAllByOrderByCodeTypeAscSortOrderAsc();
	List<TbCommonCd> findByCodeTypeOrderBySortOrderAsc(String codeType);
	TbCommonCd findByCdid(String cdid);
}
