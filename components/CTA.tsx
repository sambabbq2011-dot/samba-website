import Link from "next/link";

type CTAProps = {
  href?: string;
};

export function CTA({ href = "/booking#form" }: CTAProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div className="cta-band__copy">
          <p>
            Samba 窯烤外燴｜到府巴西窯烤
            <br />
            代烤外燴服務，適合企業活動、戶外婚禮、私人派對與大型活動。
          </p>
          <p>到府服務地區：基隆、台北、新北、桃園、新竹、苗栗、台中、宜蘭；其他地區歡迎洽詢。</p>
          <p>最低消費 NT$20,000 起，實際報價依活動地點、人數、方案與服務內容調整。</p>
        </div>
        <Link href={href} className="button button--cream">
          開始規劃活動
        </Link>
      </div>
    </section>
  );
}
