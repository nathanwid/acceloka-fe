import EditBookedTicketForm from "@/components/EditBookedTicketForm";

export default async function EditBookedTicketPage({ 
  params 
}: { 
  params: Promise<{ id: string, code: string }>
}) {
  const { id, code } = await params;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <EditBookedTicketForm bookedTicketId={Number(id)} ticketCode={code} />
    </div>
  );
};
