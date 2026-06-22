type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image
}: PageHeroProps) {
  const titleLines = title.split("，");

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(var(--hero-overlay-rgb),.94), rgba(var(--hero-overlay-rgb),.38)), url("${image}")` }}
    >
      <div className="container page-hero__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>
          {titleLines.map((line, index) => (
            <span className="page-hero__title-line" key={`${line}-${index}`}>
              {line}
              {index < titleLines.length - 1 && "，"}
            </span>
          ))}
        </h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
