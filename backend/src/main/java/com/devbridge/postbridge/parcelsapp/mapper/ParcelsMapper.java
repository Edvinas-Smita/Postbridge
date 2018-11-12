package com.devbridge.postbridge.parcelsapp.mapper;

import java.util.List;
import com.devbridge.postbridge.parcelsapp.model.Parcel;
import com.devbridge.postbridge.parcelsapp.model.User;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.One;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ParcelsMapper {

  @Select("select " +
          "  p.id, " +
          "  start_loc.name as start_location, " +
          "  end_loc.name as end_location, " +
          "  p.status, " +
          "  p.description, " +
          "  p.weight, " +
          "  p.date_created, " +
          "  ref_user_courier, " +
          "  ref_user_recipient " +
          "from " +
          "  parcels p, " +
          "  locations start_loc, " +
          "  locations end_loc " +
          "where " +
          "  start_loc.id = p.ref_location_start and " +
          "  end_loc.id = p.ref_location_end")
  @Results({
          @Result(property = "id", column = "ID"),
          @Result(property = "startLocation", column = "START_LOCATION"),
          @Result(property = "endLocation", column = "END_LOCATION"),
          @Result(property = "status", column = "STATUS"),
          @Result(property = "weight", column = "WEIGHT"),
          @Result(property = "createdDate", column = "DATE_CREATED"),
          @Result(property = "description", column = "DESCRIPTION"),
          @Result(property = "courier", javaType = User.class, column = "REF_USER_COURIER",
                  one = @One(select = "getUser")),
          @Result(property = "recipient", javaType = User.class, column = "REF_USER_RECIPIENT",
                  one = @One(select = "getUser"))
  })
  List<Parcel> getParcels();

  @Select("select id, first_name, last_name from users where id = #{user_id}")
  @Results({
          @Result(property = "id", column = "ID"),
          @Result(property = "firstName", column = "FIRST_NAME"),
          @Result(property = "lastName", column = "LAST_NAME")
  })
  User getUser(Integer user_id);

  @Delete("delete from parcels where id = #{parcel_id}")
  void deleteParcel(long parcel_id);
}
