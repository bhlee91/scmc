package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoHist;

@Repository
public interface TbCargoHistRepository extends JpaRepository<TbCargoHist, String>{

}
