package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Pharmacist;
import dev.hms.hospital_management_system.service.PharmacistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacists")
public class PharmacistController {

    @Autowired
    private PharmacistService pharmacistService;

    // Get all pharmacists
    @GetMapping
    public List<Pharmacist> getAllPharmacists() {
        return pharmacistService.getAllPharmacists();
    }

    // Get pharmacist by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pharmacist> getPharmacistById(@PathVariable String id) {
        return pharmacistService.getPharmacistById(id);
    }

    // Update pharmacist details
    @PutMapping("/{pharmacistId}")
    public ResponseEntity<Pharmacist> updatePharmacist(
            @PathVariable String pharmacistId,
            @RequestBody Pharmacist updatedPharmacist) {
        return pharmacistService.updatePharmacist(pharmacistId, updatedPharmacist);
    }

    // Delete pharmacist by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacist(@PathVariable String id) {
        return pharmacistService.deletePharmacist(id);
    }

    // Register a new pharmacist and save corresponding User for login
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createPharmacist(@RequestBody Pharmacist pharmacist, @RequestParam String password) {
        Pharmacist savedPharmacist = pharmacistService.savePharmacist(pharmacist, password);

        // Prepare response with pharmacist ID
        Map<String, String> response = new HashMap<>();
        response.put("pharmacistID", savedPharmacist.getPharmacistID());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
