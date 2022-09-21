package com.scmc.api.jpa.repository;

import java.text.ParseException;
import java.util.List;

import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.dto.MatchingDto;

public interface TbCargoRequestRepositoryCustom {

	List<TbCargoRequest> dynamicByDepartDatetimesAndArrivalDatetimesAndPhoneNumberAndStatus(String departDate, String arrivalDate, String phoneNumber, String status) throws ParseException;
	List<MatchingDto> dynamicByMatching(String departDate, String arrivalDate, String phoneNumber, String cargoName, String status) throws ParseException;
}