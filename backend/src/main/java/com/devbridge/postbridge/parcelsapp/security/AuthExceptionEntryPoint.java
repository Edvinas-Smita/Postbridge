package com.devbridge.postbridge.parcelsapp.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AuthExceptionEntryPoint implements AuthenticationEntryPoint {//TODO: it seems it doesn't works...
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
                       AuthenticationException authException)
          throws IOException, ServletException {

    List<String> errors = new ArrayList<>();
    errors.add("Unauthorized");
    response.setContentType("application/json");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    try {
      ObjectMapper mapper = new ObjectMapper();
      mapper.writeValue(response.getOutputStream(), errors);
    } catch (Exception e) {
      throw new ServletException();
    }
  }
}