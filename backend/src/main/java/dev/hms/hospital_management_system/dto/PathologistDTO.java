package dev.hms.hospital_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PathologistDTO {
    private String pathologistId; // Unique ID for the pathologist
    private String name; // Pathologist's name
    private String mobileNo; // Mobile number
}
