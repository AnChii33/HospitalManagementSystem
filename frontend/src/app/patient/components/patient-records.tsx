'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'

export function PatientRecords() {
  const [activeTab, setActiveTab] = useState('prescriptions')

  const prescriptions = [
    { id: 1, doctor: 'Dr. Smith', date: '2024-03-10', diagnosis: 'Common Cold', medicines: 'Paracetamol, Vitamin C' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-02-15', diagnosis: 'Allergic Rhinitis', medicines: 'Cetirizine, Nasal Spray' },
  ]

  const testResults = [
    { id: 1, test: 'Blood Test', date: '2024-03-05', result: 'Normal' },
    { id: 2, test: 'X-Ray', date: '2024-02-20', result: 'No abnormalities detected' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="testResults">Test Results</TabsTrigger>
        </TabsList>
        <TabsContent value="prescriptions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <CardTitle>{prescription.doctor}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {prescription.date}</p>
                  <p>Diagnosis: {prescription.diagnosis}</p>
                  <p>Medicines: {prescription.medicines}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="testResults">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testResults.map((result) => (
              <Card key={result.id}>
                <CardHeader>
                  <CardTitle>{result.test}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {result.date}</p>
                  <p>Result: {result.result}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}