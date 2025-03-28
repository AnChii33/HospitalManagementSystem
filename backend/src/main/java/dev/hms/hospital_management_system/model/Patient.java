package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    private String id;  // Unique ID for the patient
    @Indexed(unique = true)
    private String patientID;
    private String name;
    private LocalDate dob;
    private String gender;
    private String address;
    private String mobileNo;
    private String bloodGroup;
    private String medicalHistory;
}
