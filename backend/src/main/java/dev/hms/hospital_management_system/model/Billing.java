package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "billings")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Billing {

    @Id
    private String billId;             // Unique ID for the billing record
    private String patientId;          // ID of the patient
    private String appointmentId;      // ID of the appointment related to this billing
    private String medicineOrderId;    // ID of the medicine order
    private String testOrderId;        // ID of the test order
    private String date;               // Date of the billing
    private String insuranceDetails;    // Insurance details related to the billing
    private double totalAmount;         // Total amount for the billing
    private String paymentStatus;       // Payment status (e.g., Paid, Unpaid)

    // Additional methods or business logic can be added here if needed
}
