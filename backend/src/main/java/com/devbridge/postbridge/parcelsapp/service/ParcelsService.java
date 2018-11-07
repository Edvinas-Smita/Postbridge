package com.devbridge.postbridge.parcelsapp.service;

import com.devbridge.postbridge.parcelsapp.mapper.ParcelsMapper;
import com.devbridge.postbridge.parcelsapp.model.Parcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParcelsService {

  private ParcelsMapper parcelsMapper;

  @Autowired
  public ParcelsService(ParcelsMapper parcelsMapper) {
    this.parcelsMapper =  parcelsMapper;
  }

  public List<Parcel> getParcels() {
    return parcelsMapper.getParcels();
  }

}
