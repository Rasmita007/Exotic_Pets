"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  XCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import BuyNowForm from "../Home/BuyNowForm";

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const Navbar: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [cartOpen]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalCartPrice(newTotal);
  }, [cartItems]);

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
  
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity, price: (item.price / item.quantity) * newQuantity } : item
    );
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      const selectedProducts = cartItems.map((item) => item.name).join(", ");
      setSelectedProduct(selectedProducts);
      setIsBuyNowOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-white to-green-600 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  className="h-24 w-auto"
                  src="/Logo.png"
                  alt="Exotic Birds"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md"
                >
                  <ShoppingCartIcon className="h-7 w-7" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-8 w-8" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
              >
                Products
              </Link>
              <Link
                href="/contactuspage"
                className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
              >
                Contact Us
              </Link>

              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative text-white hover:bg-black hover:text-green-400 p-2 rounded-md"
                >
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
            <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-green-300 to-green-600 shadow-md rounded-b-md overflow-hidden z-50">
              <div className="flex flex-col items-center py-4">
                <Link
                  href="/"
                  className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
                >
                  Products
                </Link>
                <Link
                  href="/contactuspage"
                  className="text-white hover:bg-black hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {cartOpen && (
            <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg border border-gray-200 z-50 flex flex-col">
              {/* Cart Header (Fixed at the Top) */}
              <div className="flex justify-between items-center border-b p-4 bg-white shadow-md">
                <h3 className="text-xl font-bold text-gray-800">
                  Your Cart
                </h3>
                <button onClick={() => setCartOpen(false)}>
                  <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-all duration-300" />
                </button>
              </div>

              {/* Cart Items (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">
                    Your cart is empty.
                  </p>
                ) : (
                  <ul className="space-y-6">
                    {cartItems.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="flex items-center space-x-4 border-b pb-4"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md shadow-sm border"
                        />

                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-green-600 font-semibold">
                            Rs. {item.price.toFixed(2)}
                          </p>

                          <div className="flex items-center space-x-3 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700 font-bold transition-all duration-200"
                            >
                              -
                            </button>
                            <span className="text-lg text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700 font-bold transition-all duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-all duration-200"
                        >
                          ✖
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="bg-white shadow-md p-4 border-t">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>Rs. {totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-md shadow-md transition-all duration-300"
                  >
                    Go to Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {isBuyNowOpen && (
        <BuyNowForm
          productName={selectedProduct}
          onClose={() => setIsBuyNowOpen(false)}
          cartItems={cartItems}
        />
      )}
    </>
  );
};

export default Navbar;