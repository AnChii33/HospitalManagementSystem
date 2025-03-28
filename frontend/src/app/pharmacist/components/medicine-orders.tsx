'use client'

import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"

export function MedicineOrders() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const upcomingOrders = [
    { id: 1, patient: 'John Doe', medicine: 'Aspirin', quantity: 30, date: '2024-03-25' },
    { id: 2, patient: 'Jane Smith', medicine: 'Amoxicillin', quantity: 20, date: '2024-03-26' },
  ]

  const pastOrders = [
    { id: 3, patient: 'Alice Johnson', medicine: 'Ibuprofen', quantity: 50, date: '2024-03-20' },
    { id: 4, patient: 'Bob Brown', medicine: 'Lisinopril', quantity: 60, date: '2024-03-18' },
  ]

  const ScheduleDeliveryDialog = ({ orderId }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Schedule Delivery</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Delivery for Order #{orderId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryDate" className="col-span-4">
              Delivery Date
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryTime" className="col-span-4">
              Delivery Time
            </Label>
            <Input
              id="deliveryTime"
              type="time"
              className="col-span-4"
            />
          </div>
        </div>
        <Button type="submit">Confirm Schedule</Button>
      </DialogContent>
    </Dialog>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Medicine Orders</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingOrders.map((order) => (
              <Card key={order.id} className="w-full">
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <p>Patient: {order.patient}</p>
                    <p>Medicine: {order.medicine}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Date: {order.date}</p>
                  </div>
                  <ScheduleDeliveryDialog orderId={order.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <Card key={order.id} className="w-full">
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Patient: {order.patient}</p>
                  <p>Medicine: {order.medicine}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Date: {order.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}