package com.writeit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.writeit.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
