package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Pathologist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PathologistRepository extends MongoRepository<Pathologist, String> {
    Optional<Pathologist> findByPathologistID(String pathologistID);
}
