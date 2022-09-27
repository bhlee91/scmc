package com.scmc.api.jpa.domain;

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
@Table(name="tb_sys_appversion")
@Getter
@Setter
@NoArgsConstructor
public class TbSysAppversion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ver_uid")
	private Long verUid;
	
	@Column(name ="app_version")
	private String appVersion;
	
	@Column(name ="app_desc")
	private String appDesc;
	
	@Column(name ="file_path")
	private String filePath;
	
	
	@Column(name ="reg_dt")
	private Date regDt;
	
	
	public TbSysAppversion(Map<String, Object> av) throws ParseException{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		this.appVersion = av.get("appVersion").toString();
		this.filePath = av.get("filePath").toString();
		this.appDesc = av.get("appDesc").toString();
		this.regDt = av.get("regDt").toString().equals("")? null : format.parse(av.get("regDt").toString());
		
	}
}
