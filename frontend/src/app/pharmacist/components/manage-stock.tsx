'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';

// Define the Medicine interface
interface Medicine {
  medicineId: string;
  medicineName: string;
  price: number;
  quantityInStock: number;
}

export function ManageStock() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Fetch medicines from the database
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/medicines');
        if (response.ok) {
          const data = await response.json();
          setMedicines(
            data.map((medicine: any) => ({
              medicineId: medicine.medicineId,
              medicineName: medicine.medicineName,
              price: medicine.price,
              quantityInStock: medicine.quantityInStock,
            }))
          );
        } else {
          console.error('Failed to fetch medicines:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchMedicines();
  }, []);

  // Add Medicine Dialog Component
  const AddMedicineDialog = () => {
    const [newMedicine, setNewMedicine] = useState<Omit<Medicine, 'medicineId'>>({
      medicineName: '',
      price: 0,
      quantityInStock: 0,
    });

    const handleAddMedicine = async () => {
      if (newMedicine.medicineName && newMedicine.price && newMedicine.quantityInStock) {
        try {
          const response = await fetch('http://localhost:8080/api/medicines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMedicine),
          });

          if (response.ok) {
            const savedMedicine: Medicine = await response.json();
            setMedicines((prev) => [...prev, savedMedicine]);
            setNewMedicine({ medicineName: '', price: 0, quantityInStock: 0 });
          } else {
            console.error('Failed to save medicine:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding medicine:', error);
        }
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Medicine</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medicineName" className="col-span-4">
                Medicine Name
              </Label>
              <Input
                id="medicineName"
                value={newMedicine.medicineName}
                onChange={(e) => setNewMedicine({ ...newMedicine, medicineName: e.target.value })}
                className="col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="col-span-4">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newMedicine.price}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, price: parseFloat(e.target.value) })
                }
                className="col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantityInStock" className="col-span-4">
                Quantity In Stock
              </Label>
              <Input
                id="quantityInStock"
                type="number"
                value={newMedicine.quantityInStock}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, quantityInStock: parseInt(e.target.value, 10) })
                }
                className="col-span-4"
              />
            </div>
          </div>
          <Button onClick={handleAddMedicine}>Add Medicine</Button>
        </DialogContent>
      </Dialog>
    );
  };

  // Update Quantity Dialog Component
  const UpdateQuantityDialog: React.FC<{
    medicine: Medicine;
    onUpdate: (id: string, newQuantity: number) => void;
  }> = ({ medicine, onUpdate }) => {
    const [quantityInStock, setQuantity] = useState<string>(medicine.quantityInStock.toString());

    const handleUpdateQuantity = async () => {
      const parsedQuantity = parseInt(quantityInStock, 10);
      console.log('Medicine Object:', medicine); // Log entire medicine object
      console.log('Medicine ID:', medicine.medicineId); 
      console.log('Medicine Type:', typeof medicine.medicineId);
      if (!isNaN(parsedQuantity)) {
        console.log('Medicine ID:', medicine.medicineId); // Ensure medicine.id is valid

        if (medicine.medicineId) {
          try {
            const response = await fetch(
              `http://localhost:8080/api/medicines/${medicine.medicineId}/stock?quantity=${parsedQuantity}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            if (response.ok) {
              console.log('Update successful');
              onUpdate(medicine.medicineId, parsedQuantity); // Update the parent state
            } else {
              console.error('Failed to update quantity:', response.statusText);
            }
          } catch (error) {
            console.error('Error updating quantity:', error);
          }
        } else {
          console.error('No valid medicine ID provided.');
        }
      } else {
        console.error('Invalid quantity entered');
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update Quantity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Update Quantity for {medicine.medicineName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="updateQuantity" className="col-span-4">
                New Quantity
              </Label>
              <Input
                id="updateQuantity"
                type="number"
                value={quantityInStock}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-4"
              />
            </div>
          </div>
          <Button onClick={handleUpdateQuantity}>Update Quantity</Button>
        </DialogContent>
      </Dialog>
    );
  };

  // Handle Quantity Update
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.medicineId === id ? { ...med, quantityInStock: newQuantity } : med
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Stock</h2>
        <AddMedicineDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.medicineId}>
              <TableCell>{medicine.medicineName}</TableCell>
              <TableCell>Rs. {medicine.price.toFixed(2)}/-</TableCell>
              <TableCell>{medicine.quantityInStock}</TableCell>
              <TableCell>
                <UpdateQuantityDialog
                  medicine={medicine}
                  onUpdate={handleUpdateQuantity}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
