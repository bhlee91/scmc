package com.scmc.api.file.service.impl;

import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import com.scmc.api.file.service.FileService;
import com.scmc.api.jpa.domain.TbSysAttachfile;
import com.scmc.api.jpa.repository.TbSysAttachfileRepository;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class FileServiceImpl implements FileService{
	
	private final TbSysAttachfileRepository tbSysAttachfileRepository;
	
	@PersistenceContext
	EntityManager em;

	@Override
	@Transactional
	public int saveAttachFile(Map<String, Object> params) throws Exception{
		TbSysAttachfile tbsa = tbSysAttachfileRepository.findByTruckownerUid(Integer.parseInt(params.get("truckownerUid").toString()));
		try {
			if(tbsa == null) {
				tbsa = new TbSysAttachfile(params);
				
				tbSysAttachfileRepository.save(tbsa);
			}
			else {
				
				em.merge(tbsa);
			}
			return 1;	
		} catch(Exception e) {
			System.out.println(e.getMessage());
			
			return 0;
		}
		
	}

	@Override
	public TbSysAttachfile getFile(int truckownerUid) {
		TbSysAttachfile tbsa = tbSysAttachfileRepository.findByTruckownerUid(truckownerUid);
		return tbsa;
	}


}
