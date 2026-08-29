import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-hero-radial">
      <Container className="py-16 sm:py-20">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-light">
            <span className="h-1.5 w-4 rounded-full bg-green-light" />
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
