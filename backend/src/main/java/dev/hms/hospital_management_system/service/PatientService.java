package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Patient;
import dev.hms.hospital_management_system.model.User;
import dev.hms.hospital_management_system.repository.PatientRepository;
import dev.hms.hospital_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(String id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    public Patient findByPatientID(String patientID) {
        return patientRepository.findByPatientID(patientID)
                .orElseThrow(() -> new IllegalArgumentException("Patient with ID " + patientID + " not found."));
    }
    // Save Patient and add corresponding User for login
    public Patient savePatient(Patient patient, String password) {
        // Use the patientID provided by the user
        if (patientRepository.findByPatientID(patient.getPatientID()).isPresent()) {
            throw new IllegalArgumentException("Patient ID already exists");
        }

        // Encrypt the password
        String encodedPassword = passwordEncoder.encode(password);

        // Save the patient to the repository
        Patient savedPatient = patientRepository.save(patient);

        // Create a new User object for login
        User user = new User();
        user.setLoginID(String.valueOf(patient.getPatientID()));
        user.setPassword(encodedPassword); // Store hashed password
        user.setRole("PATIENT");

        // Save the user credentials in the UserRepository
        userRepository.save(user);

        return savedPatient;
    }

    public ResponseEntity<Patient> updatePatient(String patientId, Patient updatedPatient) {
        Optional<Patient> existingPatientOpt = patientRepository.findById(patientId);

        if (!existingPatientOpt.isPresent()) {
            return ResponseEntity.notFound().build(); // Return 404 Not Found
        }

        Patient existingPatient = existingPatientOpt.get();

        // Update fields
        existingPatient.setName(updatedPatient.getName());
        existingPatient.setDob(updatedPatient.getDob());
        existingPatient.setGender(updatedPatient.getGender());
        existingPatient.setAddress(updatedPatient.getAddress());
        existingPatient.setMobileNo(updatedPatient.getMobileNo());
        existingPatient.setBloodGroup(updatedPatient.getBloodGroup());

        // Save updated patient
        Patient updatedPatientEntity = patientRepository.save(existingPatient);
        return ResponseEntity.ok(updatedPatientEntity); // Return 200 OK with updated patient
    }

    public ResponseEntity<Void> deletePatient(String id) {
        if (patientRepository.existsById(id)) {
            patientRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
