package com.devbridge.postbridge.parcelsapp.api;

import javax.servlet.http.HttpServletRequest;

import com.devbridge.postbridge.parcelsapp.security.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.LinkedHashMap;

@Controller
public class OAuthController {
  @Autowired
  private TokenStore tokenStore;

  @RequestMapping(value = "/oauth/revoke-token", method = RequestMethod.GET)
  @ResponseStatus(HttpStatus.OK)
  public void logout(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null) {
      String tokenValue = authHeader.replace("Bearer", "").trim();
      OAuth2AccessToken accessToken = tokenStore.readAccessToken(tokenValue);
      tokenStore.removeAccessToken(accessToken);
    }
  }

  @Controller
  public class SecurityController {

    @RequestMapping(value = "/oauth/user-details", method = RequestMethod.GET,
            produces = "application/json")
    @ResponseBody
    public HashMap<String, Object> currentUserDetails(Authentication authentication) {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      CustomUser currentUser = (CustomUser)auth.getPrincipal();
      HashMap<String, Object> response = new LinkedHashMap<String, Object>();

      response.put("id", currentUser.getId());
      response.put("firstName", currentUser.getFirstName());
      response.put("lastName", currentUser.getLastName());

      return response;
    }
  }
}
