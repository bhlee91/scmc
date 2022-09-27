package com.scmc  .api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_sys_attachfile")
@Getter
@Setter
@NoArgsConstructor
public class TbSysAttachfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "attach_id")
	private Long attachId;
	
	@Column(name="file_name")
	private String fileName;
	
	@Column(name="origin_file_name")
	private String originFileName;
	
	@Column(name="file_path")
	private String filePath;
	
	@Column(name="file_size")
	private int fileSize;
	
	@Column(name="status")
	private String status;
	
	@Column(name="reg_dt")
	private Date regDt;
	
	@Column(name="truckowner_uid")
	private int truckownerUid; 
	
	@Column(name="file_ext")
	private String fileExt;
	
	public TbSysAttachfile(Map<String, Object> af) throws ParseException{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		System.out.println("af:" + af.toString());
		// this.attachId = af.get("attachId") == null ? 1L : Long.parseLong(af.get("attachId").toString());
		this.fileName = af.get("fileName").toString();
		this.originFileName = af.get("originFileName").toString();
		this.filePath = af.get("filePath").toString();
		this.fileSize = Integer.parseInt(af.get("fileSize").toString());
		this.status = af.get("status").toString();
		this.regDt = af.get("regDt").toString().equals("")? null : format.parse(af.get("regDt").toString());
		this.truckownerUid = Integer.parseInt(af.get("truckownerUid").toString());
		this.fileExt = af.get("fileExt").toString();
		
	}
}
