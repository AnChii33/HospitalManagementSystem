package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.MedicineOrderDetails;
import dev.hms.hospital_management_system.service.MedicineOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/medicine-orders")
public class MedicineOrderDetailsController {

    @Autowired
    private MedicineOrderDetailsService medicineOrderDetailsService;

    // Place an order
    @PostMapping
    public MedicineOrderDetails placeOrder(@RequestBody MedicineOrderDetails medicineOrderDetails) {
        medicineOrderDetails.setOrderDate(new Date());
        medicineOrderDetails.setDeliveryStatus("Pending");
        return medicineOrderDetailsService.placeOrder(medicineOrderDetails);
    }

    // Retrieve an order by ID
    @GetMapping("/{id}")
    public MedicineOrderDetails getOrderById(@PathVariable String id) {
        return medicineOrderDetailsService.getOrderById(id);
    }

    @GetMapping("/search")
    public List<MedicineOrderDetails> getOrdersByDeliveryStatus(@RequestParam String status) {
        return medicineOrderDetailsService.findOrdersByDeliveryStatus(status);
    }

    // Update delivery details
    @PutMapping("/{orderId}/delivery")
    public MedicineOrderDetails updateDeliveryDetails(
            @PathVariable String orderId,
            @RequestParam Date deliveryDate,
            @RequestParam String deliveryStatus
    ) {
        return medicineOrderDetailsService.updateDeliveryDetails(orderId, deliveryDate, deliveryStatus);
    }
}
