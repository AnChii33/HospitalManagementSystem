'use client';

import { useState, useEffect } from 'react';
import { Calendar,  VolumeIcon as  LogOut } from 'lucide-react';
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Appointments } from '../components/appointments';
import { DoctorProfile } from '../components/doctorprofile';



interface Doctor {
    id: string;
    name: string;
    specialization: string;
    day:string;
    time:string;
}

export default function DoctorDashboard() {
  const LoginID = localStorage.getItem('loginId');//This line will be removed
  const [selectedSection, setSelectedSection] = useState<string>('appointments');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!LoginID) {
        setError('Login ID not found');
        setLoading(false);
        return;
      }
      localStorage.setItem('LoginId',LoginID);
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${LoginID}`);
        if (!response.ok) { 
          throw new Error('Failed to fetch doctor data');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching Doctor:', error);
        alert('Failed to load patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [LoginID]);

  if (loading) return <p className="text-center mt-10">Loading Doctor Data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const renderContent = () => {
    switch (selectedSection) {
      case 'appointments':
        return <Appointments/>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-indigo-100">
      <div className="w-64 bg-green-250 shadow-lg border-r-2 border-gray-400">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-500">Doctor Dashboard</h2>
          <nav className="space-y-4">
            <Button
              variant={selectedSection === 'appointments' ? 'default' : 'ghost'}
              className="w-full justify-start text-left-blue-600 font-medium transition-colors hover:bg-green-400 hover:text-blue"
              onClick={() => setSelectedSection('appointments')}
            >
              <Calendar className="mr-3 h-5 w-5 text-yellow-400" />
              <span className="text-blue font-bold">Appointments</span>
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6">
          <Separator className="mb-6 bg-green-700" />
          <DoctorProfile />
          <Button variant="outline" className="w-full mt-6 text-red font-bold border-blue hover:bg-green-500 transition-colors">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-indigo-400 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome, {doctor?.name || 'Doctor'}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
