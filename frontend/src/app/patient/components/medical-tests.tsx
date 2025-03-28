'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Label } from '@/src/components/ui/label'
import { Checkbox } from '@/src/components/ui/checkbox'

export function MedicalTests() {
  const [step, setStep] = useState(1)

  const resetOrder = () => {
    setStep(1)
  }

  const tests = [
    { id: 1, name: 'Blood Test', date: '2024-03-20', status: 'Scheduled' },
    { id: 2, name: 'X-Ray', date: '2024-03-05', status: 'Completed' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Medical Tests</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetOrder}>Order Test</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Medical Test</DialogTitle>
            </DialogHeader>
            {step === 1 && (
              <div>
                <Label htmlFor="test">Select Test</Label>
                <Select>
                  <SelectTrigger id="test">
                    <SelectValue placeholder="Select a test" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood">Blood Test</SelectItem>
                    <SelectItem value="xray">X-Ray</SelectItem>
                    <SelectItem value="mri">MRI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="font-bold mb-2">Payment</h3>
                <p>Total: $XX.XX</p>
                <div className="mt-4">
                  <Checkbox id="insurance" />
                  <Label htmlFor="insurance" className="ml-2">Do you have insurance?</Label>
                </div>
                {/* Add insurance details fields here */}
              </div>
            )}
            <Button onClick={() => setStep((prev) => Math.min(prev + 1, 2))}>
              {step < 2 ? 'Next' : 'Confirm Order'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {test.date}</p>
              <p>Status: {test.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}