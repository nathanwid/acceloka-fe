"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "./Buttons";

export default function BookedTicketForm() {
  const [bookedTicketId, setBookedTicketId] = useState("");
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const idNumber = Number(bookedTicketId);
    if (!idNumber || idNumber <= 0) {
      return;
    }

    startTransition(() => {
      replace(`${pathname}?bookedTicketId=${idNumber}`, { scroll: false });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="number"
        value={bookedTicketId}
        onChange={(e) => setBookedTicketId(e.target.value)}
        placeholder="Enter Booked Ticket ID"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
      />
      <SubmitButton label="Search" isPending={isPending} />
      <Link href="/booking/create">
        <button 
          className="btn bg-slate-800 hover:bg-slate-900 uppercase text-white px-5 py-2.5 rounded-xl min-w-[130px]"
        >
          Create
        </button>
      </Link>
    </form>
  );
}
