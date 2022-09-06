package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_common_terms")
@Getter
@Setter
public class TbCommonTerms {

	@Id
	@Column(name = "terms_uid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long termsUid;
	
	@Column(name = "terms_type")
	private String termsType;
	
	private String versions;
	
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	private String contents;
	
	@Column(name = "expdiv")
	private String expDiv;
	
	@Column(name = "use_yn")
	private String useYn;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_id")
	private String modId;
	
	@Column(name = "mod_dt")
	private Date modDt;
}
