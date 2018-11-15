package com.devbridge.postbridge.parcelsapp.service;

import java.util.List;
import com.devbridge.postbridge.parcelsapp.mapper.ParcelsMapper;
import com.devbridge.postbridge.parcelsapp.model.Parcel;
import com.devbridge.postbridge.parcelsapp.model.ParcelStatusHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public List<ParcelStatusHistory> getParcelStatusHistory(long id){
    return parcelsMapper.getParcelStatusHistory(id);
  }
}
