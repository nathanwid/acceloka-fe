"use client";

import { bookTickets, generateExcelReport } from "@/lib/api";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, deleteCart } from "@/lib/redux/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Ticket } from "@/lib/types";
import clsx from "clsx";
import { Minus, Pencil, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const EditButton = ({ bookedTicketId, ticketCode }: { bookedTicketId: number, ticketCode: string }) => {
	return (
		<Link 
			href={`/booking/edit/${bookedTicketId}/${ticketCode}`} 
			className="rounded-md border p-1 bg-orange-400 hover:bg-orange-500"
		>
			<Pencil size={20} color="#fff" />
		</Link>
	)
}

export const RevokeButton = ({ bookedTicketId, ticketCode }: { bookedTicketId: number, ticketCode: string }) => {
	return (
		<Link 
			href={`/booking/revoke/${bookedTicketId}/${ticketCode}`}
			className="rounded-md border p-1 bg-red-600 hover:bg-red-700"
		>
			<Trash2 size={20} color="#fff" />
		</Link>
	)
}

export const AddTicketButton = ({ ticket }: { ticket: Ticket }) => {
	const dispatch = useAppDispatch();

	return (
		<Link 
			href="/booking/create"
			onClick={() => dispatch(addToCart(ticket))}
			className="rounded-md border p-1 bg-green-500 hover:bg-green-600"
		>
			<ShoppingCart size={20} color="#fff" />
		</Link>
	)
}

export const DecreaseQuantityButton = ({ ticketCode }: { ticketCode: string }) => {
	const dispatch = useAppDispatch();

	return (
		<button 
			onClick={() => dispatch(decreaseQuantity(ticketCode))}
			className="rounded-md border p-1 bg-slate-800 hover:bg-slate-900 hover:cursor-pointer"
		>
			<Minus size={16} color="#fff" />
		</button>
	)
}

export const IncreaseQuantityButton = ({ ticketCode }: { ticketCode: string }) => {
	const dispatch = useAppDispatch();

	return (
		<button 
			onClick={() => dispatch(increaseQuantity(ticketCode))}
			className="rounded-md border p-1 bg-slate-800 hover:bg-slate-900 hover:cursor-pointer"
		>
			<Plus size={16} color="#fff"/>
		</button>
	)
}

export const RemoveButton = ({ ticketCode }: { ticketCode: string }) => {
	const dispatch = useAppDispatch();

	return (
		<button 
		onClick={() => dispatch(removeFromCart(ticketCode))}
		className="rounded-md border p-1 bg-red-600 hover:bg-red-700 hover:cursor-pointer"
	>
		<Trash2 size={20} color="#fff" />
	</button>
	)
}

export const CreateBookingButton = ({ tickets }: { tickets: { ticketCode: string, quantity: number}[] }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const createBooking = async () => {
		try {
			await bookTickets(new Date().toISOString(), tickets);
			dispatch(deleteCart());
			alert("Successfully created booking!")
      router.push("/"); 
		} catch (error) {
			alert(error instanceof Error ? error.message : "Failed to create booking!");
		}
	}

	return (
		<button 
			onClick={() => createBooking()}
			className="btn bg-slate-800 hover:bg-slate-900 uppercase text-white px-5 py-2.5 rounded-xl" 
		>
			Create
		</button>
	)
}

export const ExportButton = ({ bookedTicketId }: { bookedTicketId: number }) => {
  const handleExport = async () => {
    try {
      const blob = await generateExcelReport(bookedTicketId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      
      a.href = url;
      a.download = `booked_tickets_${bookedTicketId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Export failed");
    }
  };

  return (
    <button 
      className="btn bg-slate-800 hover:bg-slate-900 uppercase text-white px-5 py-2.5 rounded-xl" 
      onClick={handleExport}
    >
      Export
    </button>
  );
};

export const SubmitButton = ( {label, isPending }: { label: string, isPending: boolean }) => {
	const className = clsx(
    "btn text-white bg-slate-800 font-medium text-center rounded-xl px-5 py-2.5 uppercase hover:bg-slate-900",
    {
      "opacity-50 cursor-progress": isPending,
      "w-full": label === "Update" || label === "Revoke", 
			"min-w-[130px]": label === "Search",
    }
  );

	return (
		<button 
			type="submit" 
			className={className}
			disabled={isPending}
		>
			{ label === "Update" ? (
				<span>{isPending ? "Updating..." : "Update"}</span>
			) : label === "Revoke" ? (
				<span>{isPending ? "Revoking..." : "Revoke"}</span>
			) : (
				<span>{isPending ? "Searching..." : "Search"}</span>
			)}
		</button>
	)
}
