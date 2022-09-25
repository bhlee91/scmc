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
//			tbsa.setAttachId(params.get("attachId") == null ? 1L : Long.parseLong(String.valueOf(params.get("attachId"))));
//			tbsa.setFileName(params.get("fileName").toString());
//			tbsa.setFilePath(params.get("filePath").toString());
//			tbsa.setFileSize(Integer.parseInt(params.get("fileSize").toString()));
//			tbsa.setOriginFileName(params.get("originFileName").toString());
//			tbsa.setRegDt(format.parse(params.get("status").toString()));
//			tbsa.setStatus(params.get("status").toString());
//			tbsa.setTruckownerUid(Integer.parseInt(params.get("truckownerUid").toString()));
			tbSysAttachfileRepository.save(tbsa);
			System.out.println("impl:" + params.toString());
			
			
			return 1;	
		} catch(Exception e) {
			System.out.println(e.getMessage());
			
			return 0;
		}
		
	}


}
