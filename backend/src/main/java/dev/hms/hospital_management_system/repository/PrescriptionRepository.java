package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Prescription;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends MongoRepository<Prescription, String> {
}
