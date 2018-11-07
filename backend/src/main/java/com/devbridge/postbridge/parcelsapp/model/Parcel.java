package com.devbridge.postbridge.parcelsapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Parcel {

  private Integer id;
  private String description;
  private String startLocation;
  private String endLocation;
  private User courier;
  private User recipient;

}
