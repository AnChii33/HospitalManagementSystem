package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Medicine;
import dev.hms.hospital_management_system.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(String medicineId) {
        medicineRepository.deleteById(medicineId);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(String medicineId) {
        return medicineRepository.findById(medicineId).orElse(null);
    }

    public Medicine updateMedicineStock(String medicineId, int newQuantity) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine != null) {
            medicine.setQuantityInStock(newQuantity);
            return medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Medicine with ID " + medicineId + " not found.");
        }
    }

    public Medicine decrementMedicineQuantity(String medicineId, int decrementBy) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine != null) {
            int updatedQuantity = medicine.getQuantityInStock() - decrementBy;
            if (updatedQuantity < 0) {
                throw new IllegalArgumentException("Insufficient stock for Medicine ID: " + medicineId);
            }
            medicine.setQuantityInStock(updatedQuantity);
            return medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Medicine with ID " + medicineId + " not found.");
        }
    }

    public Medicine incrementMedicineQuantity(String medicineId, int incrementBy) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine != null) {
            int updatedQuantity = medicine.getQuantityInStock() + incrementBy;
            if (updatedQuantity < 0) {
                throw new IllegalArgumentException("Insufficient stock for Medicine ID: " + medicineId);
            }
            medicine.setQuantityInStock(updatedQuantity);
            return medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Medicine with ID " + medicineId + " not found.");
        }
    }

    public Medicine updateMedicinePrice(String medicineId, double newPrice) {
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
        if (medicine != null) {
            if (newPrice <= 0) {
                throw new IllegalArgumentException("Price must be greater than 0.");
            }
            medicine.setPrice(newPrice);
            return medicineRepository.save(medicine);
        } else {
            throw new RuntimeException("Medicine with ID " + medicineId + " not found.");
        }
    }

    public List<Medicine> searchMedicinesByName(String name) {
        return medicineRepository.findByMedicineNameContainingIgnoreCase(name);
    }
}
