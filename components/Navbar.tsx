"use client";

import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'
import { useAppSelector } from '@/lib/redux/hooks';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();
  
  return (
    <div className="navbar w-full bg-base-100 px-36 shadow-md fixed top-0 z-50 border-b">
      <div className="flex-1 flex items-center">
        <Link href="/" className="btn btn-ghost text-amber-400 font-bold text-2xl bg-slate-800 hover:bg-slate-900 rounded-3xl px-4">
          ACCELOKA
        </Link>
        <ul className="menu menu-horizontal px-1 ml-5">
          <li className="text-lg font-medium mx-2"><Link href="/">Home</Link></li>
          <li className="text-lg font-medium mx-2"><Link href="/booking">Booking</Link></li>
        </ul>
      </div>
      <div className="flex flex-none gap-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCartIcon size={24} />
              { cart.length > 0 && (
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow-lg border">
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} Items</span>
              <span 
                className="text-info"
              >
                Subtotal: Rp{cart.reduce((acc, ticket) => acc + ticket.quantity * ticket.price, 0).toLocaleString("id")}
              </span>
              <div className="card-actions">
                <button 
                  className="btn bg-slate-800 hover:bg-slate-900 rounded-xl uppercase text-white btn-block mt-1"
                  onClick={() => router.push("/booking/create")}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg border">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
