package com.devbridge.postbridge.parcelsapp.mapper;

import com.devbridge.postbridge.parcelsapp.model.LoginData;
import com.devbridge.postbridge.parcelsapp.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
    @Insert("INSERT INTO users values(" +
                    "DEFAULT, " +
                    "#{user.firstName}, " +
                    "#{user.lastName}, " +
                    "#{user.email}, " +
                    "#{salt}, " +//TODO: should salt be stored on DB?
                    "crypt(#{user.password}, #{salt})" +//TODO: is that ok, or should java BCryptPasswordEncoder used?
                    ");")
    @Options(useGeneratedKeys = true)
    void insertUser(@Param("user") User user, @Param("salt") String salt);

    @Select("SELECT gen_salt('bf');")
    String gen_salt();

    @Select("SELECT id, first_name, last_name, email " +//TODO: it seems like it is not needed, on auth not used
                    "FROM users " +
                    "WHERE email = #{email} " +
                    "AND hash = crypt(#{password}, salt);")
    @Results({
            @Result(property = "id", column = "ID"),
            @Result(property = "firstName", column = "FIRST_NAME"),
            @Result(property = "lastName", column = "LAST_NAME"),
            @Result(property = "email", column = "email")
    })
    User getUser(LoginData login);

    @Select("SELECT email, hash, first_name, last_name " +
            "FROM users " +
            "WHERE email = #{email} ")
    @Results({
            @Result(property = "email", column = "EMAIL"),
            @Result(property = "password", column = "HASH"),
            @Result(property = "firstName", column = "FIRST_NAME"),
            @Result(property = "lastName", column = "LAST_NAME"),
    })
    User findUserByEmail(String email);
}
