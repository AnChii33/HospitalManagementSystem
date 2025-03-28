package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.TestOrderDetails;
import dev.hms.hospital_management_system.repository.TestOrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestOrderDetailsService {

    @Autowired
    private TestOrderDetailsRepository testOrderDetailsRepository;

    public List<TestOrderDetails> getAllTestOrders() {
        return testOrderDetailsRepository.findAll();
    }

    public ResponseEntity<TestOrderDetails> getTestOrderById(String id) {
        Optional<TestOrderDetails> testOrder = testOrderDetailsRepository.findById(id);
        return testOrder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public TestOrderDetails saveTestOrder(TestOrderDetails testOrder) {
        return testOrderDetailsRepository.save(testOrder);
    }

    public ResponseEntity<TestOrderDetails> updateTestOrder(String id, TestOrderDetails testOrderDetails) {
        Optional<TestOrderDetails> existingTestOrderOptional = testOrderDetailsRepository.findById(id);
        if (existingTestOrderOptional.isPresent()) {
            TestOrderDetails existingTestOrder = existingTestOrderOptional.get();
            // Update the existing test order fields as needed
            // e.g., existingTestOrder.setFieldName(testOrderDetails.getFieldName());
            return ResponseEntity.ok(testOrderDetailsRepository.save(existingTestOrder));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deleteTestOrder(String id) {
        if (testOrderDetailsRepository.existsById(id)) {
            testOrderDetailsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
