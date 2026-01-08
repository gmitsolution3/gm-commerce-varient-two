import React from "react";
import { Banner } from "../components/banner";
import ProductSliderSection from "@/app/components/heroSlider";

const GeneralSection = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/banner`,
    {
      next: { revalidate: 300 },
    }
  ).then((res) => res.json());

  const { mainBanner, secondBanner, thirdBanner } = result.data || {
    mainBanner: [],
    secondBanner: [],
    thirdBanner: [],
  };

  const toArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);

  const secondSlider =
    [
      { id: "side-1", images: toArray(secondBanner) },
      { id: "side-2", images: toArray(thirdBanner) },
    ].flat() || [];

  const mainSlider = { id: "main", images: toArray(mainBanner) };


  if (!result.success) {
    return (
      <div className="min-w-full mx-auto">Failed to load banner data.</div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1>preview</h1>
        <ProductSliderSection
          mainSlider={mainSlider}
          sideSliders={secondSlider}
        />
      </div>
      <div>
        <Banner />
      </div>
    </div>
  );
};

export default GeneralSection;
