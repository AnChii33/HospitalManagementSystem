package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Billing;
import dev.hms.hospital_management_system.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Ensure this import is present
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billings")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping
    public List<Billing> getAllBillings() {
        return billingService.getAllBillings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillingById(@PathVariable String id) {
        return billingService.getBillingById(id);
    }

    @PostMapping
    public ResponseEntity<Billing> createBilling(@RequestBody Billing billing) {
        Billing createdBilling = billingService.saveBilling(billing); // Call to saveBilling
        return new ResponseEntity<>(createdBilling, HttpStatus.CREATED); // Wrap the created billing in ResponseEntity
    }

    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBilling(@PathVariable String id, @RequestBody Billing billingDetails) {
        return billingService.updateBilling(id, billingDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBilling(@PathVariable String id) {
        return billingService.deleteBilling(id);
    }
}
