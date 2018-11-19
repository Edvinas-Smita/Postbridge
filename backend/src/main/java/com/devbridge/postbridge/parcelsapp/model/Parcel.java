package com.devbridge.postbridge.parcelsapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Parcel {
  //leaving possible null because it is assigned on INSERT
  private Integer id;

  @NotNull
  private String startLocation;
  
  @NotNull
  private String endLocation;

  private Short status;
  
  @NotNull
  private String description;
  
  @NotNull
  private Integer weight;
  
  //leaving possible null because it is assigned on INSERT
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") //TODO: how to get correct format?
  private Date createdDate;

  private Boolean delivered; //TODO: is it needed?
  
  @NotNull
  private User recipient;

  private User courier;
}
