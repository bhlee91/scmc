package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_common_cd")
@Getter
public class TbCommonCd {
	
	/*
	 * @Column : 필수 annotation은 아님.
	 * 			 java 변수명과 DB Table 컬럼명을 다르게 할 경우 필요 O.
	 * 			 java 변수명과 컬럼명을 같게 선언할 경우 필요 X
	 * 			 
	 * 			 언더바(_)의 경우 jpa custom repository 에서 인식을 못하는 경우가 발생하기 때문에
	 * 			 카멜 케이스로 변수명을 선언해줄 필요가 있음.
	 */
	
	@Id
	@Column(name = "cdid")
	private String cdid;
	
	@Column(name = "code_type")
	private String codeType;
	
	@Column(name = "code_name")
	private String codeName;
	
	@Column(name = "code_typename")
	private String codeTypeName;
	
	@Column(name = "sort_order")
	private int sortOrder;
	
	@Column(name = "bigo")
	private String bigo;
	
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
