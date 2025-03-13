import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { AddedTicket } from "../types";

type CartState = {
  cart: AddedTicket[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<AddedTicket, "quantity">>) => {
      const existingTicket = state.cart.find((item) => item.ticketCode === action.payload.ticketCode);
      if (!existingTicket) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const ticket = state.cart.find((item) => item.ticketCode === action.payload);
      if (ticket) {
        ticket.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.ticketCode === action.payload);
      if (index !== -1 && state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      } else {
        state.cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.ticketCode !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export function CartLoader() {
  const [cart, setCart] = useState<AddedTicket[]>([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return null;
}

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
