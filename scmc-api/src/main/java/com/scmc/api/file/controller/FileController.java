package com.scmc.api.file.controller;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.scmc.api.file.service.FileService;
import com.scmc.api.jpa.domain.TbSysAttachfile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileController {

	private final FileService fileService;
	
	@PostMapping("/uploadFile")
	public ResponseEntity<?> uploadFiles(MultipartFile multipartFile, String fName){
		
		String UPLOAD_PATH = "C:\\Users\\ZnOSoftD02\\Desktop\\test";
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		
		try {

			MultipartFile file = multipartFile;
			
			
			String fileName = String.valueOf(fName);
			String originName = file.getOriginalFilename();
			String fileExt = originName.substring(originName.lastIndexOf(".")+1);
			originName = originName.substring(0, originName.lastIndexOf("."));
			long fileSize = file.getSize();
			
			File fileSave = new File(UPLOAD_PATH, fileName + "." + fileExt);
			if(!fileSave.exists()) {
				fileSave.mkdirs();
			}
		
			file.transferTo(fileSave);

			map.put("fileName", fName);
			map.put("originFileName", originName);
			map.put("filePath", UPLOAD_PATH);
			map.put("fileSize", fileSize);
			map.put("status", "Y");  
			map.put("regDt", LocalDateTime.now().format(format) );
			map.put("truckownerUid", Integer.parseInt(fName));
			
			
			fileService.saveAttachFile(map);
		} catch (Exception e) {
			log.info(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	

}

