import { Suspense } from "react";
import BookedTicketTable from "@/components/BookedTicketTable";
import BookedTicketForm from "@/components/BookedTicketForm";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const bookedTicketId = Number((await searchParams).bookedTicketId) || null;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Bookings</h1>
      </div>
      <BookedTicketForm />
      <Suspense key={bookedTicketId} fallback={<p className="text-center mt-4">Loading...</p>}>
        {<BookedTicketTable bookedTicketId={bookedTicketId} />}
      </Suspense>
    </div>
  );
}
