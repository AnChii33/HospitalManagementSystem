package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Optional<Doctor> findByDoctorID(String doctorID);
    List<Doctor> findBySpecialization(String specialization);
}
