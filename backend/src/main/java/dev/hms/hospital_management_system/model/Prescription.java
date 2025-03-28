package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prescriptions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Prescription {
    @Id
    private String id;
    private String appointmentId; // References the Appointment
    private String medicineDetails; // Details about the medicines prescribed
    private String instructions; // Any special instructions
    private String dosage; // Dosage information
    private String date; // Date of the prescription
}
