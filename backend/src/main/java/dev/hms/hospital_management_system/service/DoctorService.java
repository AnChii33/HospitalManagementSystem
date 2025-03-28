package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Doctor;
import dev.hms.hospital_management_system.model.User;
import dev.hms.hospital_management_system.repository.DoctorRepository;
import dev.hms.hospital_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public ResponseEntity<Doctor> getDoctorById(String id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Doctor saveDoctor(Doctor doctor, String password) {
        // Check if doctor exists by ID
        if (doctorRepository.findByDoctorID(doctor.getDoctorID()).isPresent()) {
            throw new IllegalArgumentException("Doctor ID already exists");
        }

        // Check if user exists by loginID (DoctorID)
        if (userRepository.existsByLoginID(doctor.getDoctorID())) {
            throw new IllegalArgumentException("User with this login ID already exists");
        }

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(password);

        // Save the doctor entity
        Doctor savedDoctor = doctorRepository.save(doctor);

        // Create and save the user entity
        User user = new User();
        user.setLoginID(doctor.getDoctorID());  // Use DoctorID as loginID
        user.setPassword(encodedPassword);      // Store the hashed password
        user.setRole("DOCTOR");

        userRepository.save(user);

        return savedDoctor;
    }

    public ResponseEntity<Doctor> updateDoctor(String doctorId, Doctor updatedDoctor) {
        Optional<Doctor> existingDoctorOpt = doctorRepository.findById(doctorId);

        if (!existingDoctorOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Doctor existingDoctor = existingDoctorOpt.get();
        existingDoctor.setName(updatedDoctor.getName());
        existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
        existingDoctor.setMobileNo(updatedDoctor.getMobileNo());

        Doctor updatedDoctorEntity = doctorRepository.save(existingDoctor);
        return ResponseEntity.ok(updatedDoctorEntity);
    }

    public ResponseEntity<Void> deleteDoctor(String id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

}
