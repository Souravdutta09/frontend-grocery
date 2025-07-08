'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API response
    const mockOrders = [
      {
        id: 'ORD123456',
        date: '2025-07-05',
        total: 499.99,
        status: 'Delivered',
      },
      {
        id: 'ORD123457',
        date: '2025-07-01',
        total: 299.49,
        status: 'Pending',
      },
    ]

    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-right font-medium text-lg">
                ₹ {order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
    