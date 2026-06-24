type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileBreakAfterComma?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  mobileBreakAfterComma = false
}: PageHeroProps) {
  const [titleBeforeComma, ...titleAfterComma] = title.split("，");
  const shouldBreakOnMobile = mobileBreakAfterComma && titleAfterComma.length > 0;
  const titleLines = title.split("，");

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(var(--hero-overlay-rgb),.94), rgba(var(--hero-overlay-rgb),.38)), url("${image}")` }}
    >
      <div className="container page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className={shouldBreakOnMobile ? "has-mobile-comma-break" : undefined}>
          {shouldBreakOnMobile ? (
            <>
              {titleBeforeComma}，
              <br className="mobile-comma-break" />
              {titleAfterComma.join("，")}
            </>
          ) : (
            titleLines.map((line, index) => (
              <span className="page-hero__title-line" key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && "，"}
              </span>
            ))
          )}
        </h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
