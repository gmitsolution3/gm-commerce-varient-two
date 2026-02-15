import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import Link from "next/link";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();
  const marqueeText = await getMarquee();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white">
      <div className="max-w-full bg-white">
        {/* // Top bar component */}
        <div className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 border-b border-primary/20">
          <div className="h-12 max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-white/80 font-medium">
                Welcome to our premium store
              </p>
            </div>
            <div>
              <NavBarMenu />
            </div>
            <div className="block md:hidden">
              <AccountDropdown />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 flex flex-row gap-4 lg:gap-0 justify-between items-center py-5">
            <ComLogo />
            <div className="hidden md:block">
              <HeaderSearchBar
                categories={getAllCategories.data}
                name={brandInfo.name}
                phone={brandInfo.phone}
              />
            </div>
            <BookCard />
          </div>
        </div>
        <div className="bg-white border-b border-gray-300 shadow-md">
          <MenuNavbar categories={getAllCategories.data} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
