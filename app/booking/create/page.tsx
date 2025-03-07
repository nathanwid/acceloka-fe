import BookingTable from "@/components/Cart";

export default function CreateBookingPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create a New Booking</h1>
      </div>
      <BookingTable />
    </div>
  );
}
