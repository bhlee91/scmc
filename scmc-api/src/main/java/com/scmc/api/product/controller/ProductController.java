package com.scmc.api.product.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.product.service.ProductService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "결제 상품 정보")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

	private final ProductService productService;
	
	@ApiOperation(value = "결제 상품 전체 조회", notes = "결제 상품을 조회한다.")
	@GetMapping({"/list/{useyn}"})
	public ResponseEntity<?> selectProductList(
			@ApiParam(value = "사용여부", example = "Y") @PathVariable(value = "useyn") String useyn
			) throws Exception {
		log.info("========================");
		log.info("결제 상품 리스트 조회");
		log.info("========================");
		
		return new ResponseEntity<>(productService.selectProduct(useyn), HttpStatus.OK);
	}
	
}
