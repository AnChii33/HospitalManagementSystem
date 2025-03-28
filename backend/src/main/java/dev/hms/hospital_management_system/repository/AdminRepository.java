package dev.hms.hospital_management_system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.hms.hospital_management_system.model.Admin;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
}
