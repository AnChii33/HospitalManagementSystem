import { User } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog'

export function PharmacistProfile() {
  const pharmacistId = typeof window !== 'undefined' ? localStorage.getItem('pharmacistId') : null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Pharmacist Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pharmacist Profile</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p><strong>Pharmacist ID:</strong> {pharmacistId || 'PH001'}</p>
          <p><strong>Name:</strong> Jane Smith</p>
          <p><strong>License Number:</strong> LIC12345</p>
          <p><strong>Email:</strong> jane.smith@pharmacy.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}