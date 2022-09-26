package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbFareTemp;

@Repository
public interface TbFareTempRepository extends JpaRepository<TbFareTemp, String> {

}
