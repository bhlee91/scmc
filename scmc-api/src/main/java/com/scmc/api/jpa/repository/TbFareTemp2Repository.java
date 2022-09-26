package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbFareTemp2;

@Repository
public interface TbFareTemp2Repository extends JpaRepository<TbFareTemp2, Long> {

}
