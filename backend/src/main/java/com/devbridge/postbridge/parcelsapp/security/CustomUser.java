package com.devbridge.postbridge.parcelsapp.security;

import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {

  private final Long id;
  private final String firstName;
  private final String lastName;
  private final String imageLink;

  public CustomUser(String username, String password, boolean enabled,
                  boolean accountNonExpired, boolean credentialsNonExpired,
                  boolean accountNonLocked,
                  Collection authorities,
                  Long id, String firstName, String lastName, String imageLink) {

    super(username, password, enabled, accountNonExpired,
            credentialsNonExpired, accountNonLocked, authorities);

    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.imageLink = imageLink;
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

  public String getImageLink() {
    return imageLink;
  }
}
