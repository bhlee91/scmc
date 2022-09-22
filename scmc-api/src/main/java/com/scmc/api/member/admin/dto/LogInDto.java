package com.scmc.api.member.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class LogInDto {

	private String email;
	private String password;
}
