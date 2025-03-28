import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

// Mock data for bills
const mockBills = [
  { id: 1, date: '2023-06-01', time: '10:15', type: 'Appointment', amount: 150, patientName: 'Alice Johnson' },
  { id: 2, date: '2023-06-01', time: '11:30', type: 'Medicine Order', amount: 75.50, patientName: 'Bob Smith' },
  { id: 3, date: '2023-06-02', time: '14:45', type: 'Test Order', amount: 200, patientName: 'Charlie Brown' },
]

export default function BillsSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Paid Bills</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Patient Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.date}</TableCell>
              <TableCell>{bill.time}</TableCell>
              <TableCell>{bill.type}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell>{bill.patientName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}