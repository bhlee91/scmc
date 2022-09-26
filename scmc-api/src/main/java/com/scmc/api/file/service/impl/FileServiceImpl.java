package com.scmc.api.file.service.impl;

import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;
import com.scmc.api.file.service.FileService;
import com.scmc.api.jpa.domain.TbSysAttachfile;
import com.scmc.api.jpa.repository.TbSysAttachfileRepository;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class FileServiceImpl implements FileService{
	
	private final TbSysAttachfileRepository tbSysAttachfileRepository;
	
	EntityManager em;

	@Override
	public int saveAttachFile(Map<String, Object> params) throws Exception{
		TbSysAttachfile tbsa = null;
		
		try {
			tbsa = new TbSysAttachfile(params);
			tbSysAttachfileRepository.save(tbsa);
			
			return 1;	
		} catch(Exception e) {
			System.out.println(e.getMessage());
			
			return 0;
		}
		
	}


}
