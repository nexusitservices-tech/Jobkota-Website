import { ShieldCheck, Globe2, Building, Award } from "lucide-react";

export default function TrustBar() {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: "MOHRE & GCC Compliant",
      desc: "Licensed corporate sponsorship",
    },
    {
      icon: Globe2,
      title: "Regional Reach",
      desc: "UAE, Saudi Arabia, Qatar & GCC",
    },
    {
      icon: Building,
      title: "500+ Partner Firms",
      desc: "Tier-1 enterprises & scale-ups",
    },
    {
      icon: Award,
      title: "90-Day Placement Guarantee",
      desc: "Vetted permanent recruitment",
    },
  ];

  return (
    <section className="py-8 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {trustSignals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 text-foreground">
                  <Icon className="h-5 w-5 text-signal" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
