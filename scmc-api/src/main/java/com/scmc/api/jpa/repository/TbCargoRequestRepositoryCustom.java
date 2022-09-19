package com.scmc.api.jpa.repository;

import java.text.ParseException;
import java.util.List;

import com.scmc.api.jpa.domain.TbCargoRequest;

public interface TbCargoRequestRepositoryCustom {

	List<TbCargoRequest> dynamicByDepartDatetimesAndArrivalDatetimesAndPhoneNumberAndStatus(String departDate, String arrivalDate, String phoneNumber, String status) throws ParseException;
}
