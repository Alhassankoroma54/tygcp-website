import Container from "./Container";
import Button from "./Button";

export default function CtaBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="bg-green-ink">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l1.9-4.5A8.38 8.38 0 0 1 3.5 12 8.5 8.5 0 1 1 21 11.5z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="text-sm text-white/90">{description}</p>
          </div>
        </div>
        <Button href={ctaHref} variant="outlineLight" className="border-white bg-white !text-green-ink hover:bg-white/90">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
