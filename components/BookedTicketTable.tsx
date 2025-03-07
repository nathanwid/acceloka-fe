import { getBookedTicketById } from "@/lib/api";
import { EditButton, RevokeButton, ExportButton } from "./Buttons";
import { BookedTicket } from "@/lib/types";

export default async function BookedTicketTable({ bookedTicketId }: { bookedTicketId: number | null }) {
  let bookedTickets: BookedTicket[] = [];
  let errorMessage: string | null = null;

  if (bookedTicketId !== null) {
    try {
      bookedTickets = await getBookedTicketById(bookedTicketId);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Failed to load data";
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-gray-50">
      <table className="table w-full border border-gray-300 rounded-xl overflow-hidden">
        <thead className="bg-amber-400">
          <tr>
            <th className="w-12 text-base py-3 px-6 text-center text-slate-800">#</th>
            <th className="w-40 text-base py-3 px-6 text-center text-slate-800">Category</th>
            <th className="w-20 text-base py-3 px-6 text-center text-slate-800">Quantity</th>
            <th className="w-36 text-base py-3 px-6 text-center text-slate-800">Code</th>
            <th className="w-56 text-base py-3 px-6 text-center text-slate-800">Name</th>
            <th className="w-40 text-base py-3 px-6 text-center text-slate-800">Date</th>
            <th className="w-36 text-base py-3 px-6 text-center text-slate-800"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {errorMessage ? (
            <tr>
              <td colSpan={7} className="text-center">
                <div className="flex justify-center items-center mx-auto max-w-sm p-4 my-4 text-sm text-center text-red-800 rounded-lg bg-red-100" role="alert">
                  <span>{errorMessage}</span>
                </div>
              </td>
            </tr>
          ) : bookedTicketId === null ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                Enter a Booked Ticket ID to view tickets
              </td>
            </tr>
          ) : bookedTickets.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                No booked tickets found
              </td>
            </tr>
          ) : (
            bookedTickets.map((category, categoryIndex) =>
              category.tickets.map((ticket, ticketIndex) => (
                <tr key={`${category.categoryName}-${ticket.ticketCode}`} className="hover:bg-gray-50">
                  <th className="py-3 px-6 text-center">{categoryIndex + 1}.{ticketIndex + 1}</th>
                  <td className="py-3 px-6 text-center">{ticketIndex === 0 ? category.categoryName : ""}</td>
                  <td className="py-3 px-6 text-center">{ticketIndex === 0 ? category.qtyPerCategory : ""}</td>
                  <td className="py-3 px-6 text-center">{ticket.ticketCode}</td>
                  <td className="py-3 px-6 text-center">{ticket.ticketName}</td>
                  <td className="py-3 px-6 text-center">{ticket.eventDate}</td>
                  <td className="py-3 px-6 flex justify-center items-center gap-2">
                    <EditButton bookedTicketId={bookedTicketId} ticketCode={ticket.ticketCode} />
                    <RevokeButton bookedTicketId={bookedTicketId} ticketCode={ticket.ticketCode} />
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      {bookedTickets.length > 0 && bookedTicketId !== null && (
        <div className="my-8 mx-8">
          <ExportButton bookedTicketId={bookedTicketId} />
        </div>
      )}
    </div>
  );
}
