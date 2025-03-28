package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Prescription;
import dev.hms.hospital_management_system.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public ResponseEntity<Prescription> getPrescriptionById(String id) {
        Optional<Prescription> prescription = prescriptionRepository.findById(id);
        return prescription.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    public ResponseEntity<Prescription> updatePrescription(String id, Prescription prescriptionDetails) {
        Optional<Prescription> existingPrescriptionOptional = prescriptionRepository.findById(id);
        if (existingPrescriptionOptional.isPresent()) {
            Prescription existingPrescription = existingPrescriptionOptional.get();
            existingPrescription.setAppointmentId(prescriptionDetails.getAppointmentId());
            existingPrescription.setMedicineDetails(prescriptionDetails.getMedicineDetails());
            existingPrescription.setInstructions(prescriptionDetails.getInstructions());
            existingPrescription.setDosage(prescriptionDetails.getDosage());
            existingPrescription.setDate(prescriptionDetails.getDate());
            return ResponseEntity.ok(prescriptionRepository.save(existingPrescription));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deletePrescription(String id) {
        if (prescriptionRepository.existsById(id)) {
            prescriptionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
