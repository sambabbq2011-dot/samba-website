import Image from "next/image";

export function BrandMark() {
  return (
    <span className="brand-mark">
      <Image
        src="/images/logo-samba-brush-transparent.png"
        alt="Samba 窯烤，2011 年創立"
        width={1200}
        height={849}
        priority
      />
    </span>
  );
}
