import Image from "next/image";
import { assetPath } from "@/lib/paths";

type BrandMarkProps = {
  variant?: "header" | "footer";
};

export function BrandMark({ variant = "footer" }: BrandMarkProps) {
  const isHeader = variant === "header";

  return (
    <span className="brand-mark">
      <Image
        src={assetPath(
          isHeader
            ? "/images/logo-samba-brush-transparent.png"
            : "/images/logo-samba-gemini-transparent.png"
        )}
        alt="Samba 窯烤，2011 年創立"
        width={isHeader ? 1200 : 1173}
        height={isHeader ? 849 : 677}
        priority
      />
    </span>
  );
}
