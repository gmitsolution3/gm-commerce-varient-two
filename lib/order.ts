export const getAllOrder = async () => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/all-product`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
};

export const getOrderById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/get-Order/${id}`,
    {
      next: { revalidate: 300 },
    }
  );

  return res.json();
};

export const getHistory = async (phone: string) => {
  const res = await fetch(
    `${process.env.NEXT_EXPRESS_SERVER_BASE_URL}/create-order/get-history/${phone}`,
    {
      next: { revalidate: 300 },
    }
  );
  return res.json();
};

export const MainDashboardAnalytics = async ()=>{
  const baseUrl = process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL;

  if (!baseUrl) {
    throw new Error("API Base URL is not defined in environment variables");
  }
  const res = await fetch(`${baseUrl}/create-order/dashboard-analytics`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch failed:", text);
    return { data: null };
  }

  return res.json();
}