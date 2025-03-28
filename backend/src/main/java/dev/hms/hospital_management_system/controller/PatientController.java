package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Patient;
import dev.hms.hospital_management_system.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Get all patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get patient by ID
    @GetMapping("/{patientID}")
    public Patient getPatientByPatientID(@PathVariable String patientID) {
        return patientService.findByPatientID(patientID);
    }

    // Get patient by ID
    @GetMapping("/id/{id}")
    public Patient getPatientByID(@PathVariable String id) {
        return patientService.getPatientById(id);
    }

    // Update patient details
    @PutMapping("/{patientId}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable String patientId,
            @RequestBody Patient updatedPatient) {
        return patientService.updatePatient(patientId, updatedPatient);
    }

    // Delete patient by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        return patientService.deletePatient(id);
    }

    // Register a new patient and save corresponding User for login
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createPatient(@RequestBody Patient patient, @RequestParam String password) {
        Patient savedPatient = patientService.savePatient(patient, password);

        // Prepare response with patient ID (as a String)
        Map<String, String> response = new HashMap<>();
        response.put("patientID", savedPatient.getPatientID()); // patientID is a String

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
