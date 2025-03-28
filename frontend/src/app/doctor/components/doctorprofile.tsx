import { User } from 'lucide-react';
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';

interface Doctor {
  id: string;
  doctorID: string;
  name: string;
  mobileNo: string;
  specialization: string;
  day: string[]; // List of working days
  time: string;  // Working hours
}

export function DoctorProfile() {
  const doctorId = "DOC456";

  // State variables
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorId) {
        setError(`${doctorId}`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor data');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        setError('Failed to load doctor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Doctor Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-100 p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Doctor Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            doctor && (
              <div>
                <p><strong>Doctor ID:</strong> {doctor.doctorID}</p>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Mobile No:</strong> {doctor.mobileNo}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Working Days:</strong> {doctor.day.join(', ')}</p>
                <p><strong>Working Hours:</strong> {doctor.time}</p>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
