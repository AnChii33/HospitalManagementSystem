package dev.hms.hospital_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.hms.hospital_management_system.model.Admin;
import dev.hms.hospital_management_system.repository.AdminRepository;
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Validate the passkey
    public boolean validatePasskey(String passkey) {
        Admin admin = adminRepository.findById("adminId").orElse(null); // Assuming a fixed ID for the admin
        return admin != null && admin.getPasskey().equals(passkey);
    }
}
