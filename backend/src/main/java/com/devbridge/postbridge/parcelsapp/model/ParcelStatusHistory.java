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
public class ParcelStatusHistory {

  private Integer id;

  private Integer status;

  private User user;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") //TODO: how to get correct format?
  private Date date;
}
