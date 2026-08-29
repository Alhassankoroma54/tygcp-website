import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import QuestionForm from "@/components/forms/QuestionForm";

export const metadata: Metadata = { title: "Get Involved" };

const ways = [
  {
    title: "Be a Guest",
    description: "Share your expertise or experience on an upcoming episode as a guest or panelist.",
  },
  {
    title: "Volunteer",
    description: "Support outreach, production or the Youth Advisory Panel as a volunteer.",
  },
  {
    title: "Suggest a Topic",
    description: "Tell us what governance issue matters most to you and your community.",
  },
  {
    title: "Partner or Sponsor",
    description: "Support the programme as an institutional partner or sponsor.",
  },
  {
    title: "Join the Youth Advisory Panel",
    description: "Help shape topics, accessibility and youth participation as a panel member.",
  },
  {
    title: "Join the Mailing List",
    description: "Get episode alerts, event invitations and project updates in your inbox.",
  },
];

export default function GetInvolvedPage() {
  return (
    <div>
      <PageHero
        eyebrow="Join the movement"
        title="Get Involved"
        description="Become a guest, volunteer, host, partner or advocate for better governance in Sierra Leone."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-navy">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{w.description}</p>
            </div>
          ))}
        </div>

        <div id="ask" className="mt-14 scroll-mt-24 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-navy">Ask a Question or Suggest a Topic</h2>
          <p className="mt-2 max-w-xl text-sm text-foreground/60">
            Your voice matters. Submit a question or topic suggestion and it may be featured on the show.
          </p>
          <div className="mt-6 max-w-xl">
            <QuestionForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
