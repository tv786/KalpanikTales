import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, Heart, AlertTriangle, Sparkles, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Content Disclaimer — KalpanikTales" },
      {
        name: "description",
        content:
          "Important disclaimer about the fictional nature of stories, AI-generated images, and cultural sensitivity on KalpanikTales.",
      },
    ],
  }),
  component: DisclaimerPage,
});

const sections = [
  {
    icon: BookOpen,
    number: "01",
    title: "Fictional Content",
    content:
      "All stories, books, characters, and narratives published on KalpanikTales are entirely fictional. They are creative works of imagination and do not represent real people, events, or historical facts unless explicitly stated otherwise. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.",
  },
  {
    icon: ImageIcon,
    number: "02",
    title: "AI-Generated Images",
    content:
      "Images used in our story books are generated using artificial intelligence tools. These images are created solely to help readers better visualize the textual stories and enhance the reading experience. The AI-generated artwork does not depict real individuals or specific historical figures, and should be viewed as artistic interpretations rather than factual representations.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Cultural Respect & Sensitivity",
    content:
      "KalpanikTales is committed to respecting all cultures, traditions, and beliefs. Our stories draw inspiration from mythology, folklore, and cultural narratives from across Bharat and the world. We strive to present these stories with respect and sensitivity. If you believe any content inadvertently causes offense or misrepresents cultural traditions, please contact us so we can review and address your concerns.",
  },
  {
    icon: AlertTriangle,
    number: "04",
    title: "No Harmful Intent",
    content:
      "Our stories are created for entertainment, education, and cultural appreciation. We do not intend to hurt any religious sentiments, cultural feelings, or personal beliefs. The platform is designed to celebrate storytelling traditions and make them accessible to modern readers in an engaging format.",
  },
  {
    icon: Sparkles,
    number: "05",
    title: "Creative Interpretation",
    content:
      "While our stories may be inspired by traditional mythology, folklore, and cultural narratives, they are creative reinterpretations. We take artistic liberties to adapt these tales for contemporary audiences. These adaptations are not meant to replace or challenge authentic cultural knowledge or religious teachings.",
  },
  {
    icon: Globe,
    number: "06",
    title: "Reader Discretion",
    content:
      "Some stories may contain themes or content that may not be suitable for all age groups. We encourage parents and guardians to review content before allowing children to access it. Readers are advised to use their own discretion when engaging with any content on the platform.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

function DisclaimerPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/30 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--crimson)]/5 via-transparent to-[var(--gold)]/5" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <AlertTriangle className="h-8 w-8 text-[var(--gold)]" />
            <span className="font-reading text-sm uppercase tracking-widest text-[var(--gold)]">
              Legal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 font-display text-5xl text-foreground sm:text-6xl"
          >
            Content Disclaimer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl font-reading text-muted-foreground"
          >
            Important information about the fictional nature of our stories,
            AI-generated imagery, and our commitment to cultural respect.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-xs text-muted-foreground/60"
          >
            Last updated: June 2025
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--gold)]/30 hover:bg-card/80"
              >
                {/* Crimson accent line */}
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[var(--crimson)]/60 via-[var(--crimson)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--gold)]/20 bg-[var(--gold)]/10">
                    <Icon className="h-5 w-5 text-[var(--gold)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-reading text-xs font-semibold tracking-widest text-[var(--gold)]/60">
                        {section.number}
                      </span>
                      <h2 className="font-display text-xl text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--crimson)]/10 via-transparent to-[var(--gold)]/10 p-8 text-center"
        >
          <p className="font-reading text-muted-foreground">
            By using KalpanikTales you also agree to our{" "}
            <Link
              to="/terms"
              className="font-semibold text-[var(--gold)] underline-offset-2 hover:underline"
            >
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-semibold text-[var(--gold)] underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
