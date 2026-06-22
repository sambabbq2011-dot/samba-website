import Image from "next/image";
import { assetPath } from "@/lib/paths";

export function BrandMark() {
  return (
    <span className="brand-mark">
      <Image
        src={assetPath("/images/logo-samba-gemini-transparent.png")}
        alt="Samba 窯烤，2011 年創立"
        width={1173}
        height={677}
        priority
      />
    </span>
  );
}
