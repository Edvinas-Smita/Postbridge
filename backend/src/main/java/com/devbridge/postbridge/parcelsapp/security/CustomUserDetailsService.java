package com.devbridge.postbridge.parcelsapp.security;

import com.devbridge.postbridge.parcelsapp.mapper.ApplicationUserMapper;
import com.devbridge.postbridge.parcelsapp.model.ApplicationUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private ApplicationUserMapper mapper; //TODO: is it needed?

  public CustomUserDetailsService(ApplicationUserMapper mapper) { //TODO: is it needed?
    this.mapper = mapper;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    ApplicationUser applicationUser = mapper.findApplicationUserByEmail(email);

    if (applicationUser == null) {
      throw new UsernameNotFoundException(email);
    }
    return new User(applicationUser.getEmail(), applicationUser.getPassword(), emptyList());
  }
}