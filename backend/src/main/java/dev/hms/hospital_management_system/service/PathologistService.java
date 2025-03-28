package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Pathologist;
import dev.hms.hospital_management_system.model.User;
import dev.hms.hospital_management_system.repository.PathologistRepository;
import dev.hms.hospital_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PathologistService {

    @Autowired
    private PathologistRepository pathologistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Pathologist> getAllPathologists() {
        return pathologistRepository.findAll();
    }

    public ResponseEntity<Pathologist> getPathologistById(String id) {
        Optional<Pathologist> pathologist = pathologistRepository.findById(id);
        return pathologist.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public Pathologist savePathologist(Pathologist pathologist, String password) {
        if (pathologistRepository.findByPathologistID(pathologist.getPathologistID()).isPresent()) {
            throw new IllegalArgumentException("Pathologist ID already exists");
        }

        String encodedPassword = passwordEncoder.encode(password);
        Pathologist savedPathologist = pathologistRepository.save(pathologist);

        User user = new User();
        user.setLoginID(pathologist.getPathologistID());
        user.setPassword(encodedPassword);
        user.setRole("PATHOLOGIST");

        userRepository.save(user);

        return savedPathologist;
    }

    public ResponseEntity<Pathologist> updatePathologist(String pathologistId, Pathologist updatedPathologist) {
        Optional<Pathologist> existingPathologistOpt = pathologistRepository.findById(pathologistId);

        if (!existingPathologistOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Pathologist existingPathologist = existingPathologistOpt.get();
        existingPathologist.setName(updatedPathologist.getName());
        existingPathologist.setMobileNo(updatedPathologist.getMobileNo());

        Pathologist updatedPathologistEntity = pathologistRepository.save(existingPathologist);
        return ResponseEntity.ok(updatedPathologistEntity);
    }

    public ResponseEntity<Void> deletePathologist(String id) {
        if (pathologistRepository.existsById(id)) {
            pathologistRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
