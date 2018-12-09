package com.devbridge.postbridge.parcelsapp.api;

import javax.validation.Valid;

import com.devbridge.postbridge.parcelsapp.model.LoginData;
import com.devbridge.postbridge.parcelsapp.model.User;
import com.devbridge.postbridge.parcelsapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private Logger logger = LoggerFactory.getLogger(LocationController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> postUser(@RequestBody @Valid User user) {
        logger.debug("Creating new user...");
        userService.insertUser(user);
        logger.debug("Created user: {}", user);  //TODO: remove printing user password

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    //TODO: it seems like not needed, on auth not used
    @GetMapping
    public ResponseEntity<User> getUserFromLogin(@RequestBody @Valid LoginData login) {
        logger.debug("Trying to get an user with specified login data ({})", login);
        User user = userService.getUser(login);
        logger.debug("Found user: {}", user);

        return user != null
               ? new ResponseEntity<>(user, HttpStatus.OK)
               : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
