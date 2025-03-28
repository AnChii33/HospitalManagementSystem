package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Pharmacist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmacistRepository extends MongoRepository<Pharmacist, String> {
    Optional<Pharmacist> findByPharmacistID(String pharmacistID);
}
