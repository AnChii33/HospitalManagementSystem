package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.MedicineOrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineOrderDetailsRepository extends MongoRepository<MedicineOrderDetails, String> {
    List<MedicineOrderDetails> findByDeliveryStatus(String deliveryStatus);
}
