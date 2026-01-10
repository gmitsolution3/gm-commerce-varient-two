import type { Metadata } from "next";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { getBrandInfo } from "@/lib/social";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin panel",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const brandInfoRaw = await getBrandInfo();
  
    const brandInfo = {
      logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
      name: brandInfoRaw?.data?.name ?? "GMIT",
      phone: brandInfoRaw?.data?.phone ?? "+88001234567",
      socials: brandInfoRaw?.data?.socials ?? [],
    };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar brandInfo={brandInfo} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10">
          <AdminHeader />
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
