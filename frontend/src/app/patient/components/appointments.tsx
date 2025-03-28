'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Calendar } from '@/src/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group';
import { useToast } from '@/src/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  day: string;
  time: string;
}

interface Appointment {
  appointmentId: string;
  doctor: {
    id: string;
    name: string;
    specialization: string;
  };
  patient: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
  appointmentStatus: string;
}

export function Appointments() {
  const patientID = localStorage.getItem('loginID');
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
  const { toast } = useToast();

  useEffect(() => {
    if (patientID) {
      fetchDoctors();
      fetchAppointments(activeTab);
    } else {
      alert('Please log in.');
    }
  }, [patientID, activeTab]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/doctors');
      const data: Doctor[] = await response.json();
      setDoctors(data);
      setSpecializations([...new Set(data.map((doc) => doc.specialization))]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load doctor data.',
        variant: 'destructive',
      });
    }
  };

  const fetchAppointments = async (status: "Upcoming" | "Past") => {
    if (!patientID) {
      console.error("Patient ID not found in localStorage");
      toast({
        title: "Error",
        description: "You need to log in to view appointments.",
        variant: "destructive",
      });
      return;
    }
  
    let patientData;
    try {
      // Fetch patient details
      const patientResponse = await fetch(`http://localhost:8080/api/patients/${patientID}`);
      if (!patientResponse.ok) throw new Error(`Failed to fetch patient details: ${patientResponse.statusText}`);
      patientData = await patientResponse.json();
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch patient details.",
        variant: "destructive",
      });
      return; // Exit early if patient details can't be fetched
    }
  
    try {
      // Fetch appointments based on the status
      const response = await fetch(
        `http://localhost:8080/api/appointments/patient/${patientData.id}/status/${status}`
      );
      if (!response.ok) throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      const data: Appointment[] = await response.json();
      if (status === "Upcoming") {
        setUpcomingAppointments(data);
      } else {
        setPastAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to load appointments.",
        variant: "destructive",
      });
    }
  };
  

  const separateAppointments = (appointments: Appointment[]) => {
    const now = new Date();
    const upcoming = appointments.filter((appointment) => new Date(appointment.date) >= now);
    const past = appointments.filter((appointment) => new Date(appointment.date) < now);
    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  };

  const handleSpecializationSelection = (specialization: string) => {
    setSelectedSpecialization(specialization);
    setFilteredDoctors(doctors.filter((doc) => doc.specialization === specialization));
  };

  const handleDoctorSelection = (doctorId: string) => {
    const doctor = filteredDoctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor || null);
  };

  const handleDateSelection = (date: Date | undefined) => {
    if (date) setSelectedDate(date);
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate) {
      toast({
        title: 'Booking Error',
        description: 'Please complete all steps before booking.',
        variant: 'destructive',
      });
      return;
    }
  
    if (!patientID) {
      toast({
        title: 'Booking Error',
        description: 'Patient ID is missing.',
        variant: 'destructive',
      });
      return;
    }
  
    // Fetch patient details
    let patientData;
    try {
      const patientResponse = await fetch(`http://localhost:8080/api/patients/${patientID}`);
      if (!patientResponse.ok) throw new Error('Failed to fetch patient details');
      patientData = await patientResponse.json();
    } catch (error) {
      console.error('Error fetching patient details:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch patient details.',
        variant: 'destructive',
      });
      return;
    }
  
    // Format selectedDate as 'YYYY-MM-DD' to prevent any time zone shifts
    const localDate = selectedDate.toLocaleDateString('en-CA'); // en-CA gives 'YYYY-MM-DD' format
  
    // Construct the requestData with patient's details
    const requestData = {
      doctor: {
        id: selectedDoctor.id,
        name: selectedDoctor.name,
        specialization: selectedDoctor.specialization,
      },
      patient: { id: patientData.id, name: patientData.name }, // Use actual patient data
      date: localDate, // Use LocalDate format
      time: selectedDoctor.time?.split(' - ')[0] || 'N/A',
      appointmentStatus: 'Upcoming', // Set status as "Upcoming"
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) throw new Error('Failed to book appointment');
  
      const newAppointment: Appointment = await response.json();
      setAppointments([...appointments, newAppointment]);
      setUpcomingAppointments([...upcomingAppointments, newAppointment]);
      toast({
        title: 'Appointment Booked',
        description: `Your appointment with Dr. ${selectedDoctor.name} on ${selectedDate.toDateString()} has been booked.`,
      });
      resetBooking();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to book the appointment.',
        variant: 'destructive',
      });
    }
  };
  
  
  
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to cancel appointment');
      setAppointments(appointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      setUpcomingAppointments(upcomingAppointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      toast({
        title: 'Appointment Cancelled',
        description: 'Your appointment has been cancelled.',
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel the appointment.',
        variant: 'destructive',
      });
    }
  };

  const handleRescheduleAppointment = async (appointmentId: string, newDate: Date) => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/reschedule/${appointmentId}?newDate=${newDate.toISOString()}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to reschedule appointment');
      const updatedAppointment: Appointment = await response.json();
      setAppointments(appointments.map((appointment) => appointment.appointmentId === appointmentId ? updatedAppointment : appointment));
      setUpcomingAppointments(upcomingAppointments.map((appointment) => appointment.appointmentId === appointmentId ? updatedAppointment : appointment));
      toast({
        title: 'Appointment Rescheduled',
        description: 'Your appointment has been rescheduled.',
      });
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to reschedule the appointment.',
        variant: 'destructive',
      });
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSpecialization('');
    setFilteredDoctors([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">My Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetBooking}>Book Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white shadow-lg">
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
            </DialogHeader>
            {step === 1 && (
              <div className="grid gap-4 py-4">
                <Label htmlFor="specialization">Specialization</Label>
                <Select onValueChange={handleSpecializationSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((specialization) => (
                      <SelectItem key={specialization} value={specialization}>
                        {specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {filteredDoctors.length > 0 && (
                  <div>
                    <Label>Select a Doctor</Label>
                    <RadioGroup onValueChange={handleDoctorSelection}>
                      {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={doctor.id} id={doctor.id} />
                          <Label htmlFor={doctor.id}>
                            Dr. {doctor.name} - {doctor.day} ({doctor.time})
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                <Button onClick={() => setStep(2)} disabled={!selectedDoctor}>
                  Next
                </Button>
              </div>
            )}
            {step === 2 && selectedDoctor && (
              <div className="grid gap-4 py-4">
                <Label>Select a Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleDateSelection}
                  disabled={(date) => {
                    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                    return !selectedDoctor.day?.includes(dayName);
                  }}
                  className="rounded-md border"
                />
                <Button onClick={handleBookAppointment} disabled={!selectedDate}>
                  Book Appointment
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value as "Upcoming" | "Past");
        fetchAppointments(value as "Upcoming" | "Past"); // Fetch appointments on tab change
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="grid gap-4 mt-8">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.appointmentId} className="flex flex-row items-center justify-between">
                <CardContent className="flex-grow p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Dr. {appointment.doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                    </div>
                    <p className="text-sm">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end p-4">
                  <Button variant="outline" size="sm" onClick={() => handleCancelAppointment(appointment.appointmentId)}>
                    Cancel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleRescheduleAppointment(appointment.appointmentId, new Date())}>
                    Reschedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-4 mt-8">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.appointmentId} className="flex flex-row items-center justify-between">
                <CardContent className="flex-grow p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Dr. {appointment.doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.doctor.specialization}</p>
                    </div>
                    <p className="text-sm">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end p-4">
                  <Button variant="outline" size="sm" disabled>
                    Completed
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

