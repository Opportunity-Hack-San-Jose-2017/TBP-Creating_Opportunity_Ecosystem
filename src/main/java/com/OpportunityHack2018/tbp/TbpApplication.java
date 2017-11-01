package com.OpportunityHack2018.tbp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.OpportunityHack2018.tbp.repositories")
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.OpportunityHack2018.tbp.entities"})
@ComponentScan(basePackages = {"com.OpportunityHack2018.tbp.entities","com.OpportunityHack2018.tbp.controllers","com.OpportunityHack2018.tbp.repositories","com.OpportunityHack2018.tbp.services","com.OpportunityHack2018.tbp.aws"})
@SpringBootApplication
public class TbpApplication {

	public static void main(String[] args) {
		SpringApplication.run(TbpApplication.class, args);
	}
}
