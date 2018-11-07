package com.devbridge.postbridge.parcelsapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
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

  private String startLocation;

  private String endLocation;

  private Integer status;

  private String description;

  private Integer weight;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") //TODO: how to get correct format?
  private Date createdDate;

  private Boolean delivered; //TODO: is it needed?

  private User recipient;

  private User courier;

}
