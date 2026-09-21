import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Car,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  KeyRound,
  ScanLine,
  UserRound,
  Wrench,
} from "lucide-react";
import { PROCESS_STEPS } from "./shop";

const STEP_ICONS = [CalendarCheck, ClipboardList, KeyRound] as const;

/** Small pulsing dot used for the diagnostic-scan and repair-spark bursts. */
function Particle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.span
      className="absolute h-1.5 w-1.5 rounded-full bg-primary-on-dark"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
      transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export function ProcessInMotion() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const railScale = useTransform(smooth, [0, 1], [0, 1]);
  const progressWidth = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PROCESS_STEPS.length - 1, Math.floor(v * PROCESS_STEPS.length));
    setActive(idx);
  });

  // The car's whole journey across the stage: arrives, sits through inspection, rises onto the
  // lift for the repair, sets back down, then drives off — one continuous scroll-scrubbed take.
  const carX = useTransform(
    smooth,
    [0, 0.16, 0.62, 0.9, 1],
    reduce ? ["34%", "34%", "34%", "34%", "34%"] : ["-30%", "34%", "34%", "34%", "132%"],
  );
  const carLift = useTransform(
    smooth,
    [0, 0.62, 0.7, 0.88, 0.95, 1],
    reduce ? [0, 0, 0, 0, 0, 0] : [0, 0, -58, -58, 0, 0],
  );
  const carTilt = useTransform(smooth, [0, 0.1, 0.16], reduce ? [0, 0, 0] : [-4, -4, 0]);

  // Customer walks up alongside the arriving car, then steps away once the technician takes over.
  const customerOpacity = useTransform(smooth, [0, 0.06, 0.28, 0.36], [0, 1, 1, 0]);
  const customerX = useTransform(smooth, [0, 0.3], ["4%", "24%"]);

  // Technician is present for both the inspection and the repair.
  const technicianOpacity = useTransform(smooth, [0.3, 0.37, 0.93, 1], [0, 1, 1, 0]);

  // Diagnostic scan sweeps across the car during phase two.
  const scanOpacity = useTransform(smooth, [0.33, 0.4, 0.58, 0.65], [0, 1, 1, 0]);

  // Wrench + spark burst during phase three, timed to the lift.
  const repairOpacity = useTransform(smooth, [0.64, 0.7, 0.87, 0.93], [0, 1, 1, 0]);

  // A brief "done" beat right before the car drives off.
  const doneOpacity = useTransform(smooth, [0.9, 0.94, 0.97, 1], [0, 1, 1, 0]);

  // Lift posts only appear once the car is actually raised.
  const liftPostOpacity = useTransform(smooth, [0.66, 0.7, 0.9, 0.95], [0, 1, 1, 0]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const targetProgress = (index + 0.5) / PROCESS_STEPS.length;
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const targetY = section.offsetTop + targetProgress * scrollDistance;
    window.scrollTo({ top: targetY, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#07275d]">
        {/* Garage backdrop: norwoodgulf.com's own navy gradient + orange glow. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "linear-gradient(135deg, #07275d 0%, #0a3372 55%, #134b96 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 78% 60%, rgb(255 154 61 / 0.28), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(50% 28% at 28% 82%, rgb(255 255 255 / 0.12), transparent 68%)",
          }}
        />

        {/* Text column */}
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 sm:pt-28 lg:pt-32">


          <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Your car's journey through our shop
          </h2>

          <div className="relative mt-8 sm:mt-10">
            <div
              aria-hidden="true"
              className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-white/15 sm:left-[1.625rem]"
            >
              <motion.div
                style={{ scaleY: railScale }}
                className="brand-gradient h-full w-full origin-top"
              />
            </div>

            <ol className="space-y-3 sm:space-y-4">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length]!;
                const isActive = i === active;
                const isDone = i < active;

                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative flex w-full items-start gap-5 rounded-lg py-1.5 text-left focus-visible:outline-none sm:gap-6"
                    >
                      <span
                        className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 sm:h-14 sm:w-14 ${
                          isActive
                            ? "brand-gradient shadow-brand scale-105 text-primary-foreground"
                            : isDone
                              ? "bg-white/20 text-white backdrop-blur group-hover:bg-white/30"
                              : "bg-white/10 text-white/45 backdrop-blur group-hover:bg-white/20 group-hover:text-white/70"
                        } group-focus-visible:ring-2 group-focus-visible:ring-white/70 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>

                      <div className="min-w-0 pt-1 sm:pt-2">
                        <span
                          className={`block text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                            isActive ? "text-primary-on-dark" : "text-white/35"
                          }`}
                        >
                          {step.actor}
                        </span>
                        <h3
                          className={`mt-0.5 font-display text-lg font-bold transition-colors duration-500 sm:text-2xl ${
                            isActive ? "text-white" : "text-white/45 group-hover:text-white/70"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Only the active phase's detail is expanded — the list itself breathes
                            with the story instead of showing every phase's copy all at once. */}
                        <div
                          className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                          style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                        >
                          <div className="min-h-0">
                            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                              {step.text}
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-on-dark sm:text-sm sm:tracking-[0.12em]">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* The animated stage: a car drives in, a customer meets it, a technician inspects and
            repairs it on the lift, then it drives off — scrubbed entirely by scroll position. */}
        <div className="absolute inset-x-0 bottom-28 h-[20vh] min-h-[130px] sm:bottom-10 sm:h-[30vh]">
          <div aria-hidden="true" className="absolute inset-x-[8%] bottom-[18%] h-px bg-white/15" />

          {/* Lift posts, only visible once the car is actually raised */}
          <motion.div
            style={{ opacity: liftPostOpacity, left: "34%" }}
            className="absolute bottom-[18%] flex h-16 w-[92px] -translate-x-1/2 justify-between sm:h-24 sm:w-32"
          >
            <span className="h-full w-1 rounded-full bg-white/25" />
            <span className="h-full w-1 rounded-full bg-white/25" />
          </motion.div>

          {/* Customer */}
          <motion.div
            style={{ opacity: customerOpacity, left: customerX }}
            className="absolute bottom-[18%] -translate-x-1/2"
          >
            <UserRound className="h-8 w-8 text-white/90 sm:h-11 sm:w-11" strokeWidth={1.5} />
          </motion.div>

          {/* Technician */}
          <motion.div
            style={{ opacity: technicianOpacity, left: "52%" }}
            className="absolute bottom-[18%] -translate-x-1/2"
          >
            <UserRound className="h-8 w-8 text-primary-on-dark sm:h-11 sm:w-11" strokeWidth={1.5} />
          </motion.div>

          {/* Diagnostic scan sweep */}
          <motion.div
            style={{ opacity: scanOpacity, left: "34%" }}
            className="absolute bottom-[20%] h-16 w-20 -translate-x-1/2 sm:h-24 sm:w-28"
          >
            <motion.div
              animate={reduce ? {} : { x: ["-10%", "110%", "-10%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-primary-on-dark to-transparent"
            />
            <ScanLine className="absolute -top-7 left-1/2 h-4 w-4 -translate-x-1/2 text-primary-on-dark sm:-top-8" />
          </motion.div>

          {/* Repair: rotating wrench + spark particles */}
          <motion.div
            style={{ opacity: repairOpacity, left: "34%" }}
            className="absolute bottom-[46%] -translate-x-1/2 sm:bottom-[50%]"
          >
            <div className="relative h-12 w-12 sm:h-16 sm:w-16">
              <motion.div
                animate={reduce ? {} : { rotate: [0, -18, 14, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 grid place-items-center"
              >
                <Wrench className="h-7 w-7 text-primary-on-dark sm:h-9 sm:w-9" strokeWidth={1.5} />
              </motion.div>
              <Particle delay={0} x={85} y={10} />
              <Particle delay={0.35} x={95} y={45} />
              <Particle delay={0.7} x={80} y={70} />
            </div>
          </motion.div>

          {/* "Done" beat right before the car drives off */}
          <motion.div
            style={{ opacity: doneOpacity, left: "34%" }}
            className="absolute bottom-[46%] -translate-x-1/2 sm:bottom-[50%]"
          >
            <CheckCircle2
              className="h-8 w-8 text-primary-on-dark sm:h-10 sm:w-10"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Car */}
          <motion.div
            style={{ left: carX, y: carLift, rotate: carTilt }}
            className="absolute bottom-[18%] -translate-x-1/2"
          >
            <Car
              className="h-14 w-14 text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] sm:h-20 sm:w-20"
              strokeWidth={1.25}
            />
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15" aria-hidden="true">
          <motion.div style={{ width: progressWidth }} className="brand-gradient h-full" />
        </div>
      </div>
    </section>
  );
}
