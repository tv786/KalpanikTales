import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Database, Eye, UserCheck, RefreshCw, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — KalpanikTales" },
      {
        name: "description",
        content:
          "Learn how KalpanikTales collects, uses, and protects your personal information. Your privacy matters to us.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    icon: Database,
    number: "01",
    title: "Information We Collect",
    content:
      "We may collect personal information such as your name and email address when you register an account or subscribe to our newsletter. We also collect usage data such as pages visited, time spent on the site, and interactions with content — all to improve your experience.",
  },
  {
    icon: Eye,
    number: "02",
    title: "How We Use Your Information",
    content:
      "The information we collect is used to provide and improve our services, send you updates about new stories and chapter releases (if you subscribed), communicate important service announcements, and personalize your reading experience on KalpanikTales.",
  },
  {
    icon: Shield,
    number: "03",
    title: "Data Protection",
    content:
      "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers with appropriate encryption and access controls.",
  },
  {
    icon: UserCheck,
    number: "04",
    title: "Third-Party Services",
    content:
      "We use trusted third-party services such as Supabase for database and authentication, and Google Fonts for typography. These providers have their own privacy policies. We do not sell or rent your personal information to any third party for marketing purposes.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Cookies & Local Storage",
    content:
      "KalpanikTales uses browser local storage to remember your theme preference (light/dark mode) and session data. We do not use tracking cookies for advertising. You can clear your browser storage at any time through your browser settings.",
  },
  {
    icon: Mail,
    number: "06",
    title: "Contact & Policy Updates",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised date. If you have questions about your data or this policy, please reach out to us through the website.",
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

function PrivacyPage() {
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
            <Shield className="h-8 w-8 text-[var(--gold)]" />
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 max-w-2xl font-reading text-muted-foreground"
          >
            Your privacy matters to us. This policy explains how we collect,
            use, and safeguard your personal information when you visit
            KalpanikTales.
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
            </Link>
            .
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
