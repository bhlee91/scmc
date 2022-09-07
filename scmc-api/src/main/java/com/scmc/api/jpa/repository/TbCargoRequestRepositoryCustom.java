package com.scmc.api.jpa.repository;

import java.util.List;

import com.scmc.api.jpa.domain.TbCargoRequest;

public interface TbCargoRequestRepositoryCustom {

	List<TbCargoRequest> customFindWithTbCargoImageUsingFetchJoinByOwnerUid(Long ownerUid);
}
