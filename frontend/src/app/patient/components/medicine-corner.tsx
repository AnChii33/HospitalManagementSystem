'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

// Define types for Medicine and CartItem
interface Medicine {
  medicineId: string;
  medicineName: string;
  price: number;
  quantityInStock: number;
}

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export function MedicineCorner() {
  const [step, setStep] = useState<number>(1); // 1 = Search, 2 = Cart
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    fetchCart();
    fetchTotalPrice();
  }, []);

  const fetchCart = async () => {
    const response = await fetch('http://localhost:8080/api/medicine-cart');
    const data: CartItem[] = await response.json();
    setCart(data);
    fetchTotalPrice(); // Recalculate the total price after fetching the cart
  };

  const fetchTotalPrice = async () => {
    const response = await fetch('http://localhost:8080/api/medicine-cart/total-price');
    const total = await response.json();
    setTotalPrice(total);
  };

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/api/medicines/search?name=${searchTerm}`);
    const data: Medicine[] = await response.json();
    setSearchResults(data);
  };

  const addToCart = async (medicineId: string) => {
    await fetch(`http://localhost:8080/api/medicine-cart?medicineId=${medicineId}`, {
      method: 'POST',
    });
    fetchCart(); // Refresh the cart after adding the item
  };
  
  const removeFromCart = async (medicineId: string) => {
    await fetch(`http://localhost:8080/api/medicine-cart/${medicineId}`, {
      method: 'DELETE',
    });
    fetchCart(); // Refresh the cart after removing the item
  };

  const clearCart = async () => {
    await fetch('http://localhost:8080/api/medicine-cart', { method: 'DELETE' });
    fetchCart();
  };

  const confirmOrder = async () => {
    await fetch('http://localhost:8080/api/medicine-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medicines: cart }),
    });
    clearCart();
    alert('Order Confirmed!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Medicine Corner</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={clearCart}>Order Medicine</Button>
          </DialogTrigger>
          <DialogContent className="bg-white shadow-lg p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle>Order Medicine</DialogTitle>
            </DialogHeader>
            {step === 1 && (
              <div>
                <Label htmlFor="search">Search Medicine</Label>
                <Input
                  id="search"
                  placeholder="Enter medicine name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch} className="mt-2">Search</Button>
                <div>
                  {searchResults.map((medicine) => (
                    <div key={medicine.medicineId} className="flex justify-between items-center mt-2">
                      <p>
                        {medicine.medicineName} (Stock: {medicine.quantityInStock})
                      </p>
                      <Button onClick={() => addToCart(medicine.medicineId)}>Add to Cart</Button>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setStep(2)} disabled={cart.length === 0} className="mt-4">
                  Go to Cart
                </Button>
              </div>
            )}
            {step === 2 && (
              <div>
                <Button onClick={() => setStep(1)} className="mb-4">Back to Search</Button>
                <h3 className="font-bold mb-2">Your Cart</h3>
                {cart.map((item) => (
                  <div key={item.medicine.medicineId} className="flex justify-between items-center mt-2">
                    <p>
                      {item.medicine.medicineName} x{item.quantity} (Rs. 
                      {(item.medicine.price * item.quantity).toFixed(2)})
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={() => addToCart(item.medicine.medicineId)}>+</Button>
                      <Button onClick={() => removeFromCart(item.medicine.medicineId)}>-</Button>
                    </div>
                  </div>
                ))}
                <p className="mt-4 font-bold">Total: Rs. {totalPrice.toFixed(2)}</p>
                <Button onClick={confirmOrder} className="mt-4">
                  Confirm Order
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
