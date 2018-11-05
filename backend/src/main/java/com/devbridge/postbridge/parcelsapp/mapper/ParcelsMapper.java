package com.devbridge.postbridge.parcelsapp.mapper;

import com.devbridge.postbridge.parcelsapp.model.Parcels;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ParcelsMapper {

  @Select("SELECT * FROM parcels")
  Parcels getParcels();

}
