import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand brand--light">
            <BrandMark />
          </Link>
          <p className="footer-copy">
            把炭火、香氣與熱情帶到你的活動現場。
            <br />
            全台行動巴西窯烤外燴。
          </p>
        </div>
        <div>
          <p className="footer-title">網站導覽</p>
          <div className="footer-links">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-title">追蹤 Samba</p>
          <div className="footer-links">
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <Link href="/contact">活動詢問</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Samba 窯烤</span>
        <span>Fire · Flavor · Fiesta</span>
      </div>
    </footer>
  );
}
