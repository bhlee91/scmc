package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoImage;

@Repository
public interface TbCargoImageRepository extends JpaRepository<TbCargoImage, Long>{
	
	List<TbCargoImage> findAllByTbCargoRequestOrderByImageSeqAsc(Long reqId);
}
