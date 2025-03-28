import { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";

// API URLs
const API_URL_DOCTORS = 'http://localhost:8080/api/doctors';
const API_URL_PHARMACISTS = 'http://localhost:8080/api/pharmacists';
const API_URL_PATHOLOGISTS = 'http://localhost:8080/api/pathologists';

// Type for Employee
interface Employee {
  name: string;
  role: string;
  loginID: string;
  password: string;
  specialization?: string;
  day?: string;
  time?: string;
  mobileNo?: string;
}

// AddEmployeeDialog Component for adding a new employee
interface AddEmployeeDialogProps {
  onAddEmployee: (newEmployee: Employee) => void;
}

export function AddEmployeeDialog({ onAddEmployee }: AddEmployeeDialogProps) {
  const [newEmployee, setNewEmployee] = useState<Employee>({
    name: '',
    role: '',
    loginID: '',
    password: '',
    specialization: '',
    day: '',
    time: '',
    mobileNo: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const idField = newEmployee.role === 'Doctor' ? 'doctorID' :
                    newEmployee.role === 'Pharmacist' ? 'pharmacistID' :
                    'pathologistID';

    const url = `${newEmployee.role === 'Doctor' ? API_URL_DOCTORS :
                 newEmployee.role === 'Pharmacist' ? API_URL_PHARMACISTS :
                 API_URL_PATHOLOGISTS}/register?password=${encodeURIComponent(newEmployee.password)}`;

    // Create employee (Doctor, Pharmacist, or Pathologist)
    const employeeResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        [idField]: newEmployee.loginID,
        name: newEmployee.name,
        specialization: newEmployee.specialization,
        day: newEmployee.day,
        time: newEmployee.time,  // Send time as string (HH:mm)
        mobileNo: newEmployee.mobileNo
      }),
    });

    if (!employeeResponse.ok) {
      alert('Error creating employee!');
      return;
    }

    // Add the new employee to the UI
    onAddEmployee(newEmployee);
    
    // Reset form fields
    setNewEmployee({ name: '', role: '', loginID: '', password: '', specialization: '', day: '', time: '', mobileNo: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white opacity-100">
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                <SelectItem value="Pathologist">Pathologist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newEmployee.role && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
            </div>
          )}

          {newEmployee.role && (
            <>
              <div>
                <Label htmlFor="loginID">Login ID</Label>
                <Input
                  id="loginID"
                  value={newEmployee.loginID}
                  onChange={(e) => setNewEmployee({ ...newEmployee, loginID: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                />
              </div>
            </>
          )}

          {newEmployee.role === 'Doctor' && (
            <>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={newEmployee.specialization}
                  onChange={(e) => setNewEmployee({ ...newEmployee, specialization: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="day">Day</Label>
                <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, day: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent className="bg-white opacity-100">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEmployee.time}
                  onChange={(e) => setNewEmployee({ ...newEmployee, time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="mobileNo">Mobile No</Label>
                <Input
                  id="mobileNo"
                  value={newEmployee.mobileNo}
                  onChange={(e) => setNewEmployee({ ...newEmployee, mobileNo: e.target.value })}
                />
              </div>
            </>
          )}

          {(newEmployee.role === 'Pharmacist' || newEmployee.role === 'Pathologist') && (
            <div>
              <Label htmlFor="mobileNo">Mobile No</Label>
              <Input
                id="mobileNo"
                value={newEmployee.mobileNo}
                onChange={(e) => setNewEmployee({ ...newEmployee, mobileNo: e.target.value })}
              />
            </div>
          )}

          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// EmployeeSection Component to display employees
export default function EmployeeSection() {
  const [doctors, setDoctors] = useState<Employee[]>([]);
  const [pharmacists, setPharmacists] = useState<Employee[]>([]);
  const [pathologists, setPathologists] = useState<Employee[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    fetch(API_URL_DOCTORS)
      .then((res) => res.json())
      .then((data) => setDoctors(data));

    fetch(API_URL_PHARMACISTS)
      .then((res) => res.json())
      .then((data) => setPharmacists(data));

    fetch(API_URL_PATHOLOGISTS)
      .then((res) => res.json())
      .then((data) => setPathologists(data));
  }, []);

  // Add employee to the correct category after form submission
  const addEmployee = (newEmployee: Employee) => {
    switch (newEmployee.role) {
      case 'Doctor':
        setDoctors((prevDoctors) => [...prevDoctors, newEmployee]);
        break;
      case 'Pharmacist':
        setPharmacists((prevPharmacists) => [...prevPharmacists, newEmployee]);
        break;
      case 'Pathologist':
        setPathologists((prevPathologists) => [...prevPathologists, newEmployee]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <AddEmployeeDialog onAddEmployee={addEmployee} />  {/* Add Employee Button */}
      </div>

      <div className="space-y-8">
        <EmployeeTable title="Doctors" employees={doctors} columns={['Name', 'Specialization', 'Day', 'Time', 'Mobile No']} />
        <EmployeeTable title="Pharmacists" employees={pharmacists} columns={['Name', 'Mobile No']} />
        <EmployeeTable title="Pathologists" employees={pathologists} columns={['Name', 'Mobile No']} />
      </div>
    </div>
  );
}

interface EmployeeTableProps {
  title: string;
  employees: Employee[];
  columns: string[];
}

const EmployeeTable = ({ title, employees, columns }: EmployeeTableProps) => {
  return (
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, idx) => (
            <TableRow key={idx}>
              {columns.map((col, index) => (
                <TableCell key={index}>
                  {col === 'Mobile No' ? employee.mobileNo : employee[col.toLowerCase() as keyof Employee]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};