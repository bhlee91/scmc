package com.scmc.api.code.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.code.service.CommonCodeService;
import com.scmc.api.jpa.domain.TbCommonCd;
import com.scmc.api.jpa.domain.TbCommonCdByCodeType;
import com.scmc.api.jpa.repository.TbCommonCdByCodeTypeRepository;
import com.scmc.api.jpa.repository.TbCommonCdRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommonCodeServiceImpl implements CommonCodeService {

	private final TbCommonCdRepository tbCommonCdRepository;
	private final TbCommonCdByCodeTypeRepository tbCommonCdByCodeTypeRepository;
	
	@Override
	public List<TbCommonCd> selectCommonCode() {
		
		return tbCommonCdRepository.findAllByOrderByCodeTypeAscSortOrderAsc();
	}

	@Override
	public List<TbCommonCd> selectCommonCodeByCodeType(String codeType) {
		
		return tbCommonCdRepository.findByCodeTypeOrderBySortOrderAsc(codeType);
	}

	@Override
	public HashMap<String, Object> selectCommonCodeByRequestItem() {
		List<String> items = new ArrayList<String>();
		items.add("RFOFZ");	// 냉동/냉장 여부
		items.add("REQIT");	// 요청사항
		items.add("CTYPE"); // 차량종류
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		for (String item : items) {
			HashMap<String, Object> obj = new HashMap<String, Object>();
			
			TbCommonCdByCodeType code_type = tbCommonCdByCodeTypeRepository.findDistinctByCodeType(item);
			List<TbCommonCd> list = tbCommonCdRepository.findByCodeTypeOrderBySortOrderAsc(item);
			
			obj.put("code_type", code_type.getCodeType());
			obj.put("code_typename", code_type.getCodeTypeName());
			obj.put("codes", list);
			
			result.put(item, obj);
		}
		
		return result;
	}
}
