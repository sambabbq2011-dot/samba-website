import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <p className="eyebrow">404 · LOST IN THE SMOKE</p>
        <h1>這一頁已經離開烤檯。</h1>
        <p>回到首頁，繼續看看 Samba 的外燴服務。</p>
        <Link href="/" className="button button--orange">回到首頁</Link>
      </div>
    </section>
  );
}
