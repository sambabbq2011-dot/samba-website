export const siteConfig = {
  name: "Samba 窯烤",
  shortName: "SAMBA",
  description:
    "Samba 窯烤提供全台行動巴西窯烤外燴，為企業活動、婚禮派對與私人聚會帶來現場炭火料理與熱情款待。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://samba.com.tw/",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  line: process.env.NEXT_PUBLIC_LINE_URL || "",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/samba__2011/",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    "https://www.facebook.com/SambaChurrasco/"
};

export function siteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/+$/, "");
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;

  return `${baseUrl}${normalizedPath}`;
}

type NavigationItem = {
  href: string;
  label: string;
  featured?: boolean;
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "關於我們" },
  { href: "/services", label: "服務項目" },
  { href: "/menu", label: "菜單方案" },
  { href: "/cases", label: "活動案例" },
  { href: "/faq", label: "常見問題" },
  { href: "/contact", label: "聯絡我們" },
  { href: "/booking", label: "預約表單", featured: true }
];

export const imageUrls = {
  hero:
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=2000&q=85",
  fire:
    "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=85",
  table:
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85",
  wedding:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  team:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
  meat:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
  gathering:
    "https://images.unsplash.com/photo-1529543544277-750e3bd39f1f?auto=format&fit=crop&w=1600&q=85"
};
