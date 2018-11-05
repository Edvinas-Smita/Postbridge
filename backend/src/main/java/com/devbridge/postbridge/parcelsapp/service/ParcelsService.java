package com.devbridge.postbridge.parcelsapp.service;

import com.devbridge.postbridge.parcelsapp.mapper.ParcelsMapper;
import com.devbridge.postbridge.parcelsapp.model.Parcels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParcelsService {

  private ParcelsMapper parcelsMapper;

  @Autowired
  public ParcelsService(ParcelsMapper parcelsMapper) { this.parcelsMapper =  parcelsMapper; }

  public Parcels getParcels() { return parcelsMapper.getParcels(); }

}
