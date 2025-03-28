package dev.hms.hospital_management_system.repository;

import dev.hms.hospital_management_system.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByDoctorId(String doctorId);
    List<Appointment> findByDoctorIdAndDate(String doctorId, LocalDate date);
    List<Appointment> findByPatientIdAndAppointmentStatus(String patientId, String appointmentStatus);
    List<Appointment> findByDoctorIdAndAppointmentStatus(String doctorId, String appointmentStatus);
}
