package dev.hms.hospital_management_system.controller;

import dev.hms.hospital_management_system.model.Appointment;
import dev.hms.hospital_management_system.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Get appointments by patient ID and appointment status
    @GetMapping("/patient/{patientId}/status/{appointmentStatus}")
    public List<Appointment> getAppointmentsByPatientIdAndStatus(
            @PathVariable String patientId, @PathVariable String appointmentStatus) {
        return appointmentService.getAppointmentsByPatientIdAndStatus(patientId, appointmentStatus);
    }

    // Get appointments by doctor ID and appointment status
    @GetMapping("/doctor/{doctorId}/status/{appointmentStatus}")
    public List<Appointment> getAppointmentsByDoctorIdAndStatus(
            @PathVariable String doctorId, @PathVariable String appointmentStatus) {
        return appointmentService.getAppointmentsByDoctorIdAndStatus(doctorId, appointmentStatus);
    }

    // Get appointments by patient ID
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatientId(@PathVariable String patientId) {
        return appointmentService.getAppointmentsByPatientId(patientId);
    }

    // Get appointments by doctor ID and date
    @GetMapping("/doctor/{doctorId}/date/{date}")
    public List<Appointment> getAppointmentsByDoctorAndDate(
            @PathVariable String doctorId,
            @PathVariable LocalDate date) {
        return appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
    }

    // Book a new appointment
    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // Reschedule an appointment
    @PutMapping("/reschedule/{appointmentId}")
    public Appointment rescheduleAppointment(
            @PathVariable String appointmentId,
            @RequestParam LocalDate newDate) {
        return appointmentService.rescheduleAppointment(appointmentId, newDate);
    }

    // Cancel an appointment
    @DeleteMapping("/{appointmentId}")
    public void cancelAppointment(@PathVariable String appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
    }
}