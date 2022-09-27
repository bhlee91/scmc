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
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_common_terms")
@Getter
@Setter
@NoArgsConstructor
public class TbCommonTerms {

	@Id
	@Column(name = "terms_uid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long termsUid;
	
	@Column(name = "terms_type", nullable = false)
	private String termsType;
	
	@Column(nullable = false)
	private String versions;
	
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	@Column(nullable = false)
	private String contents;
	
	@Column(name = "expdiv", nullable = false)
	private String expDiv;
	
	@Column(name = "use_yn", nullable = false)
	private String useYn;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_id")
	private String modId;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	public TbCommonTerms(Map<String, Object> terms) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		this.termsUid = Long.parseLong(terms.get("termsUid").toString());
		this.termsType = terms.get("termsType").toString();
		this.versions = terms.get("version").toString();
		this.contents = terms.get("contents").toString();
		this.expDiv = terms.get("expDiv").toString();
		this.useYn = terms.get("useYn").toString();
		this.regId = terms.get("regId").toString();
		this.regDt = terms.get("regDt").equals("") ? null : format.parse(terms.get("regDt").toString());
		this.modId = terms.get("modId").toString();
		this.modDt = terms.get("modDt").equals("") ? null : format.parse(terms.get("modDt").toString());		
		
	}
	
	@Builder(builderMethodName = "insertTerms")
	public TbCommonTerms(String termsType, String versions, 
			String contents, String expDiv, String useYn, String regId) {
		
		this.termsType = termsType;
		this.versions = versions;
		this.contents = contents;
		this.expDiv = expDiv; 
		this.useYn = useYn;
		this.regId = regId;
	}
	
	public void updateTerms(String termsType, String versions, 
			String contents, String expDiv, String useYn, String regId) {
		
		this.termsType = termsType;
		this.versions = versions;
		this.contents = contents;
		this.expDiv = expDiv; 
		this.useYn = useYn;
		this.modId = regId;
		this.modDt = new Date();
	}
}
