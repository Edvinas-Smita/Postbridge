package com.devbridge.postbridge.parcelsapp.mapper;


import java.util.List;

import com.devbridge.postbridge.parcelsapp.model.Location;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface LocationMapper {

    @Select("SELECT id, name " +
                    "FROM locations " +
                    "WHERE id = #{id};")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name")
    })
    Location getLocation(long id);

    @Select("SELECT id, name " +
                    "FROM locations;")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name")
    })
    List<Location> getLocations();
}
