package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.TestOrderDetails;
import dev.hms.hospital_management_system.service.TestOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-orders")
public class TestOrderDetailsController {

    @Autowired
    private TestOrderDetailsService testOrderService;

    @GetMapping
    public List<TestOrderDetails> getAllTestOrders() {
        return testOrderService.getAllTestOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestOrderDetails> getTestOrderById(@PathVariable String id) {
        return testOrderService.getTestOrderById(id);
    }

    @PostMapping
    public ResponseEntity<TestOrderDetails> createTestOrder(@RequestBody TestOrderDetails testOrder) {
        TestOrderDetails createdTestOrder = testOrderService.saveTestOrder(testOrder);
        return ResponseEntity.status(201).body(createdTestOrder); // Return the created test order
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestOrderDetails> updateTestOrder(@PathVariable String id, @RequestBody TestOrderDetails testOrderDetails) {
        return testOrderService.updateTestOrder(id, testOrderDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestOrder(@PathVariable String id) {
        return testOrderService.deleteTestOrder(id);
    }
}
