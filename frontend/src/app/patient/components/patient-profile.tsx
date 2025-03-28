'use client';

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';

interface Patient {
  patientID: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  mobileNo: string;
  bloodGroup: string;
  medicalHistory: string;
}

export function PatientProfile() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const loginID = typeof window !== "undefined" ? localStorage.getItem("loginID") : null;

      if (!loginID) {
        setError("No patient ID found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/patients/${loginID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }

        const data = await response.json();
        setPatient(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4 text-blue-500" />
          Patient Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-lg shadow-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-green-600">Patient Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : patient ? (
            <div className="space-y-4 text-gray-800">
              <p>
                <strong className="text-green-600">Patient ID:</strong> {patient.patientID}
              </p>
              <p>
                <strong className="text-green-600">Name:</strong> {patient.name}
              </p>
              <p>
                <strong className="text-green-600">Date of Birth:</strong> {patient.dob}
              </p>
              <p>
                <strong className="text-green-600">Gender:</strong> {patient.gender}
              </p>
              <p>
                <strong className="text-green-600">Address:</strong> {patient.address}
              </p>
              <p>
                <strong className="text-green-600">Mobile No:</strong> {patient.mobileNo}
              </p>
              <p>
                <strong className="text-green-600">Blood Group:</strong> {patient.bloodGroup}
              </p>
              <p>
                <strong className="text-green-600">Medical History:</strong> {patient.medicalHistory}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No patient details available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
