'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Calendar } from '@/src/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';



interface Appointment {
  appointmentId: string;
  doctor: {
    id: string;
    name: string;
    specialization: string;
  };
  patient: {
    id: string;
    patientID: string;
    name: string;
  };
  date: string;
  time: string;
  prescription?: {
    appointmentId: string;
    medicineDetails: string;
    instructions: string;
    dosage: string;
    date: string;
  }|null;
}

export function Appointments() {
  const doctorID = localStorage.getItem('LoginId');
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicine, setMedicine] = useState<string | null>(null);
  const [dosage, setDosage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [isinstructions, setisInstructions] = useState<boolean>(false);


    useEffect(() => {
    fetchAppointments();
  }, []);
  const convertTo12HourFormat = (time24: string) => {
    const [h, m] = time24.split(":").map(Number);
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  };



  const fetchAppointments = async () => {
    if (!doctorID) {
      alert('Doctor ID is missing. Please log in again.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/doctor/${doctorID}`);
      if (!response.ok) throw new Error(`Failed to fetch appointments: ${response.statusText}`);
      const data = await response.json();
  
      const appointmentsWithPrescriptions = await Promise.all(
        data.map(async (appointment: Appointment) => {
          const prescription = await fetchPrescriptionData(appointment.appointmentId);
          return { ...appointment, prescription };
        })
      );
  
      setAppointments(appointmentsWithPrescriptions);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert(`Failed to load appointments.`);
    }
  };
  const handlePrescribe = async(appointmentId: string) => {
    const requestData= {
      appointmentId: appointmentId,
      date: date?.toString(),
      medicineDetails: medicine,
      dosage: dosage,
      instructions: isinstructions ? instructions : '',
    };    
    try {
      const response = await fetch('http://localhost:8080/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error('Failed to write Prescription');
      alert('Prescribed successfully!');
      fetchAppointments();
      resetBooking();
    } catch (error) {
      console.error('Error Prescribing Medicine:', error);
      alert(error);
    }};

    const handleUpdate = async(appointmentId: string) => {
      const requestData= {
        date: date?.toString(),
        medicineDetails: medicine,
        dosage: dosage,
        instructions: isinstructions ? instructions : '',
      };    
      try {
        const response = await fetch(`http://localhost:8080/api/prescriptions/${appointmentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });
  
    if (!response.ok) {
      throw new Error('Failed to write Prescription');
    }
      alert('Updation successful');
        fetchAppointments();
        resetBooking();
      } catch (error) {
        console.error('Error Updating Prescription:', error);
        alert(error);
      }};

    const fetchPrescriptionData = async (appointmentId: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/prescriptions/appointment/${appointmentId}`);
        if (!response.ok) throw new Error(`Failed to fetch prescription for appointment ${appointmentId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching prescription for appointment ${appointmentId}:`, error);
        return null;
      }
    };
    



  const resetBooking = () => {
    setStep(1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.appointmentId} className="rounded-lg shadow-lg overflow-hidden border border-green-400">
            <CardContent className="bg-white p-4 font-bold ">
              <p>Patient: {appointment.patient.name}  </p>
              <p>id: {appointment.patient.patientID}</p>
              <p>Date: {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  }).format(new Date(appointment.date))}</p>
               <p>Time: {convertTo12HourFormat(appointment.time.toString())}</p> 
                
            </CardContent>
    <CardFooter className="p-3 flex justify-between items-center bg-white">
    {!appointment.prescription?(
      <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
          Generate Prescription
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-600 font-bold">Generate Prescription</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <label className="font-bold">Select Date:</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
          />
            <Button
              onClick={() => setStep(2)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Next
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-bold">Medicine:</label>
                <Input
                  type="text"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex-1">
                <label className="font-bold">Dosage:</label>
                <Input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isinstructions}
                  onChange={(e) => setisInstructions(e.target.checked)}
                />
                Add Instructions
              </label>
              {isinstructions && (
                <Input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Enter instructions"
                  className="border rounded px-2 py-1 mt-2"
                />
              )}
            </div>
            <Button
              onClick={() => handlePrescribe(appointment.appointmentId)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
            >
              Prescribe
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>):(
    <Dialog>
    <DialogTrigger asChild>
      <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg ml-2">
        Update Prescription
      </Button>
      </DialogTrigger>
          <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
                <DialogTitle className="text-green-600 font-bold">Update Prescription</DialogTitle>
                  </DialogHeader>
                  {step === 1 && (
                    <div className="flex flex-col gap-4">
                      <label className="font-bold">Select Date:</label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                      <Button
                        onClick={() => setStep(2)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="font-bold">Medicine:</label>
                          <Input
                            type="text"
                            value={medicine}
                            onChange={(e) => setMedicine(e.target.value)}
                            className="border rounded px-2 py-1"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="font-bold">Dosage:</label>
                          <Input
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="border rounded px-2 py-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isinstructions}
                            onChange={(e) => setisInstructions(e.target.checked)}
                          />
                          Add Instructions
                        </label>
                        {isinstructions && (
                          <Input
                            type="text"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Enter instructions"
                            className="border rounded px-2 py-1 mt-2"
                          />
                        )}
                      </div>
                      <Button
                        onClick={() => handleUpdate(appointment.appointmentId)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                      >
                        Update Prescription
                      </Button>
                    </div>
                  )}
          </DialogContent>
      </Dialog>)}
    </CardFooter>
  </Card>
        ))}
      </div>
    </div>
  );
}
