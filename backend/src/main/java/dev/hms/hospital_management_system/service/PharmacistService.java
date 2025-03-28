package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Pharmacist;
import dev.hms.hospital_management_system.model.User;
import dev.hms.hospital_management_system.repository.PharmacistRepository;
import dev.hms.hospital_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PharmacistService {

    @Autowired
    private PharmacistRepository pharmacistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Pharmacist> getAllPharmacists() {
        return pharmacistRepository.findAll();
    }

    public ResponseEntity<Pharmacist> getPharmacistById(String id) {
        Optional<Pharmacist> pharmacist = pharmacistRepository.findById(id);
        return pharmacist.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Pharmacist savePharmacist(Pharmacist pharmacist, String password) {
        if (pharmacistRepository.findByPharmacistID(pharmacist.getPharmacistID()).isPresent()) {
            throw new IllegalArgumentException("Pharmacist ID already exists");
        }

        String encodedPassword = passwordEncoder.encode(password);
        Pharmacist savedPharmacist = pharmacistRepository.save(pharmacist);

        User user = new User();
        user.setLoginID(pharmacist.getPharmacistID());
        user.setPassword(encodedPassword);
        user.setRole("PHARMACIST");

        userRepository.save(user);

        return savedPharmacist;
    }

    public ResponseEntity<Pharmacist> updatePharmacist(String pharmacistId, Pharmacist updatedPharmacist) {
        Optional<Pharmacist> existingPharmacistOpt = pharmacistRepository.findById(pharmacistId);

        if (!existingPharmacistOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Pharmacist existingPharmacist = existingPharmacistOpt.get();
        existingPharmacist.setName(updatedPharmacist.getName());
        existingPharmacist.setMobileNo(updatedPharmacist.getMobileNo());

        Pharmacist updatedPharmacistEntity = pharmacistRepository.save(existingPharmacist);
        return ResponseEntity.ok(updatedPharmacistEntity);
    }

    public ResponseEntity<Void> deletePharmacist(String id) {
        if (pharmacistRepository.existsById(id)) {
            pharmacistRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
