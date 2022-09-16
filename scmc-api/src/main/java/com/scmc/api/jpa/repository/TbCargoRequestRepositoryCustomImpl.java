package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbCargoRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TbCargoRequestRepositoryCustomImpl implements TbCargoRequestRepositoryCustom {
	
	private final TbCargoRequestRepository tbCargoRequestRepository;
	
	@Override
	public List<TbCargoRequest> dynamicFindWithTbCargoImageUsingFetchJoinByOwnerUidOrderByReqIdAsc(Long ownerUid) {
		
		List<TbCargoRequest> result = tbCargoRequestRepository.findWithTbCargoImageUsingFetchJoinByOwnerUidOrderByReqIdAsc(ownerUid);

		return result;
	}
}
