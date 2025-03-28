package dev.hms.hospital_management_system.service;

import dev.hms.hospital_management_system.model.Appointment;
import dev.hms.hospital_management_system.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Fetch appointments for a patient and appointment status
    public List<Appointment> getAppointmentsByPatientIdAndStatus(String patientId, String appointmentStatus) {
        return appointmentRepository.findByPatientIdAndAppointmentStatus(patientId, appointmentStatus);
    }

    // Fetch appointments for a doctor and appointment status
    public List<Appointment> getAppointmentsByDoctorIdAndStatus(String doctorId, String appointmentStatus) {
        return appointmentRepository.findByDoctorIdAndAppointmentStatus(doctorId, appointmentStatus);
    }

    // Fetch appointments for a patient
    public List<Appointment> getAppointmentsByPatientId(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    // Fetch appointments for a doctor on a specific date
    public List<Appointment> getAppointmentsByDoctorAndDate(String doctorId, LocalDate date) {
        return appointmentRepository.findByDoctorIdAndDate(doctorId, date);
    }

    // Book a new appointment
    public Appointment bookAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Reschedule an existing appointment
    public Appointment rescheduleAppointment(String appointmentId, LocalDate newDate) {
        Optional<Appointment> existingAppointment = appointmentRepository.findById(appointmentId);
        if (existingAppointment.isEmpty()) {
            throw new IllegalArgumentException("Appointment not found");
        }

        Appointment appointment = existingAppointment.get();
        appointment.setDate(newDate);
        return appointmentRepository.save(appointment);
    }

    // Cancel an appointment
    public void cancelAppointment(String appointmentId) {
        if (!appointmentRepository.existsById(appointmentId)) {
            throw new IllegalArgumentException("Appointment not found");
        }
        appointmentRepository.deleteById(appointmentId);
    }
}
