"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, XCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import BuyNowForm from "../Home/BuyNowForm"; // Removed unused import

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Navbar: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  // const [isBuyNowOpen, setIsBuyNowOpen] = useState(false); // Removed unused state
  // const [selectedProduct, setSelectedProduct] = useState<string>(""); // Removed unused state
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cartOpen]);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCartPrice(newTotal);
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // const updateQuantity = (id: number, newQuantity: number) => { // Removed unused function
  //   if (newQuantity < 1) return;

  //   const updatedCart = cartItems.map((item) =>
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   );

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  //   window.dispatchEvent(new Event("cartUpdated"));
  // };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // const selectedProducts = cartItems.map((item) => item.name).join(", "); // Removed unused variable
      // setSelectedProduct(selectedProducts);  // Removed unused state update
      // setIsBuyNowOpen(true);  // Removed unused state update

      // TODO: Implement checkout logic here.  For example, redirect to a checkout page
      // or open a modal with checkout form.  Since BuyNowForm is not used,
      // the appropriate logic should be implemented here.
      console.log("Checkout initiated with cart items:", cartItems);
      alert("Checkout initiated!  Implement your checkout logic here."); // Replace with actual checkout flow.
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-white to-green-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" aria-label="Go to homepage">
                <Image className="h-24 w-auto" src="/Logo.png" alt="Exotic Birds" width={120} height={40} priority />
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md">
                  <ShoppingCartIcon className="h-7 w-7" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500">
                <Bars3Icon className="h-8 w-8" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Home
              </Link>
              <Link href="/Product" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Products
              </Link>
              <Link href="/#contact" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                Contact Us
              </Link>

              <div className="relative">
                <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md">
                  <ShoppingCartIcon className="h-7 w-7" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-green-600 shadow-md rounded-b-md overflow-hidden z-50">
              <div className="flex flex-col items-center py-4">
                <Link href="/" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                  Home
                </Link>
                <Link href="/Product" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                  Products
                </Link>
                <Link href="/#contact" className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold">
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {cartOpen && (
            <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-lg rounded-lg p-4 z-50 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Cart</h3>
                <button onClick={() => setCartOpen(false)}>
                  <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-sm mt-4">Your cart is empty.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center space-x-4 border-b pb-2">
                      <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md" />
                      <div className="flex-1">
                        <p className="text-md font-semibold text-gray-700">{item.name}</p>
                        <p className="text-sm text-green-600">Rs. {item.price.toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">✖</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {cartItems.length > 0 && (
                <div>
                  <div className="font-bold text-gray-800 mt-2">Total: Rs. {totalCartPrice.toFixed(2)}</div>
                  <button onClick={handleCheckout} className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Go to Checkout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;