package com.sweetshop.management.system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
@EnableMongoAuditing
public class SweetShopManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SweetShopManagementSystemApplication.class, args);
	}

}
