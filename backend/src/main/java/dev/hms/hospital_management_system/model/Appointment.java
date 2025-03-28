package dev.hms.hospital_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.time.LocalDate;

@Document(collection = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    private String appointmentId;  // Unique ID for the appointment

    @DBRef
    private Patient patient;       // Reference to the patient
    @DBRef
    private Doctor doctor;         // Reference to the doctor

    private LocalDate date;

    private LocalTime time;

    private String appointmentStatus;
}
