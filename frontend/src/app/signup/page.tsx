'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { toast } from "@/src/hooks/use-toast"

export default function PatientSignUp() {
  const [formData, setFormData] = useState({
    patientID: '',
    name: '',
    gender: '',
    dob: '',
    address: '',
    mobileNo: '',
    email: '',
    bloodGroup: '',
    medicalHistory: '',
    password: '',
  })

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Construct the URL with query parameters
    const url = `http://localhost:8080/api/patients/register?password=${encodeURIComponent(formData.password)}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID: formData.patientID,
          name: formData.name,
          gender: formData.gender,
          dob: formData.dob,
          address: formData.address,
          mobileNo: formData.mobileNo,
          email: formData.email,
          bloodGroup: formData.bloodGroup,
          medicalHistory: formData.medicalHistory,
        }), 
      });
  
      if (response.ok) {
        const data = await response.json();
        const patientID = data.patientID;
  
        toast({
          title: "Registration Successful",
          description: `Your Patient ID is: ${patientID}`,
        });
  
        // Reset the form
        setFormData({
          patientID: '',
          name: '',
          gender: '',
          dob: '',
          address: '',
          mobileNo: '',
          email: '',
          bloodGroup: '',
          medicalHistory: '',
          password: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-md border-2 border-blue-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-800">Patient Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientID">Patient ID</Label>
              <Input
                id="patientID"
                name="patientID"
                placeholder="Enter your User ID"
                required
                value={formData.patientID}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                name="gender"
                onValueChange={(value) => handleSelectChange('gender', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile No.</Label>
              <Input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                placeholder="Enter your mobile number"
                required
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                name="bloodGroup"
                onValueChange={(value) => handleSelectChange('bloodGroup', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white">
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
              <Textarea
                id="medicalHistory"
                name="medicalHistory"
                placeholder="Enter your medical history"
                value={formData.medicalHistory}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            Home
          </Link>
          <Link href="/login" className="text-sm text-purple-600 hover:underline">
            Already have an account? Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
