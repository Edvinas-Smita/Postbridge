package com.devbridge.postbridge.parcelsapp.mapper;

import com.devbridge.postbridge.parcelsapp.model.Parcels;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ParcelsMapper {

  @Select("select * from parcels")
  Parcels getParcels();

}
