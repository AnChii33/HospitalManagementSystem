package dev.hms.hospital_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private String doctorId; // Unique ID for the doctor
    private String name; // Doctor's name
    private String mobileNo; // Mobile number
    private String specialization; // Specialization of the doctor
    private String schedule; // Schedule for the doctor
}
