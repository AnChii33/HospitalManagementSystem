'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LoginPage() {
  const [LoginID, setLoginID] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Sending POST request to your Java backend
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loginID: LoginID, password: Password }), // Ensure field names match backend
    });
  
    const data = await res.json();
  
    if (res.ok) {
      // Store the role and loginId in local storage for session management
      localStorage.setItem('token', data.token); // Save the token here
      localStorage.setItem('role', data.role.toUpperCase()); // Save role in uppercase
      localStorage.setItem('loginID', LoginID); // Save the LoginID
  
      // Redirect to the appropriate dashboard based on the user role
      switch (data.role.toLowerCase()) {
        case 'patient':
          router.push(`/patient/${LoginID}`);
          break;
        case 'doctor':
          router.push('/doctor');
          break;
        case 'pathologist':
          router.push('/pathologist');
          break;
        case 'pharmacist':
          router.push('/pharmacist');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          setError('Unrecognized role.');
          break;
      }
    } else {
      console.error('Login failed:', data);
      setError(typeof data === 'string' ? data : 'Invalid credentials');
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-md border border-blue-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-800">Hospital Management System</CardTitle>
          <CardDescription className="text-center">
            Login to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loginId">User ID</Label>
              <Input
                id="loginId"
                placeholder="Enter your User ID"
                required
                value={LoginID}
                onChange={(e) => setLoginID(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit" // Ensure this is set to submit
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            Home
          </Link>
          <Link href="/signup" className="text-sm text-purple-600 hover:underline">
            New user? Sign up here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
