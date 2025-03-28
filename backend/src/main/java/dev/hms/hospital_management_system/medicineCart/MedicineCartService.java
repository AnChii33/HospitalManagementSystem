package dev.hms.hospital_management_system.medicineCart;

import dev.hms.hospital_management_system.model.Medicine;
import dev.hms.hospital_management_system.model.MedicineItem;
import dev.hms.hospital_management_system.repository.MedicineRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineCartService {

    // Get all items in the cart
    @Getter
    private final List<MedicineItem> cart = new ArrayList<>(); // In-memory cart

    @Autowired
    private MedicineRepository medicineRepository;

    // Add a medicine to the cart
    public void addToCart(String medicineId) {
        // Fetch medicine from the database
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found with ID: " + medicineId));

        // Check if the item is already in the cart
        for (MedicineItem item : cart) {
            if (item.getMedicine().getMedicineId().equals(medicineId)) {
                item.setQuantity(item.getQuantity() + 1); // Increment by 1
                return;
            }
        }

        // Add a new item to the cart with quantity 1
        MedicineItem newItem = new MedicineItem(medicine, 1);
        cart.add(newItem);
    }

    // Remove a medicine from the cart (decrease by 1 quantity)
    public void removeFromCart(String medicineId) {
        for (MedicineItem item : cart) {
            if (item.getMedicine().getMedicineId().equals(medicineId)) {
                int newQuantity = item.getQuantity() - 1;
                if (newQuantity <= 0) {
                    cart.remove(item); // Remove the item if quantity is 0 or less
                } else {
                    item.setQuantity(newQuantity); // Decrease quantity by 1
                }
                return;
            }
        }
    }

            // Get the total price of the cart
    public double getTotalPrice() {
        return cart.stream()
                .mapToDouble(item -> item.getMedicine().getPrice() * item.getQuantity())
                .sum();
    }

    // Clear the cart
    public void clearCart() {
        cart.clear();
    }
}
