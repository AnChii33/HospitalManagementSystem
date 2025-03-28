package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Medicine;
import dev.hms.hospital_management_system.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @PostMapping
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine savedMedicine = medicineService.addMedicine(medicine);
        return new ResponseEntity<>(savedMedicine, HttpStatus.CREATED);
    }

    @PutMapping
    public Medicine updateMedicine(@RequestBody Medicine medicine) {
        return medicineService.updateMedicine(medicine);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable String id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable String id) {
        return medicineService.getMedicineById(id);
    }

    @PatchMapping("/{id}/stock")
    public Medicine updateStock(@PathVariable String id, @RequestParam int quantity) {
        return medicineService.updateMedicineStock(id, quantity);
    }

    @PatchMapping("/{id}/decrement-quantity")
    public Medicine decrementQuantity(@PathVariable String id, @RequestParam int decrementBy) {
        return medicineService.decrementMedicineQuantity(id, decrementBy);
    }

    @PatchMapping("/{id}/increment-quantity")
    public Medicine incrementQuantity(@PathVariable String id, @RequestParam int incrementBy) {
        return medicineService.incrementMedicineQuantity(id, incrementBy);
    }

    @PatchMapping("/{id}/update-price")
    public Medicine updatePrice(@PathVariable String id, @RequestParam double newPrice) {
        return medicineService.updateMedicinePrice(id, newPrice);
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicines(@RequestParam String name) {
        return medicineService.searchMedicinesByName(name);
    }
}
