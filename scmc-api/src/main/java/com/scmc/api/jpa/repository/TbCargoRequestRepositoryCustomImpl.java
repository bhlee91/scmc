package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbCargoImage;
import com.scmc.api.jpa.domain.TbCargoRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TbCargoRequestRepositoryCustomImpl implements TbCargoRequestRepositoryCustom {
	
	private final TbCargoRequestRepository tbCargoRequestRepository;
	
	@Override
	public List<TbCargoRequest> customFindWithTbCargoImageUsingFetchJoinByOwnerUid(Long ownerUid) {
		
		List<TbCargoRequest> result = tbCargoRequestRepository.findWithTbCargoImageUsingFetchJoinByOwnerUid(ownerUid);
		
		for (TbCargoRequest obj : result) {
			for (TbCargoImage images : obj.getImages()) {
				images.setContents(new String(images.getImageContents()));
			}
		}
		
		return result;
	}
}
