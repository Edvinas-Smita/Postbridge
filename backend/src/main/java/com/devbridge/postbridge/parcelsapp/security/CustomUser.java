package com.devbridge.postbridge.parcelsapp.security;

import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {

  private final Long id;
  private final String firstName;
  private final String lastName;

  public CustomUser(String username, String password, boolean enabled,
                  boolean accountNonExpired, boolean credentialsNonExpired,
                  boolean accountNonLocked,
                  Collection authorities,
                  Long id, String firstName, String lastName) {

    super(username, password, enabled, accountNonExpired,
            credentialsNonExpired, accountNonLocked, authorities);

    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
