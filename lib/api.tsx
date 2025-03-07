const baseUrl = "http://localhost:5257/api/v1";

export const getAvailableTickets = async (
  page: number = 1,
  filters?: {
    categoryName?: string;
    ticketCode?: string;
    ticketName?: string;
    maxPrice?: number;
    minEventDate?: string;
    maxEventDate?: string;
    orderBy?: string;
    orderState?: "asc" | "desc";
  }) => {
  const params = new URLSearchParams();
  params.set("page", page.toString());

  if (filters?.categoryName) {
    params.set("categoryName", filters.categoryName)
  };

  if (filters?.ticketCode) {
    params.set("ticketCode", filters.ticketCode)
  };

  if (filters?.ticketName) {
    params.set("ticketName", filters.ticketName)
  };

  if (filters?.maxPrice) {
    params.set("maxPrice", filters.maxPrice.toString())
  };

  if (filters?.minEventDate) {
    params.set("minEventDate", filters.minEventDate)
  };

  if (filters?.maxEventDate) {
    params.set("maxEventDate", filters.maxEventDate)
  };

  const orderBy = filters?.orderBy || "ticketCode";
  const orderState = filters?.orderState || "asc";
  params.set("orderBy", orderBy);
  params.set("orderState", orderState);

  const res = await fetch(`${baseUrl}/get-available-ticket?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to fetch tickets");
  }

  return res.json();
}

export const getBookedTicketById = async (bookedTicketId: number) => {
  const res = await fetch(`${baseUrl}/get-booked-ticket/${bookedTicketId}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to fetch booked tickets");
  }

  return res.json();
}

export const generateExcelReport = async (bookedTicketId: number) => {
  const res = await fetch(`${baseUrl}/generate-excel-report/${bookedTicketId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to generate excel report");
  }

  return res.json();
}

export const bookTickets = async (bookingDate: string, tickets: { ticketCode: string, quantity: number }[]) => {
  const res = await fetch(`${baseUrl}/book-ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingDate, tickets }), 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to create a booking");
  }

  return res.json();
}

export const editBookedTicket = async (bookedTicketId: number, updatedData: { bookingDate: string, tickets: { ticketCode: string; quantity: number }[] }) => {
  const res = await fetch(`${baseUrl}/edit-booked-ticket/${bookedTicketId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to edit booked ticket");
  }

  return res.json();
};

export const revokeTicket = async (bookedTicketId: number, ticketCode: string, quantity: number) => {
  const res = await fetch(`${baseUrl}/revoke-ticket/${bookedTicketId}/${ticketCode}/${quantity}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errors?.[0] || "Failed to revoke ticket");
  }

  return res.json();
}
