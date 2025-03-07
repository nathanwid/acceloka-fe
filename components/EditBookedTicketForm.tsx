"use client";

import { useState } from "react";
import { editBookedTicket } from "@/lib/api";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./Buttons";

export default function EditBookedTicketForm({ bookedTicketId, ticketCode }: { bookedTicketId: number, ticketCode: string }) {
  const [quantity, setQuantity] = useState<number | "">(""); 
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (quantity === "") {
      setError("Quantity is required");
      setIsPending(false);
      return;
    }

    try {
      await editBookedTicket(bookedTicketId, {
        bookingDate: new Date().toISOString(),
        tickets: [{ ticketCode, quantity: Number(quantity) }],
      });

      router.push(`/booking?bookedTicketId=${bookedTicketId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 mt-10 p-8 shadow-md border rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-900">Update Ticket Quantity</h2>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
          <span>{error}</span>
        </div>
      )}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-900 mb-4">Ticket Code</label>
        <input
          type="text"
          value={ticketCode}
          disabled
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-900 mb-4">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
          min={0}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
        />
      </div>
      <div className="flex justify-center my-8">
        <SubmitButton label="Update" isPending={isPending} />
      </div>
    </form>
  );
}
