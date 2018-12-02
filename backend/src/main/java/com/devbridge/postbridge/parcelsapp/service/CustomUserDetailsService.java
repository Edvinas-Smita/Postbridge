package com.devbridge.postbridge.parcelsapp.service;

import com.devbridge.postbridge.parcelsapp.mapper.ApplicationUserMapper;
import com.devbridge.postbridge.parcelsapp.model.ApplicationUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private ApplicationUserMapper mapper; //TODO: is it needed?

  public CustomUserDetailsService(ApplicationUserMapper mapper) { //TODO: is it needed?
    this.mapper = mapper;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    ApplicationUser applicationUser = mapper.findApplicationUserByEmail(email);

    if (applicationUser == null) {
      throw new UsernameNotFoundException(email);
    }
    User user;
    user = new User(applicationUser.getEmail(), applicationUser.getPassword(), emptyList());

    return  user;
  }
}



/*
@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  UserService userService = new UserService();

  public User getUserByEmail(String email) {
    return userService.getUserByEmail(email);
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {


    User user = getUserByEmail(email);
    //String username = "homer@the.simpsons";
    //String username = user.getEmail();
    //String password = "HomerPassword123";


    List<GrantedAuthority> authList = null;
    authList = new ArrayList<GrantedAuthority>();
    SimpleGrantedAuthority sGA = new SimpleGrantedAuthority(new String("ROLE_USER"));
    authList.add(sGA);

    return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            "HomerPassword123",
            //user.getPassword(),
            authList);
  }
}
*/