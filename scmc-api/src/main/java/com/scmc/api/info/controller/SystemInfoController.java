package com.scmc.api.info.controller;

import java.io.File;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.scmc.api.customer.dto.TermsDto;
import com.scmc.api.info.dto.ProductInfoDto;
import com.scmc.api.info.service.SystemInfoService;
import com.scmc.api.jpa.domain.TbSysAppversion;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "시스템관리")
@RestController
@RequestMapping("/info")
@RequiredArgsConstructor
@Slf4j
public class SystemInfoController {
	
	private final SystemInfoService systemInfoService;

	@ApiOperation(value = "적재함 정보 조회", notes = "적재함 정보 조회한다.")
	@GetMapping("/truck/spec")
	public ResponseEntity<?> searchTruckSpecInfo() throws Exception {
		log.info("========================");
		log.info("적재함 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchTruckSpec(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "이용료 조회", notes = "이용료의 정보가 조회한다.")
	@GetMapping("/product")
	public ResponseEntity<?> searchProductsInfo() throws Exception {
		log.info("========================");
		log.info("이용료 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchProductInfo(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "이용료 정보 저장", notes = "이용료의 정보를 저장한다.")
	@PostMapping("/product")
	public ResponseEntity<?> saveProductInfo(@RequestBody ProductInfoDto dto) throws Exception {
		log.info("========================");
		log.info("이용료 저장 => " + dto.toString());
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.saveProductInfo(dto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "대시보드 정보 조회", notes = "대시보드 정보를 조회한다.")
	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboardInfo() {
		log.info("========================");
		log.info("관리자 페이지 대시보드 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.getDashboardInfo(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "대시보드 정보 조회", notes = "대시보드 정보를 조회한다.")
	@GetMapping("/terms")
	public ResponseEntity<?> getTermsInfo() {
		log.info("========================");
		log.info("관리자 페이지 약관관리 정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchTermsInfo(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "대시보드 정보 등록/수정", notes = "대시보드 정보를 등록/수정한다.")
	@PostMapping("/terms")
	public ResponseEntity<?> setTermsInfo(@RequestBody TermsDto dto) {
		log.info("========================");
		log.info("관리자 페이지 약관관리 정보 등록/수정");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.saveTermsInfo(dto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "버전 정보 조회", notes = "버전 정보를 조회한다.")
	@GetMapping("/version")
	public ResponseEntity<?> getVersionList() {
		log.info("========================");
		log.info("관리자 페이지 버전 조회");
		log.info("========================");
		
		return new ResponseEntity<>(systemInfoService.searchVersionList(), HttpStatus.OK);
	}
	
	@PostMapping("/uploadVersion")
	public ResponseEntity<?> uploadFiles(MultipartFile multipartFile, String appVersion, String appDesc){
		
		String UPLOAD_PATH = "C:\\versions\\";
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		
		try {

			MultipartFile file = multipartFile;
			
			String originName = file.getOriginalFilename();
			String fileExt = originName.substring(originName.lastIndexOf(".")+1);
			originName = originName.substring(0, originName.lastIndexOf("."));
			File fileSave = new File(UPLOAD_PATH, originName + "." + fileExt);
			if(!fileSave.exists()) {
				fileSave.mkdirs();
			}
			file.transferTo(fileSave);

			map.put("appVersion", appVersion);
			map.put("appDesc", appDesc);
			map.put("filePath", UPLOAD_PATH + originName + "." + fileExt);
			map.put("regDt", LocalDateTime.now().format(format) );
			
			systemInfoService.saveVersion(map);
		} catch (Exception e) {
			log.info(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	
	@GetMapping("/downloadVersion")
	@CrossOrigin(value= {"*"}, exposedHeaders = {"Content-Disposition"})
	public ResponseEntity<Resource> downloadFile(@RequestParam("verUid") Long verUid) throws Exception {
		TbSysAppversion file =  systemInfoService.getFile(verUid);
		String filePath = file.getFilePath();
		String[] fileArray = filePath.split("\\\\");
		String fileName = fileArray[fileArray.length-1];
		File downloadFile = new File(file.getFilePath());
		HttpHeaders header = new HttpHeaders();

		header.add(HttpHeaders.CONTENT_DISPOSITION, URLEncoder.encode(fileName, "UTF-8"));
		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires", "0");
		
		Path path = Paths.get(downloadFile.getAbsolutePath());
		
		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
		
		
		return ResponseEntity.ok()
				.headers(header)
				.contentLength(downloadFile.length())
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.body(resource);
	}
	
}
