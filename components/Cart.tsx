"use client";

import { useAppSelector } from '@/lib/redux/hooks';
import React from 'react'
import { CreateBookingButton, DecreaseQuantityButton, IncreaseQuantityButton, RemoveButton } from './Buttons';
import { AddedTicket } from '@/lib/types';

export default function Cart() {
	const cart = useAppSelector((state) => state.cart);

  return (
		<div className="overflow-x-auto rounded-xl shadow-md bg-gray-50">
			<table className="table w-full table-fixed border border-gray-300 rounded-xl overflow-hidden">
				<thead className="bg-amber-400">
					<tr>
						<th className="w-12 text-base py-3 px-6 text-center text-slate-800">#</th>
						<th className="w-64 text-base py-3 px-6 text-center text-slate-800">Name</th>
						<th className="w-40 text-base py-3 px-6 text-center text-slate-800">Date</th>
						<th className="w-32 text-base py-3 px-6 text-center text-slate-800">Price</th>
						<th className="w-40 text-base py-3 px-6 text-center text-slate-800">Quantity</th>
						<th className="w-32 text-base py-3 px-6 text-center text-slate-800">Total</th>
						<th className="w-32 text-base py-3 px-6 text-center text-slate-800"></th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{cart.length > 0 ? (
						<>
							{cart.map((ticket: AddedTicket, index: number) => (
								<tr key={ticket.ticketCode} className="hover:bg-gray-50">
									<th className="py-3 px-6 text-center">{index + 1}</th>
									<td className="py-3 px-6 text-center">{ticket.ticketName}</td>
									<td className="py-3 px-6 text-center">{ticket.eventDate}</td>
									<td className="py-3 px-6 text-center">Rp{ticket.price.toLocaleString("id")}</td>
									<td className="flex items-center justify-center gap-2 py-3 px-6">
										<DecreaseQuantityButton ticketCode={ticket.ticketCode} />
										<span className="w-6 text-center">{ticket.quantity}</span>
										<IncreaseQuantityButton ticketCode={ticket.ticketCode} />
									</td>
									<td className="py-3 px-6 text-center">Rp{(ticket.quantity * ticket.price).toLocaleString("id")}</td>
									<td className="py-3 px-6 flex justify-center">
										<RemoveButton ticketCode={ticket.ticketCode} />
									</td>
								</tr>
							))}
							<tr className="bg-white">
								<td colSpan={5} className="py-3 px-6 text-right text-md font-semibold uppercase">Subtotal</td>
								<td className="py-3 px-6 text-center text-md font-semibold">
									Rp{cart.reduce((acc, ticket) => acc + ticket.quantity * ticket.price, 0).toLocaleString("id")}
								</td>
								<td className="py-3 px-6"></td>
							</tr>
						</>
					) : (
						<tr>
							<td colSpan={7} className="text-center py-4">No tickets added</td>
						</tr>
					)}
				</tbody>
			</table>
			<div className="flex justify-center">
				{cart.length > 0 && (
					<div className="my-8 mx-8">
						<CreateBookingButton tickets={cart} />
					</div>
				)}
			</div>
		</div>
  )
}
