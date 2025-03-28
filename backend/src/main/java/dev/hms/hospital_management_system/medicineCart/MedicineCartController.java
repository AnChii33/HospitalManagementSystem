package dev.hms.hospital_management_system.medicineCart;

import dev.hms.hospital_management_system.model.MedicineItem;
import dev.hms.hospital_management_system.medicineCart.MedicineCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine-cart")
public class MedicineCartController {

    @Autowired
    private MedicineCartService medicineCartService;

    // Get all items in the cart
    @GetMapping
    public List<MedicineItem> getCart() {
        return medicineCartService.getCart();
    }

    // Add an item to the cart (increment by 1)
    @PostMapping
    public String addToCart(@RequestParam String medicineId) {
        medicineCartService.addToCart(medicineId);
        return "Medicine added to cart";
    }

    // Remove an item from the cart (decrement by 1)
    @DeleteMapping("/{medicineId}")
    public String removeFromCart(@PathVariable String medicineId) {
        medicineCartService.removeFromCart(medicineId);
        return "Medicine quantity updated in cart";
    }

    // Get the total price of the cart
    @GetMapping("/total-price")
    public double getTotalPrice() {
        return medicineCartService.getTotalPrice();
    }

    // Clear the cart
    @DeleteMapping
    public String clearCart() {
        medicineCartService.clearCart();
        return "Cart cleared";
    }
}
