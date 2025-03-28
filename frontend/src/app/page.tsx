import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import {
  Stethoscope,
  Calendar,
  ClipboardList,
  Users,
  Phone,
  Mail,
  MapPin,
  LogIn,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">HMS</h1>
              <NavigationMenu>
                <NavigationMenuList className="hidden md:flex space-x-4">
                  {[
                    { href: "#features", label: "Features" },
                    { href: "#services", label: "Services" },
                    { href: "#about", label: "About" },
                    { href: "#contact", label: "Contact" },
                  ].map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Modern Healthcare Management Solution
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline your hospital operations with our comprehensive
              management system designed for efficiency and patient care
              excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
                title: "Patient Management",
                description: "Efficiently manage patient records and medical history",
              },
              {
                icon: <Calendar className="h-8 w-8 text-blue-600" />,
                title: "Appointment Scheduling",
                description: "Smart scheduling system for doctors and patients",
              },
              {
                icon: <ClipboardList className="h-8 w-8 text-blue-600" />,
                title: "Medical Records",
                description: "Secure digital storage of all medical records",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Staff Management",
                description: "Complete staff scheduling and management system",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Emergency Care",
                description: "24/7 emergency response system with real-time tracking",
              },
              {
                title: "Laboratory Management",
                description: "Digital lab reports and test management system",
              },
              {
                title: "Pharmacy Integration",
                description: "Integrated pharmacy management and inventory control",
              },
            ].map((service, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our System</h2>
              <p className="text-gray-600 mb-6">
                Our Hospital Management System is designed to revolutionize
                healthcare administration. Built with modern technology and user
                experience in mind, we provide a comprehensive solution that helps
                healthcare providers focus on what matters most - patient care.
              </p>
              <ul className="space-y-4">
                {[
                  "Intuitive user interface",
                  "HIPAA compliant security",
                  "24/7 technical support",
                  "Regular updates and maintenance",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-blue-600 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Hospital Management System"
                className="w-full h-full object-cover"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Phone className="h-6 w-6 text-blue-600" />,
                title: "Phone",
                info: "+91 9876543210",
              },
              {
                icon: <Mail className="h-6 w-6 text-blue-600" />,
                title: "Email",
                info: "support@hms.com",
              },
              {
                icon: <MapPin className="h-6 w-6 text-blue-600" />,
                title: "Address",
                info: "Kolkata",
              },
            ].map((contact, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-4">
                  {contact.icon}
                  <div>
                    <h3 className="font-semibold">{contact.title}</h3>
                    <p className="text-gray-600">{contact.info}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">HMS</h2>
            <p className="text-gray-400">© 2024 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
