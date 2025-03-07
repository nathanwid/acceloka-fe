import TicketFilter from "@/components/TicketFilter";
import TicketTable from "@/components/TicketTable";

export default async function HomePage({ 
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const filters = {
    categoryName: resolvedParams.categoryName || undefined,
    ticketCode: resolvedParams.ticketCode || undefined,
    ticketName: resolvedParams.ticketName || undefined,
    maxPrice: Number(resolvedParams.maxPrice) || undefined,
    minEventDate: resolvedParams.minEventDate || undefined,
    maxEventDate: resolvedParams.maxEventDate || undefined,
    orderBy: resolvedParams.orderBy || "ticketCode",
    orderState: (resolvedParams.orderState as "asc" | "desc") || "asc",
  };

  return (
    <div className="p-6"> 
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Available Tickets</h1>
      </div>
      <div className="mb-12">
        <TicketFilter />
      </div>
      <TicketTable page={page} filters={filters} />
    </div>
  );
}
