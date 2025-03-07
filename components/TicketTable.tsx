import { getAvailableTickets } from "@/lib/api";
import PaginationControl from "./PaginationControl";
import { AddTicketButton } from "./Buttons";
import { Ticket } from "@/lib/types";

export default async function TicketTable({
  page,
  filters,
}: {
  page: number;
  filters: {
    categoryName?: string;
    ticketCode?: string;
    ticketName?: string;
    maxPrice?: number;
    minEventDate?: string;
    maxEventDate?: string;
    orderBy: string;
    orderState: "asc" | "desc";
  };
}) {
  const pageSize = 10;
  let data;
  let errorMessage: string | null = null;

  try {
    data = await getAvailableTickets(page, filters);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to load data";
    data = null;
  }

  const tickets = data?.tickets ?? []; 
  const totalTickets = data?.totalTickets ?? 0;
  const totalPages = Math.ceil(totalTickets / pageSize);

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-gray-50">
      <table className="table table-fixed w-full border border-gray-300 rounded-xl overflow-hidden">
        <thead className="bg-amber-400">
          <tr>
            <th className="w-12 text-base py-3 px-6 text-center text-slate-800">#</th>
            <th className="w-56 text-base py-3 px-6 text-center text-slate-800">Name</th>
            <th className="w-40 text-base py-3 px-6 text-center text-slate-800">Category</th>
            <th className="w-40 text-base py-3 px-6 text-center text-slate-800">Date</th>
            <th className="w-20 text-base py-3 px-6 text-center text-slate-800">Quota</th>
            <th className="w-28 text-base py-3 px-6 text-center text-slate-800">Price</th>
            <th className="w-24 text-base py-3 px-6 text-center text-slate-800"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {tickets.length > 0 ? (
            tickets.map((ticket: Ticket, index: number) => (
              <tr key={ticket.ticketCode} className="hover:bg-gray-50">
                <th className="py-3 px-6 text-center">{(page - 1) * pageSize + index + 1}</th>
                <td className="py-3 px-6 text-center whitespace-nowrap">{ticket.ticketName}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{ticket.categoryName}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">{ticket.eventDate}</td>
                <td className="py-3 px-6 text-center">{ticket.quota}</td>
                <td className="py-3 px-6 text-center">Rp{ticket.price.toLocaleString("id")}</td>
                <td className="py-3 px-6 flex justify-center">
                  <AddTicketButton ticket={ticket} />
                </td>
              </tr>
            ))
          ) : errorMessage ? (
            <tr>
              <td colSpan={7} className="text-center">
                <div className="flex justify-center items-center mx-auto max-w-sm p-4 my-4 text-sm text-center text-red-800 rounded-lg bg-red-100" role="alert">
                  <span>{errorMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No tickets available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="join my-8 flex justify-center">
        <PaginationControl currentPage={page} totalPages={totalPages} />
      </div>
    </div>

  );
}
