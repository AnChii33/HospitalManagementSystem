package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    Medicine findByMedicineName(String medicineName);
    List<Medicine> findByMedicineNameContainingIgnoreCase(String medicineName);
}
