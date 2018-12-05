package com.devbridge.postbridge.parcelsapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Bean
  public BCryptPasswordEncoder encoder(){
    return new BCryptPasswordEncoder();
  }

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private CustomUserDetailsService userDetailsService;


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .authorizeRequests()
              .anyRequest().authenticated().and()
            .sessionManagement()
              .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .csrf().disable();
    /*
            .authorizeRequests()
            .antMatchers("/**").authenticated()
            .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());


    */
            /*
            .cors().and().csrf().disable() //TODO: what is it?
            .antMatcher("/**")
            .authorizeRequests()
            .antMatchers("/*")
            .permitAll()
            //;
            .anyRequest()
            .authenticated()
            .and().httpBasic()
            ;
    */
    //.and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
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



