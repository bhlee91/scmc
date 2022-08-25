package com.scmc.api.member.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scmc.api.member.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserId(String userId);
}
