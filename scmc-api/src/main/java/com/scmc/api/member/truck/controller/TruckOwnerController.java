package com.scmc.api.member.truck.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "차주용 API")
@RestController
@RequestMapping("/member/truck")
@RequiredArgsConstructor
@Slf4j
public class TruckOwnerController {

}
