package com.devbridge.postbridge.parcelsapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
  //leaving possible null because it is assigned on INSERT
  private Integer id;
  @NotNull
  private String firstName;
  @NotNull
  private String lastName;
}
