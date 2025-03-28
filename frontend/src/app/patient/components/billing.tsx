import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'

export function Billing() {
  const bills = [
    { id: 1, type: 'Appointment', amount: 150, date: '2024-03-10', description: 'Consultation with Dr. Smith' },
    { id: 2, type: 'Medicine', amount: 50, date: '2024-03-15', description: 'Prescription medications' },
    { id: 3, type: 'Test', amount: 200, date: '2024-03-20', description: 'Blood Test' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Billing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bills.map((bill) => (
          <Card key={bill.id}>
            <CardHeader>
              <CardTitle>{bill.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Amount: ${bill.amount}</p>
              <p>Date: {bill.date}</p>
              <p>Description: {bill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}