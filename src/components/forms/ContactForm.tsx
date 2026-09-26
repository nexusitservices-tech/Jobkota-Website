import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Field from "./Field";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please enter your name and email.");
      return;
    }

    try {
      setIsSubmitting(true);
      await base44.entities.Lead.create({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
        source: "contact",
        topic,
        message: message.trim(),
        status: "New Lead",
      });

      base44.analytics.track({
        eventName: "contact_form_submit",
        properties: { topic, company },
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Unable to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xs text-center space-y-4 animate-in fade-in-50 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal/20 text-foreground border border-signal/40">
          <CheckCircle2 className="h-8 w-8 text-lime-600" />
        </div>
        <h3 className="text-2xl font-black text-foreground">
          Inquiry Successfully Sent
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-foreground">{name}</span>. Our corporate advisory team will review your inquiry and connect via email or phone within 24 business hours.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setCompany("");
              setEmail("");
              setPhone("");
              setMessage("");
            }}
            className="text-xs font-semibold"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xs space-y-6"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-foreground">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-muted-foreground">
          Our client partners respond within one business day.
        </p>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your Name" required>
          <Input
            required
            placeholder="e.g. Sarah Jenkins"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Company / Entity">
          <Input
            placeholder="e.g. Jenkins Logistics FZ-LLC"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Work Email Address" required>
          <Input
            type="email"
            required
            placeholder="sarah@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Phone / WhatsApp">
          <Input
            placeholder="+971 50 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Topic of Inquiry">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="Executive Recruitment">Permanent & Executive Recruitment</option>
          <option value="Manpower Supply">Manpower Supply & Temporary Staff</option>
          <option value="HR Outsourcing">HR Outsourcing & Labor Compliance</option>
          <option value="Payroll Services">WPS Payroll & Benefits Management</option>
          <option value="Employer of Record (PEO)">Employer Services / EOR</option>
          <option value="IT Staffing">IT & Tech Staff Augmentation</option>
          <option value="General Inquiry">General Partnership Inquiry</option>
        </select>
      </Field>

      <Field label="Message / Requirement Details" required>
        <Textarea
          required
          rows={4}
          placeholder="Please describe your headcount needs, timelines, target skills, or business questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>

      <div className="pt-2">
        <Button
          type="submit"
          variant="signal"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
