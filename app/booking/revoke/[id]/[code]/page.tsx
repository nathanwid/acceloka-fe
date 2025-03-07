import RevokeTicketForm from "@/components/RevokeTicketForm";

export default async function RevokeTicketPage({ 
  params 
}: { 
  params: Promise<{ id: string; code: string }>
}) {
  const { id, code } = await params;

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <RevokeTicketForm bookedTicketId={Number(id)} ticketCode={code} />
    </div>
  );
};
