package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Billing;
import dev.hms.hospital_management_system.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;

    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }

    public ResponseEntity<Billing> getBillingById(String id) {
        return billingRepository.findById(id)
                .map(billing -> ResponseEntity.ok().body(billing))
                .orElse(ResponseEntity.notFound().build());
    }

    public Billing saveBilling(Billing billing) {
        return billingRepository.save(billing);
    }

    public ResponseEntity<Billing> updateBilling(String id, Billing billingDetails) {
        return billingRepository.findById(id)
                .map(existingBilling -> {
                    // Update the existing billing fields with the new details
                    existingBilling.setAppointmentId(billingDetails.getAppointmentId());
                    existingBilling.setMedicineOrderId(billingDetails.getMedicineOrderId());
                    existingBilling.setTestOrderId(billingDetails.getTestOrderId());
                    existingBilling.setDate(billingDetails.getDate());
                    existingBilling.setInsuranceDetails(billingDetails.getInsuranceDetails());
                    existingBilling.setTotalAmount(billingDetails.getTotalAmount());
                    existingBilling.setPaymentStatus(billingDetails.getPaymentStatus());

                    // Save the updated billing
                    Billing updatedBilling = billingRepository.save(existingBilling);
                    return ResponseEntity.ok(updatedBilling);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<Void> deleteBilling(String id) {
        billingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
