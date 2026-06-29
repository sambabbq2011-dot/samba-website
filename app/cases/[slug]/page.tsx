import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import {
  caseCategories,
  caseItems,
  featuredCaseDetails,
  getCaseBySlug,
  getCaseCategory,
  getCasePath,
  getCasesByCategory,
  getCategoriesForCase
} from "@/lib/cases";
import { createMetadata } from "@/lib/metadata";

type CaseRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    ...caseCategories.map((category) => ({ slug: category.slug })),
    ...featuredCaseDetails.map((item) => ({ slug: item.detail.slug }))
  ];
}

export async function generateMetadata({
  params
}: CaseRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCaseCategory(slug);

  if (category) {
    return createMetadata(
      category.title,
      category.metaDescription,
      `/cases/${category.slug}`
    );
  }

  const caseItem = getCaseBySlug(slug);

  if (caseItem?.detail) {
    return createMetadata(
      caseItem.shortTitle,
      caseItem.metaDescription,
      `/cases/${caseItem.detail.slug}`
    );
  }

  return createMetadata(
    "活動案例",
    "查看 Samba 窯烤活動案例與外燴服務情境。",
    "/cases"
  );
}

export default async function CaseRoutePage({ params }: CaseRouteProps) {
  const { slug } = await params;
  const category = getCaseCategory(slug);

  if (category) {
    const categoryCases = getCasesByCategory(category.slug);

    return (
      <>
        <CaseCategoryNav activeSlug={category.slug} />
        <section className="section case-category-page-section">
          <div className="container">
            <div className="case-page-heading">
              <p className="eyebrow">{category.eyebrow}</p>
              <h1>{category.title}</h1>
              <p>{category.description}</p>
            </div>
            <div className="case-category-detail-list">
              {categoryCases.map((item) => (
                <article key={item.id} className="case-category-detail-card">
                  <Link
                    href={getCasePath(item)}
                    className="case-category-detail-card__image"
                  >
                    <Image
                      src={item.photos[0].src}
                      alt={item.photos[0].alt}
                      fill
                      sizes="(max-width: 800px) 100vw, 38vw"
                    />
                  </Link>
                  <div className="case-category-detail-card__content">
                    <p className="eyebrow">{item.eyebrow}</p>
                    <h2>{item.shortTitle}</h2>
                    <p>{item.summary}</p>
                    <dl className="case-brief-list">
                      <div>
                        <dt>活動類型</dt>
                        <dd>{item.eventType}</dd>
                      </div>
                      <div>
                        <dt>場地情境</dt>
                        <dd>{item.setting}</dd>
                      </div>
                      <div>
                        <dt>服務重點</dt>
                        <dd>{item.serviceFocus.join("、")}</dd>
                      </div>
                    </dl>
                    <Link href={getCasePath(item)} className="arrow-link">
                      進入完整照片案例 <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CTA />
      </>
    );
  }

  const caseItem = getCaseBySlug(slug);

  if (!caseItem?.detail) {
    notFound();
  }

  const relatedCategories = getCategoriesForCase(caseItem);

  return (
    <>
      <section className="section case-photo-entry">
        <div className="container">
          {caseItem.detail.article && (
            <article className="case-article-copy case-article-copy--top">
              <h2>
                <PipeBreakTitle title={caseItem.detail.article.title} />
              </h2>
              {caseItem.detail.article.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          )}
          <CaseGallery
            photos={caseItem.photos}
            eyebrow={caseItem.eyebrow}
            title={caseItem.shortTitle}
          />
          <div className="case-photo-footer">
            <Link href="/cases" className="arrow-link">
              回案例總覽 <span>→</span>
            </Link>
            <div className="case-tag-list">
              {relatedCategories.map((category) => (
                <Link key={category.slug} href={`/cases/${category.slug}`}>
                  {category.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function CaseCategoryNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="case-quick-nav" aria-label="案例分類快速選單">
      <div className="container case-quick-nav__inner">
        <span>案例分類</span>
        <div className="case-quick-nav__links">
          <Link href="/cases" className="case-quick-nav__link">
            全部
          </Link>
          {caseCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/cases/${category.slug}`}
              className={[
                "case-quick-nav__link",
                category.slug === activeSlug ? "is-active" : ""
              ].filter(Boolean).join(" ")}
            >
              {category.shortTitle}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function CaseGallery({
  photos,
  eyebrow,
  title
}: {
  photos: typeof caseItems[number]["photos"];
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="pet-party-gallery case-photo-gallery">
      {photos.map((photo, index) => (
        <figure
          key={photo.src}
          className={
            photo.featured
              ? "pet-party-photo pet-party-photo--featured"
              : "pet-party-photo"
          }
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              photo.featured
                ? "(max-width: 800px) 100vw, 66vw"
                : "(max-width: 800px) 100vw, 33vw"
            }
          />
          {index === 0 && (
            <figcaption className="case-photo-title">
              <p className="eyebrow eyebrow--light">{eyebrow}</p>
              <h1>
                <PipeBreakTitle title={title} />
              </h1>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function PipeBreakTitle({ title }: { title: string }) {
  const [beforePipe, ...afterPipe] = title.split("｜").map((part) => part.trim());

  if (afterPipe.length === 0) {
    return title;
  }

  return (
    <>
      <span className="pipe-break-title__line">{beforePipe}</span>
      <span className="pipe-break-title__line">{afterPipe.join("")}</span>
    </>
  );
}
