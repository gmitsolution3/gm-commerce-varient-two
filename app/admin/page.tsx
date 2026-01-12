import { MainDashboardAnalytics } from "@/lib/order";
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

  console.log(decoded.role)

  if (decoded.role?.toLowerCase() !== "admin") {
    console.log("Role mismatch, actual:", decoded.role);
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <Dashboard result={result.data} />
    </div>
  );
}
