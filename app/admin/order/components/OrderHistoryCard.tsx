"use client";

import React from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  RotateCcw,
  Wallet,
} from "lucide-react";

type HistoryData = {
  totalOrders: number;
  totalGrandTotal: number;
  pending: number;
  processing: number;
  courier: number;
  onHold: number;
  cancelled: number;
  returned: number;
  completed: number;
  totalPaidOrders: number;
  totalPaidAmount: number;
  totalDueOrders: number;
  totalDueAmount: number;
  firstOrderDate: string;
  lastOrderDate: string;
  userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) => (
  <div className="flex items-center gap-3 rounded-xl border p-4 bg-white shadow-sm">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="text-white" size={18} />
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const OrderHistoryCard = ({ data }: { data: HistoryData }) => {



  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* User Info */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">
              {data.userInfo.firstName || ""} {data.userInfo.lastName || ""}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{data.userInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{data.userInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="font-medium">{data.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Order Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <StatCard
          label="Completed"
          value={data.completed}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          label="Pending"
          value={data.pending}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          label="Processing"
          value={data.processing}
          icon={Wallet}
          color="bg-blue-500"
        />
        <StatCard
          label="Courier"
          value={data.courier}
          icon={Truck}
          color="bg-indigo-500"
        />
        <StatCard
          label="Cancelled"
          value={data.cancelled}
          icon={XCircle}
          color="bg-red-500"
        />
        <StatCard
          label="Returned"
          value={data.returned}
          icon={RotateCcw}
          color="bg-orange-500"
        />
      </div>

      {/* Payment Summary */}
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Total Paid Orders</p>
            <p className="font-semibold">{data.totalPaidOrders}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Paid Amount</p>
            <p className="font-semibold">৳ {data.totalPaidAmount}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Due Orders</p>
            <p className="font-semibold">{data.totalDueOrders}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Due Amount</p>
            <p className="font-semibold">৳ {data.totalDueAmount}</p>
          </div>
        </div>
      </div>

      {/* Date Info */}
      <div className="rounded-xl border bg-white p-5 shadow-sm text-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <p>
            <span className="text-gray-500">First Order:</span>{" "}
            {new Date(data.firstOrderDate).toLocaleDateString()}
          </p>
          <p>
            <span className="text-gray-500">Last Order:</span>{" "}
            {new Date(data.lastOrderDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
