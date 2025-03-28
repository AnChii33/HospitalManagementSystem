package dev.hms.hospital_management_system.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineItem {

    @DBRef
    private Medicine medicine;       // Reference to the medicine

    private int quantity;            // Quantity of the medicine

}
