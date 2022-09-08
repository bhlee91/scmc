package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCommonTerms;

@Repository
public interface TbCommonTermsRepository extends JpaRepository<TbCommonTerms, String> {

	List<TbCommonTerms> findByUseYnOrderByTermsTypeAsc(String useYn);
	List<TbCommonTerms> findByTermsTypeAndExpDivAndUseYnOrderByVersionsDesc(String termsType, String expDiv, String useYn);
}
