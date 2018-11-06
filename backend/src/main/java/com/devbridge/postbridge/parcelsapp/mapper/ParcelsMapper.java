package com.devbridge.postbridge.parcelsapp.mapper;


import com.devbridge.postbridge.parcelsapp.model.Parcel;
import com.devbridge.postbridge.parcelsapp.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ParcelsMapper {

  @Select("select " +
          "  p.id, " +
          "  p.description, " +
          "  start_loc.name as start_location, " +
          "  end_loc.name as end_location, " +
          "  ref_user_courier, " +
          "  ref_user_reciever " +
          "from " +
          "  parcels p, " +
          "  locations start_loc, " +
          "  locations end_loc " +
          "where " +
          "  start_loc.id = p.ref_location_start and " +
          "  end_loc.id = p.ref_location_end")
  @Results(value = {
          @Result(property = "id", column = "ID"),
          @Result(property = "description", column = "DESCRIPTION"),
          @Result(property = "startLocation", column = "START_LOCATION"),
          @Result(property = "endLocation", column = "END_LOCATION"),
          @Result(property = "courier", javaType=User.class, column = "REF_USER_COURIER",
                  one=@One(select="getUser")),
          @Result(property = "receiver", javaType=User.class, column = "REF_USER_RECIEVER",
                  one=@One(select="getUser"))
  })
  List<Parcel> getParcels();

  @Select("select id, first_name, last_name from users where id = #{user_id}")
  @Results(value = {
          @Result(property = "id", column = "ID"),
          @Result(property = "firstName", column = "FIRST_NAME"),
          @Result(property = "lastName", column = "LAST_NAME"),
  })
  User getUser(Integer user_id);
}
