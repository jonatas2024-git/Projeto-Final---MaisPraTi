package com.maisprati.portaldevagas.infra.security;

import com.maisprati.portaldevagas.models.user.LoginUser;
import com.maisprati.portaldevagas.models.user.LoginUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginUserRepository loginUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginUser user = this.loginUserRepository.findByLogin(username).orElseThrow(()-> new UsernameNotFoundException("User not found."));

        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), new ArrayList<>());
    }
}
