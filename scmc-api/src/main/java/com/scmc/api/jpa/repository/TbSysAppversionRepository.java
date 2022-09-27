package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbSysAppversion;

@Repository
public interface TbSysAppversionRepository extends JpaRepository<TbSysAppversion, Long>{

	List<TbSysAppversion> findAllByOrderByVerUidASC();
}
