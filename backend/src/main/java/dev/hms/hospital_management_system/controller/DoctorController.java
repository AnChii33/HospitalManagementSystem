package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Doctor;
import dev.hms.hospital_management_system.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Get all doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get doctor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }

    // Update doctor details
    @PutMapping("/{doctorId}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable String doctorId,
            @RequestBody Doctor updatedDoctor) {
        return doctorService.updateDoctor(doctorId, updatedDoctor);
    }

    // Delete doctor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable String id) {
        return doctorService.deleteDoctor(id);
    }

    // Register a new doctor and save corresponding User for login
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createDoctor(@RequestBody Doctor doctor, @RequestParam String password) {
        Doctor savedDoctor = doctorService.saveDoctor(doctor, password);

        // Prepare response with doctor ID
        Map<String, String> response = new HashMap<>();
        response.put("doctorID", savedDoctor.getDoctorID());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }
}
