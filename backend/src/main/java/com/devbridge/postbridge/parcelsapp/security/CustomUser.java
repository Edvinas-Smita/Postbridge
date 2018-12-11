package com.devbridge.postbridge.parcelsapp.security;

import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {

  private final String firstName;
  private final String lastName;
  private final Byte[] avatar;

  public CustomUser(String username, String password, boolean enabled,
                  boolean accountNonExpired, boolean credentialsNonExpired,
                  boolean accountNonLocked,
                  Collection authorities,
                  String firstName, String lastName, Byte[] avatar) {

    super(username, password, enabled, accountNonExpired,
            credentialsNonExpired, accountNonLocked, authorities);

    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;

  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public Byte[] getAvatar() {
    return avatar;
  }
}
