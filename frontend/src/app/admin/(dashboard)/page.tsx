'use client'

import { useState } from 'react'
import { Bell, Calendar, CreditCard, FileText, LogOut, Users } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import EmployeeSection from '../components/employee-section'
import AppointmentsSection from '../components/appointments-section'
import BillsSection from '../components/bills-section'
import InsuranceApprovalsSection from '../components/insurance-approval-section'
import TestSchedulingSection from '../components/test-scheduling-section'
import AdminProfile from '../components/admin-profile'

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState('employees')

  // Function to render the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'employees':
        return <EmployeeSection />
      case 'appointments':
        return <AppointmentsSection />
      case 'bills':
        return <BillsSection />
      case 'insurance':
        return <InsuranceApprovalsSection />
      case 'tests':
        return <TestSchedulingSection />
      default:
        return <div>Select a section</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <nav>
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => setSelectedSection('employees')}
            >
              <Users className="mr-2 h-4 w-4" />
              Employees
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => setSelectedSection('appointments')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => setSelectedSection('bills')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Bills
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => setSelectedSection('insurance')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Insurance Approvals
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => setSelectedSection('tests')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Schedule Tests
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4">
          <Separator className="mb-4" />
          <AdminProfile />
          <Button variant="outline" className="w-full mt-4">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin</h1>
        {renderContent()}
      </div>
    </div>
  )
}
