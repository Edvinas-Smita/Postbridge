package com.devbridge.postbridge.parcelsapp.security;

import com.devbridge.postbridge.parcelsapp.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private CustomUserDetailsService userDetailsService;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .cors().and().csrf().disable() //TODO: what is it?
            .antMatcher("/**")
            .authorizeRequests()
            .antMatchers("/*")
            .permitAll()
            //;
            .anyRequest()
            .authenticated()
            .and().httpBasic();
            //.and()//TODO: change to oAuth2 or JWT...
            //.addFilter(new JWTAuthenticationFilter(authenticationManager()))
            //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
            .userDetailsService(userDetailsService)
            .passwordEncoder(bCryptPasswordEncoder);
  }

}



