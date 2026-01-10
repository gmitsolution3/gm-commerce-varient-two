import Image from "next/image";
import Link from "next/link";

export const ComLogo = ({logo}:{logo:string}) => {
  return (
    <Link href="/">
      <div className="hover:cursor-pointer">
        <Image
          src={logo || "/placeholder.svg"}
          alt="logo"
          width={79}
          height={66}
        />
      </div>
    </Link>
  );
};
