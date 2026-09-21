import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

export function FAQSection({
  heading,
  items,
}: {
  heading: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{heading}</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="mt-8">
            {items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="font-display text-base font-bold sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
