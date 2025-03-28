package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Pathologist;
import dev.hms.hospital_management_system.service.PathologistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pathologists")
public class PathologistController {

    @Autowired
    private PathologistService pathologistService;

    // Get all pathologists
    @GetMapping
    public List<Pathologist> getAllPathologists() {
        return pathologistService.getAllPathologists();
    }

    // Get pathologist by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pathologist> getPathologistById(@PathVariable String id) {
        return pathologistService.getPathologistById(id);
    }

    // Update pathologist details
    @PutMapping("/{pathologistId}")
    public ResponseEntity<Pathologist> updatePathologist(
            @PathVariable String pathologistId,
            @RequestBody Pathologist updatedPathologist) {
        return pathologistService.updatePathologist(pathologistId, updatedPathologist);
    }

    // Delete pathologist by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePathologist(@PathVariable String id) {
        return pathologistService.deletePathologist(id);
    }

    // Register a new pathologist and save corresponding User for login
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createPathologist(@RequestBody Pathologist pathologist, @RequestParam String password) {
        Pathologist savedPathologist = pathologistService.savePathologist(pathologist, password);

        // Prepare response with pathologist ID
        Map<String, String> response = new HashMap<>();
        response.put("pathologistID", savedPathologist.getPathologistID());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
