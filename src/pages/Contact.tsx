import { MapPin, Phone, Mail, Clock } from "lucide-react";
import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/content";

export default function Contact() {
  useSeo(
    "Contact JobKota",
    "Get in touch with JobKota's talent advisors and recruitment practice directors in Dubai, UAE."
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[{ label: "Contact" }]}
        eyebrow="Get in Touch"
        title="Connect with Our Strategic"
        accentWord="advisors."
        description="Whether you have an inquiry regarding permanent executive search, manpower supply, or regional HR outsourcing, our team is at your disposal."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-xs uppercase tracking-widest text-signal font-bold">
                  Corporate Offices
                </span>
                <h3 className="text-2xl font-black text-foreground mt-1">
                  JobKota Headquarters
                </h3>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0 border border-signal/30">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Physical Address
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0 border border-signal/30">
                    <Phone className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Telephone / WhatsApp
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {siteConfig.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0 border border-signal/30">
                    <Mail className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Direct Email
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {siteConfig.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0 border border-signal/30">
                    <Clock className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Operating Hours
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      Monday – Friday: 8:30 AM – 6:00 PM (GST)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Visitors by prior appointment. In-person executive consultations may be booked in advance with our DIFC practice team.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
