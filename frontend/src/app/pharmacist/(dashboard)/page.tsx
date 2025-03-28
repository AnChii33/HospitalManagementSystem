'use client'
import { useState } from 'react'
import { Pill, ClipboardList, User, LogOut } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { MedicineOrders } from '../components/medicine-orders'
import { ManageStock } from '../components/manage-stock'
import { PharmacistProfile } from '../components/pharmacist-profile'

export default function PharmacistDashboard() {
    const [selectedSection, setSelectedSection] = useState('orders')
  
    const renderContent = () => {
      switch (selectedSection) {
        case 'orders':
          return <MedicineOrders />
        case 'stock':
          return <ManageStock />
        default:
          return <div>Select a section</div>
      }
    }
  
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Pharmacist Dashboard</h2>
            <nav>
              <Button
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => setSelectedSection('orders')}
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Medicine Orders
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => setSelectedSection('stock')}
              >
                <Pill className="mr-2 h-4 w-4" />
                Manage Stock
              </Button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-4">
            <Separator className="mb-4" />
            <PharmacistProfile />
            <Button variant="outline" className="w-full mt-4">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
  
        {/* Main content */}
        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome, Pharmacist</h1>
          {renderContent()}
        </div>
      </div>
    )
  }