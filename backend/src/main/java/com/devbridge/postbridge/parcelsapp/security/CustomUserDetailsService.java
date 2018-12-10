package com.devbridge.postbridge.parcelsapp.security;

import com.devbridge.postbridge.parcelsapp.mapper.UserMapper;
import com.devbridge.postbridge.parcelsapp.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private UserMapper mapper;

  public CustomUserDetailsService(UserMapper mapper) { //TODO: is it needed?
    this.mapper = mapper;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    User user = mapper.findUserByEmail(email);

    if (user == null) {
      throw new UsernameNotFoundException(email);
    }

    return new CustomUser(
            user.getEmail(), user.getPassword(),
            true, true, true, true,emptyList(),
            user.getFirstName(), user.getLastName());

  }

}