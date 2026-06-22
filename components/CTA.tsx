import Link from "next/link";

type CTAProps = {
  href?: string;
};

export function CTA({ href = "/booking#form" }: CTAProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <p className="eyebrow eyebrow--light">START YOUR FIESTA</p>
          <h2>下一場聚會，讓火先點起來。</h2>
          <p>告訴我們日期、人數與地點，我們會協助規劃合適的外燴內容。</p>
        </div>
        <Link href={href} className="button button--cream">
          開始規劃活動
        </Link>
      </div>
    </section>
  );
}
