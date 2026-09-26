import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface FaqProps {
  items: { q: string; a: string }[];
  className?: string;
}

export default function Faq({ items, className }: FaqProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={className}>
      <Accordion>
        {items.map((item, idx) => (
          <AccordionItem key={idx} defaultOpen={idx === 0}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
