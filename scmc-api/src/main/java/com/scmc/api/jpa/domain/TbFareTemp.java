package com.scmc.api.jpa.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_fare_temp")
@Getter
public class TbFareTemp {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String uid;
	
	@Column(name = "input_date")
	private String inputDate;
	
}
