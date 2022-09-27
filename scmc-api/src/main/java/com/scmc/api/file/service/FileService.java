package com.scmc.api.file.service;

import java.util.Map;

import com.scmc.api.jpa.domain.TbSysAttachfile;

public interface FileService {

	int saveAttachFile(Map<String, Object> params) throws Exception;
	
	TbSysAttachfile getFile(int truckownerUid);
}
