package com.devbridge.postbridge.parcelsapp.mapper;

import com.devbridge.postbridge.parcelsapp.model.ApplicationUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ApplicationUserMapper {

  @Select("SELECT email, hash " +
          "FROM users " +
          "WHERE email = #{email} ")
  @Results({
          @Result(property = "email", column = "EMAIL"),
          @Result(property = "password", column = "hash"),
  })
  ApplicationUser findApplicationUserByEmail(String email);

}