import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

// Mock data for pending test orders
const mockTestOrders = [
  { id: 1, patientName: 'Alice Johnson', testName: 'Blood Test', orderDate: '2023-06-01' },
  { id: 2, patientName: 'Bob Smith', testName: 'X-Ray', orderDate: '2023-06-02' },
  { id: 3, patientName: 'Charlie Brown', testName: 'MRI Scan', orderDate: '2023-06-03' },
]

// Mock data for pathologists
const mockPathologists = [
  { id: 1, name: 'Dr. Emily White' },
  { id: 2, name: 'Dr. Michael Green' },
  { id: 3, name: 'Dr. Sarah Black' },
]

export default function TestSchedulingSection() {
  const [testOrders, setTestOrders] = useState(mockTestOrders)

  const assignPathologist = (orderId, pathologistId) => {
    // Here you would typically make an API call to assign the pathologist
    console.log(`Assigned pathologist ${pathologistId} to test order ${orderId}`)
    setTestOrders(testOrders.filter(order => order.id !== orderId))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Test Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Assign Pathologist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.patientName}</TableCell>
              <TableCell>{order.testName}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => assignPathologist(order.id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select pathologist" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPathologists.map((pathologist) => (
                        <SelectItem key={pathologist.id} value={pathologist.id.toString()}>
                          {pathologist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={() => assignPathologist(order.id, null)} variant="outline" size="sm">
                    Assign
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}