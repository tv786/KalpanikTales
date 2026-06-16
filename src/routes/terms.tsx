import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ScrollText, Shield, Users, FileEdit, Mail, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — KalpanikTales" },
      {
        name: "description",
        content:
          "Read the Terms & Conditions for using KalpanikTales, the home of mythological and folklore stories from Ancient Bharat.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    icon: BookOpen,
    number: "01",
    title: "Use of the Site",
    content:
      "You agree to use KalpanikTales only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress to other users, transmitting obscene or offensive content, or disrupting the normal flow of dialogue.",
  },
  {
    icon: ScrollText,
    number: "02",
    title: "Intellectual Property & Content",
    content:
      "The stories, characters, artwork, and other content on KalpanikTales are for entertainment purposes. All original content is the property of KalpanikTales and its respective authors unless otherwise noted. You may not reproduce, distribute, or create derivative works without explicit written permission.",
  },
  {
    icon: Users,
    number: "03",
    title: "User Accounts",
    content:
      "If you create an account, you are responsible for maintaining its security. You are fully responsible for all activities that occur under your account and any content you post. You agree to notify us immediately of any unauthorized use of your account.",
  },
  {
    icon: Shield,
    number: "04",
    title: "Disclaimers & Limitations",
    content:
      "KalpanikTales is provided on an 'as is' basis. We make no warranties, express or implied, regarding the accuracy or completeness of any content. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site.",
  },
  {
    icon: FileEdit,
    number: "05",
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use KalpanikTales after changes become effective, you agree to be bound by the revised terms.",
  },
  {
    icon: Mail,
    number: "06",
    title: "Contact Us",
    content:
      "If you have any questions about these Terms & Conditions, please reach out to us through our website. We are happy to clarify any points and address your concerns promptly.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function TermsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card/30 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--crimson)]/5" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <ScrollText className="h-8 w-8 text-[var(--gold)]" />
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
            Terms &amp; Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl font-reading text-muted-foreground"
          >
            Please read these terms carefully before using KalpanikTales. By
            using our site, you accept these conditions in full.
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
                {/* Gold accent line */}
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[var(--gold)]/60 via-[var(--gold)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

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
          className="mt-12 rounded-xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--crimson)]/10 p-8 text-center"
        >
          <p className="font-reading text-muted-foreground">
            Also see our{" "}
            <Link
              to="/privacy"
              className="font-semibold text-[var(--gold)] underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            for details on how we handle your data.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
