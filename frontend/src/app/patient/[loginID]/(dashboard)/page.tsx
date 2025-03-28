'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Pill, VolumeIcon as Vial, FileText, Receipt, LogOut } from 'lucide-react';
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Appointments } from '../../components/appointments';
import { MedicineCorner } from '../../components/medicine-corner';
import { MedicalTests } from '../../components/medical-tests';
import { PatientRecords } from '../../components/patient-records';
import { Billing } from '../../components/billing';
import { PatientProfile } from '../../components/patient-profile';

interface Patient {
  name: string;
  dob: string;
  email: string;
  phone: string;
  bloodGroup: string;
  address: string;
  gender: string;
}

export default function PatientDashboard() {
  const { loginID } = useParams();
  const [selectedSection, setSelectedSection] = useState<string>('appointments');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!loginID) {
        setError('Login ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/patients/${loginID}`);
        if (!response.ok) { 
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setError('Failed to load patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [loginID]);

  if (loading) return <p className="text-center mt-10">Loading Patient Data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  
  const signOut = () => {
    // Clear specific data from localStorage
    localStorage.removeItem('loginID');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    
    // Redirect to the login page
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'appointments':
        return <Appointments />;
      case 'medicine':
        return <MedicineCorner />;
      case 'tests':
        return <MedicalTests />;
      case 'records':
        return <PatientRecords />;
      case 'billing':
        return <Billing />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-indigo-100">
      <div className="w-64 bg-green-250 shadow-lg border-r-2 border-gray-400">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-500">Patient Dashboard</h2>
          <nav className="space-y-4">
            <Button
              variant={selectedSection === 'appointments' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue"
              onClick={() => setSelectedSection('appointments')}
            >
              <Calendar className="mr-3 h-5 w-5 text-yellow-400" />
              <span className="text-blue font-bold">Appointments</span>
            </Button>
            <Button
              variant={selectedSection === 'medicine' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue-900"
              onClick={() => setSelectedSection('medicine')}
            >
              <Pill className="mr-3 h-5 w-5 text-blue-400" />
              <span className="text- font-bold">Medicine Corner</span>
            </Button>
            <Button
              variant={selectedSection === 'tests' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue-900"
              onClick={() => setSelectedSection('tests')}
            >
              <Vial className="mr-3 h-5 w-5 text-purple-400" />
              <span className="text-blue font-bold">Medical Tests</span>
            </Button>
            <Button
              variant={selectedSection === 'records' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue-900"
              onClick={() => setSelectedSection('records')}
            >
              <FileText className="mr-3 h-5 w-5 text-pink-400" />
              <span className="text-blue font-bold">Patient Records</span>
            </Button>
            <Button
              variant={selectedSection === 'billing' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue-900"
              onClick={() => setSelectedSection('billing')}
            >
              <Receipt className="mr-3 h-5 w-5 text-orange-400" />
              <span className="text-blue font-bold">Billing</span>
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6">
          <Separator className="mb-6 bg-green-700" />
          <PatientProfile />
          <Button variant="outline" className="w-full mt-6 text-red font-bold border-blue hover:bg-green-500 transition-colors" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
              Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-indigo-400 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome, {patient?.name || 'Patient'}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

