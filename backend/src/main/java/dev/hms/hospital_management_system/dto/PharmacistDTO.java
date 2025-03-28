package dev.hms.hospital_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PharmacistDTO {
    private String pharmacistId; // Unique ID for the pharmacist
    private String name; // Pharmacist's name
    private String mobileNo; // Mobile number
}
