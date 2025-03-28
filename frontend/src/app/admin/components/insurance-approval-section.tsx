import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

// Mock data for insurance approvals
const mockInsuranceApprovals = [
  { id: 1, patientName: 'Alice Johnson', insuranceProvider: 'HealthCare Inc.', amount: 5000 },
  { id: 2, patientName: 'Bob Smith', insuranceProvider: 'MediCover', amount: 3500 },
  { id: 3, patientName: 'Charlie Brown', insuranceProvider: 'WellnessPro', amount: 7500 },
]

export default function InsuranceApprovalsSection() {
  const [approvals, setApprovals] = useState(mockInsuranceApprovals)

  const handleApproval = (id, isApproved) => {
    // Here you would typically make an API call to update the approval status
    console.log(`Approval ${id} ${isApproved ? 'approved' : 'rejected'}`)
    setApprovals(approvals.filter(approval => approval.id !== id))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Insurance Approvals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Insurance Provider</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell>{approval.patientName}</TableCell>
              <TableCell>{approval.insuranceProvider}</TableCell>
              <TableCell>${approval.amount.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button onClick={() => handleApproval(approval.id, true)} variant="outline" size="sm">
                    Approve
                  </Button>
                  <Button onClick={() => handleApproval(approval.id, false)} variant="outline" size="sm">
                    Reject
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