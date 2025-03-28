package dev.hms.hospital_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {
    private String patientId; // Unique ID for the patient
    private String name; // Patient's name
    private Date dob; // Date of birth
    private String gender; // Gender
    private String address; // Address
    private String mobileNo; // Mobile number
    private String bloodGroup; // Blood group
    private String medicalHistory; // Medical history
}
