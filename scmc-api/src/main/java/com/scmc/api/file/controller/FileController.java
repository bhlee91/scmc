package com.scmc.api.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.aspectj.util.FileUtil;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
		
		String UPLOAD_PATH = "C:\\uploads\\";
		
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
			map.put("filePath", UPLOAD_PATH + fName + "." + fileExt);
			map.put("fileSize", fileSize);
			map.put("status", "Y");  
			map.put("regDt", LocalDateTime.now().format(format) );
			map.put("truckownerUid", Integer.parseInt(fName));
			map.put("fileExt", fileExt);
			
			
			fileService.saveAttachFile(map);
		} catch (Exception e) {
			log.info(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	
	@GetMapping("/downloadFile")
	@CrossOrigin(value= {"*"}, exposedHeaders = {"Content-Disposition"})
	public ResponseEntity<Resource> downloadFile(@RequestParam("truckownerUid") int truckownerUid) throws Exception {
		System.out.println("1");
		TbSysAttachfile file =  fileService.getFile(truckownerUid);
		String fileExt = file.getFileExt();
		String originFileName = file.getOriginFileName();
		File downloadFile = new File(file.getFilePath());
		HttpHeaders header = new HttpHeaders();

		header.add(HttpHeaders.CONTENT_DISPOSITION, URLEncoder.encode(originFileName+"."+fileExt, "UTF-8"));
		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires", "0");
		
		Path path = Paths.get(downloadFile.getAbsolutePath());
		
		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
		
		System.out.println("2");
		return ResponseEntity.ok()
				.headers(header)
				.contentLength(downloadFile.length())
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.body(resource);
	}
}

