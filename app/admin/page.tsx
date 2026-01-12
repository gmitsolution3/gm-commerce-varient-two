import { MainDashboardAnalytics } from "@/lib/order";
import { AnalyticsDashboard } from "./components/adminDashboard";
import Dashboard from "./components/adminMainDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function AdminDashboard() {
  const result = await MainDashboardAnalytics();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log(token);

  if (!token) {
    redirect("/auth/sign-in");
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err: any) {
    redirect("/auth/sign-in");
  }

  if (decoded.role !== "admin") {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      {/* <AnalyticsDashboard /> */}
      <Dashboard result={result.data} />
    </div>
  );
}
