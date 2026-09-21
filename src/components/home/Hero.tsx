import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { SHOP } from "./shop";
import { riseItem, stagger } from "./Reveal";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { OpenStatus } from "./OpenStatus";

/**
 * hero-background.mp4 is a wide 16:9 clip, but on a narrow mobile viewport the
 * full-bleed `object-cover` crop only shows a ~25% vertical sliver of its
 * width — centered by default, which cuts the technicians in the footage out
 * of frame entirely whenever they aren't dead-center. These keyframes were
 * measured directly off the clip (drew each second to a canvas with a percent
 * grid overlay and read the person's actual x position — a first guess from
 * low-res thumbnails alone was consistently wrong) so the crop pans to follow
 * them instead. Desktop shows the full width already, so this only runs
 * below the `sm` breakpoint.
 */
const MOBILE_FOCUS_KEYFRAMES: Array<{ t: number; x: number }> = [
  { t: 0, x: 45 },
  { t: 3.5, x: 45 },
  { t: 5, x: 22 },
  { t: 6.8, x: 28 },
  { t: 9, x: 30 },
  { t: 11, x: 40 },
  { t: 14, x: 50 },
  { t: 16, x: 50 },
  { t: 21, x: 50 },
  { t: 23, x: 15 },
  { t: 25.5, x: 35 },
  { t: 26.5, x: 45 },
  { t: 28.5, x: 45 },
  { t: 31, x: 35 },
  { t: 32.5, x: 40 },
  { t: 34.5, x: 50 },
  { t: 36.5, x: 50 },
  { t: 39.5, x: 38 },
  { t: 41, x: 45 },
  { t: 43.5, x: 55 },
  { t: 44.5, x: 50 },
  { t: 45.3, x: 15 },
  { t: 46.5, x: 12 },
  { t: 48, x: 12 },
  { t: 49, x: 15 },
  { t: 49.3, x: 35 },
  { t: 49.6, x: 50 },
  { t: 50.3, x: 50 },
];

// With the scrim removed, white text sits directly on the video, so it leans on a strong
// drop-shadow instead of a dark overlay for legibility — keeps the footage fully visible.
const heroTextShadow = "[text-shadow:0_2px_18px_rgba(0,0,0,0.9),0_1px_4px_rgba(0,0,0,0.95)]";

function focusXAt(time: number): number {
  const frames = MOBILE_FOCUS_KEYFRAMES;
  if (time <= frames[0]!.t) return frames[0]!.x;
  for (let i = 1; i < frames.length; i++) {
    const prev = frames[i - 1]!;
    const next = frames[i]!;
    if (time <= next.t) {
      const span = next.t - prev.t;
      const progress = span === 0 ? 0 : (time - prev.t) / span;
      return prev.x + (next.x - prev.x) * progress;
    }
  }
  return frames[frames.length - 1]!.x;
}

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mobileQuery = window.matchMedia("(max-width: 639px)");

    const onTimeUpdate = () => {
      if (!mobileQuery.matches) {
        video.style.objectPosition = "";
        return;
      }
      video.style.objectPosition = `${focusXAt(video.currentTime)}% 50%`;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    mobileQuery.addEventListener("change", onTimeUpdate);
    onTimeUpdate();

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      mobileQuery.removeEventListener("change", onTimeUpdate);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pb-20 sm:pt-36"
    >
      {/* Background Video & Overlays */}
      <video
        ref={videoRef}
        src="/hero-background.mp4"
        poster="/hero-background-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-[object-position] duration-500 ease-out"
      />
      {/*
        No full-bleed filter over the video — most of the frame (right side, full top) stays
        completely clear. Just a soft fade behind the text column itself, since white text still
        needs a contrast floor on the video's brighter moments (e.g. the sky near the start).
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/10 to-transparent sm:from-black/40 sm:via-black/5 sm:to-transparent"
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
            className={`inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:px-3.5 sm:text-xs sm:tracking-[0.18em] ${heroTextShadow}`}
          >
            <ShieldCheck className="h-4 w-4 text-primary-on-dark" />
            <span className="truncate">Family-Owned &amp; Operating Since {SHOP.founded}</span>
          </motion.div>

          <motion.h1
            variants={riseItem}
            className={`mt-5 max-w-4xl text-wrap font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl ${heroTextShadow}`}
          >
            Expert auto repair. Clear explanations.
          </motion.h1>

          <motion.p
            variants={riseItem}
            className={`mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg ${heroTextShadow}`}
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
              className={`hidden items-center justify-center gap-2.5 rounded-full border border-white/30 bg-black/35 px-8 py-4 text-base font-extrabold text-white transition-all duration-200 hover:border-white/60 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex ${heroTextShadow}`}
            >
              <Phone className="h-5 w-5 text-primary-on-dark" />
              {SHOP.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            variants={riseItem}
            className={`mt-10 flex flex-wrap items-center gap-5 text-sm font-semibold text-white/90 ${heroTextShadow}`}
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
