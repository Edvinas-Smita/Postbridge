package com.devbridge.postbridge.parcelsapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ParcelsApp {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {//TODO: correct place for method?
      return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {

      SpringApplication.run(ParcelsApp.class, args);

    }
}
