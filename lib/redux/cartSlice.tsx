import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

type Ticket = {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  eventDate: string;
  quota: number;
  price: number;
  quantity: number;
};

type CartState = {
  cart: Ticket[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<Ticket, "quantity">>) => {
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

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;

export function CartLoader() {
  const [cart, setCart] = useState<Ticket[]>([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  return null;
}
