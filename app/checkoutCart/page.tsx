import React from "react";
import { CheckoutCart } from "./components/checkoutCarts";
import { getBrandInfo } from "@/lib/social";

const CheckOut = async () => {
  const brandInfoRaw = await getBrandInfo();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <div>
      <CheckoutCart brandInfo={brandInfo} />
    </div>
  );
};

export default CheckOut;
