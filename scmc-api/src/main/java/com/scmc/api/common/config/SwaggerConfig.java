package com.scmc.api.common.config;

import java.awt.print.Pageable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.classmate.TypeResolver;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	TypeResolver typeResolver = new TypeResolver();
	
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
        		.alternateTypeRules(AlternateTypeRules.newRule(typeResolver.resolve(Pageable.class)
						,typeResolver.resolve((MyPageable.class))))
        		.consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .useDefaultResponseMessages(false)
                .apiInfo(getApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.scmc.api"))
                .paths(PathSelectors.ant("/**"))
                .build();
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("꿀차꿀짐")
                .description("꿀차꿀짐 REST API")
                .version("1.0")
                .build();
    }
    
    @Data
    @ApiModel
    static class MyPageable {

    	@ApiModelProperty(value = "페이지번호(0..N)")
    	private Integer page;
    	
    	@ApiModelProperty(value = "페이지 크기", allowableValues = "range[0,100]")
    	private Integer size;
    	
    	@ApiModelProperty(value = "정렬(ASC, DESC)")
    	private List<String> sort;
    	
    }
}
