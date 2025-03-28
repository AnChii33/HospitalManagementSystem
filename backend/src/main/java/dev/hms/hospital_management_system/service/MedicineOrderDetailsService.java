package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.MedicineOrderDetails;
import dev.hms.hospital_management_system.repository.MedicineOrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class MedicineOrderDetailsService {

    @Autowired
    private MedicineOrderDetailsRepository medicineOrderDetailsRepository;

    public MedicineOrderDetails placeOrder(MedicineOrderDetails medicineOrderDetails) {
        return medicineOrderDetailsRepository.save(medicineOrderDetails);
    }

    public MedicineOrderDetails getOrderById(String id) {
        Optional<MedicineOrderDetails> order = medicineOrderDetailsRepository.findById(id);
        if (order.isEmpty()) {
            throw new RuntimeException("Order not found for ID: " + id);
        }
        return order.get();
    }

    public List<MedicineOrderDetails> findOrdersByDeliveryStatus(String status) {
        return medicineOrderDetailsRepository.findByDeliveryStatus(status);
    }

    // Update delivery date and status
    public MedicineOrderDetails updateDeliveryDetails(String orderId, Date deliveryDate, String deliveryStatus) {
        MedicineOrderDetails order = medicineOrderDetailsRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found for ID: " + orderId));

        order.setDeliveryDate(deliveryDate);
        order.setDeliveryStatus(deliveryStatus);
        return medicineOrderDetailsRepository.save(order);
    }

}

