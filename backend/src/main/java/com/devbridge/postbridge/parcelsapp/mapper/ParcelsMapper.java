package com.devbridge.postbridge.parcelsapp.mapper;

import java.util.List;

import com.devbridge.postbridge.parcelsapp.model.Parcel;
import com.devbridge.postbridge.parcelsapp.model.ParcelStatusHistory;
import com.devbridge.postbridge.parcelsapp.model.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ParcelsMapper {

    //<editor-fold desc="parcel CRUD" defaultstate="collapsed">
    @Insert("INSERT INTO parcels values(" +
                    "DEFAULT, " +
                    "date_trunc('second', current_timestamp), " +    //should this also be read from given parcel?
                    "#{recipient.id}, " +
                    "(SELECT id FROM users WHERE id = #{courier.id}), " +
                    "1, " + //creating status as open initially //TODO possibly should avoid hardcoding - maybe eventually DB table for statuses?
                    "#{description}, " +
                    "#{weight}, " +
                    "(select id from locations where name = #{startLocation}), " +
                    "(select id from locations where name = #{endLocation}))")
    @Options(useGeneratedKeys = true)
    void insertParcel(Parcel parcel);

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
                    "  end_loc.id = p.ref_location_end and" +
                    "  p.id = #{id};")
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
    Parcel getParcel(long id);

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

    @Update("UPDATE parcels SET " +
                    "ref_user_courier = COALESCE((SELECT id FROM users WHERE id = #{courier.id}), ref_user_courier), " +
                    "status = COALESCE(#{status}, status), " +
                    "description = COALESCE(#{description}, description), " +
                    "weight = COALESCE(#{weight}, weight), " +
                    "ref_location_start = COALESCE((select id from locations where name = #{startLocation}), ref_location_start), " +
                    "ref_location_end = COALESCE((select id from locations where name = #{endLocation}), ref_location_end) " +
                    "WHERE id = #{id};")
    int updateParcel(Parcel parcel);

    @Delete("delete from parcels where id = #{parcel_id}")
    int deleteParcel(long parcel_id);
    //</editor-fold>

    @Select("select id, first_name, last_name from users where id = #{user_id}")
    @Results({
            @Result(property = "id", column = "ID"),
            @Result(property = "firstName", column = "FIRST_NAME"),
            @Result(property = "lastName", column = "LAST_NAME")
    })
    User getUser(Integer user_id);

    @Select("select * from parcel_status_history where ref_parcel = #{id} order by date_changed desc")
    @Results({
            @Result(property = "date", column = "DATE_CHANGED"),
            @Result(property = "user", javaType = User.class, column = "REF_USER",
                    one = @One(select = "getUser"))
    })
    List<ParcelStatusHistory> getParcelStatusHistory(@Param("id") long id);

    @Insert("INSERT INTO parcel_status_history values(" +
                    "DEFAULT, " +
                    "#{parcelID}, " +
                    "#{status}, " +
                    "date_trunc('second', current_timestamp), " +    //should this also be read from given history?
                    "#{userID}" +
                    ");")
    void pushHistory(@Param("userID") long userID, @Param("status") short status, @Param("parcelID") long parcelID);
}
