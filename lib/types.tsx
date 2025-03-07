export type AddedTicket = {
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  eventDate: string;
  quota: number;
  price: number;
  quantity: number;
};

export type Ticket = {
	ticketCode: string;
	ticketName: string;
	categoryName: string;
	eventDate: string;
	quota: number;
	price: number;
};

export type BookedTicket = {
  qtyPerCategory: number;
  categoryName: string;
  tickets: {
    ticketCode: string;
    ticketName: string;
    eventDate: string;
  }[];
};