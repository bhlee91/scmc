package com.scmc.api.jpa.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Embeddable
public class TbCargoRequestKey implements Serializable {
	
	private static final long serialVersionUID = -1313179227852789656L;
	
	@Column(name = "req_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long reqId;
	
	@Column(name = "owner_uid")
	long ownerUid;
}
