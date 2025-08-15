package com.maisprati.portaldevagas.models.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginUserRepository extends JpaRepository<LoginUser, Long> {
    Optional<LoginUser> findByLogin(String login);
}
