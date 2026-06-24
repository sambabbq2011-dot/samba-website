type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  mobileBreakAfterComma?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  mobileBreakAfterComma = false
}: SectionHeadingProps) {
  const normalizedTitle = mobileBreakAfterComma ? title.replace(/\n/g, "") : title;
  const [titleBeforeComma, ...titleAfterComma] = normalizedTitle.split("，");
  const shouldBreakOnMobile = mobileBreakAfterComma && titleAfterComma.length > 0;

  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={shouldBreakOnMobile ? "has-mobile-comma-break" : undefined}>
        {shouldBreakOnMobile ? (
          <>
            {titleBeforeComma}，
            <br className="mobile-comma-break" />
            {titleAfterComma.join("，")}
          </>
        ) : (
          title
        )}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}
