"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function TicketFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    categoryName: searchParams.get("categoryName") || "",
    ticketCode: searchParams.get("ticketCode") || "",
    ticketName: searchParams.get("ticketName") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minEventDate: searchParams.get("minEventDate") || "",
    maxEventDate: searchParams.get("maxEventDate") || "",
    orderBy: searchParams.get("orderBy") || "ticketCode",
    orderState: searchParams.get("orderState") || "asc",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    params.set("page", "1"); 
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      categoryName: "",
      ticketCode: "",
      ticketName: "",
      maxPrice: "",
      minEventDate: "",
      maxEventDate: "",
      orderBy: "ticketCode",
      orderState: "asc",
    });
    replace(pathname, { scroll: false }); 
  };

  return (
    <>
      <div className="collapse bg-base-100 border-base-300 border rounded-lg shadow-xs">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">Narrow down your ticket options!</div>
        <div className="collapse-content text-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
            <input
              type="text"
              name="categoryName"
              placeholder="Category Name"
              value={filters.categoryName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="text"
              name="ticketCode"
              placeholder="Ticket Code"
              value={filters.ticketCode}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="text"
              name="ticketName"
              placeholder="Ticket Name"
              value={filters.ticketName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="date"
              name="minEventDate"
              value={filters.minEventDate}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <input
              type="date"
              name="maxEventDate"
              value={filters.maxEventDate}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            />

            <select 
              name="orderBy" 
              value={filters.orderBy} 
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            >
              <option value="ticketCode">Ticket Code</option>
              <option value="ticketName">Ticket Name</option>
              <option value="categoryName">Category</option>
              <option value="eventDate">Event Date</option>
              <option value="price">Price</option>
            </select>

            <select 
              name="orderState" 
              value={filters.orderState} 
              onChange={handleChange} 
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-8 mb-4">
            <button 
              onClick={resetFilters} 
              className="btn text-white bg-slate-800 font-medium text-center rounded-xl px-5 py-2.5 uppercase hover:bg-slate-900"
            >
              Reset Filters
            </button>
            <button 
              onClick={applyFilters} 
              className="btn text-white bg-slate-800 font-medium text-center rounded-xl px-5 py-2.5 uppercase hover:bg-slate-900"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
