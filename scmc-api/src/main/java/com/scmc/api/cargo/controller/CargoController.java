package com.scmc.api.cargo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.cargo.service.CargoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cargo")
@RequiredArgsConstructor
public class CargoController {

	private final CargoService cargoService;
}
