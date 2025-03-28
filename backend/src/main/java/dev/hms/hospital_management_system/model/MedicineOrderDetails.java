package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "medicine_order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineOrderDetails {

    @Id
    private String medicineOrderId;  // Unique ID for the medicine order

    @DBRef
    private Patient patient;         // Reference to the patient

    private List<MedicineItem> medicines;  // List of medicines with quantities

    private Date orderDate;
    private Date deliveryDate;
    private String deliveryStatus;
}
