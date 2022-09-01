package com.scmc.api.jpa.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.ToString;

@Entity
@Table(name = "tb_common_cd")
@Getter @ToString
public class TbCommonCdByCodeType {
	
	@Id
	@Column(name = "code_type")
	private String codeType;
	
	@Column(name = "code_typename")
	private String codeTypeName;
}
