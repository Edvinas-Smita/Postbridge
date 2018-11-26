package com.devbridge.postbridge.parcelsapp.service;

import com.devbridge.postbridge.parcelsapp.mapper.UserMapper;
import com.devbridge.postbridge.parcelsapp.model.LoginData;
import com.devbridge.postbridge.parcelsapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper mapper;

    public void insertUser(User user) {
        mapper.insertUser(user, mapper.gen_salt());
    }

    public User getUser(LoginData login) {
        return mapper.getUser(login);
    }
}
