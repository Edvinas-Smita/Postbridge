package com.devbridge.postbridge.parcelsapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableResourceServer
@EnableWebSecurity
public class SecurityConfig extends ResourceServerConfigurerAdapter {

  @Bean
  public BCryptPasswordEncoder encoder(){
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationEntryPoint unauthorizedEntryPoint() {
    return (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
  }

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private CustomUserDetailsService userDetailsService;

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(bCryptPasswordEncoder);
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
            .authorizeRequests()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/**").permitAll()
            .anyRequest().authenticated().and()
            .exceptionHandling()
                    .authenticationEntryPoint(unauthorizedEntryPoint()).and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .csrf().disable();
  }

}


