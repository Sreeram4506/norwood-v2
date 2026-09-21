import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pb-20 sm:pt-36"
    >
      {/* Background Video & Overlays */}
      <video
        src="/hero-background.mp4"
        poster="/hero-background-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="min-w-0 max-w-3xl"
        >
          <motion.div
            variants={riseItem}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:px-3.5 sm:text-xs sm:tracking-[0.18em]"
          >
            <ShieldCheck className="h-4 w-4 text-primary-on-dark" />
            <span className="truncate">Family-Owned &amp; Operating Since {SHOP.founded}</span>
          </motion.div>

          <motion.h1
            variants={riseItem}
            className="mt-5 max-w-4xl text-wrap font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            Expert auto repair. Clear explanations.
          </motion.h1>

          <motion.p
            variants={riseItem}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Two adjacent facilities handling every repair, tire, and state inspection need — our
            ASE-certified technicians explain the work in plain English before the wrench turns.
          </motion.p>

          <motion.div
            variants={riseItem}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <BookAppointmentDialog
              trigger={
                <button
                  type="button"
                  className="brand-gradient shadow-brand group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-base font-extrabold text-primary-foreground transition-transform duration-200 hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:px-8"
                >
                  Book Appointment
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              }
            />

            <a
              href={`tel:${SHOP.phone}`}
              className="hidden items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-extrabold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
            >
              <Phone className="h-5 w-5 text-primary-on-dark" />
              {SHOP.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            variants={riseItem}
            className="mt-10 flex flex-wrap items-center gap-5 text-sm font-semibold text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{SHOP.rating}★ on Google</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="hidden items-center gap-2 sm:flex">
              <OpenStatus light />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
