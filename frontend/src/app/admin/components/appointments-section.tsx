import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

// Mock data for appointments
const mockAppointments = [
  { id: 1, date: '2023-06-01', time: '09:00', patientName: 'Alice Johnson', doctorName: 'Dr. John Doe' },
  { id: 2, date: '2023-06-01', time: '10:30', patientName: 'Bob Smith', doctorName: 'Dr. Jane Smith' },
  { id: 3, date: '2023-06-02', time: '14:00', patientName: 'Charlie Brown', doctorName: 'Dr. Mike Johnson' },
]

export default function AppointmentsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}