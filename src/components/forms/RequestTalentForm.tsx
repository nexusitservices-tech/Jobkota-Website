import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { industries, services } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Field from "./Field";

export default function RequestTalentForm() {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("technology");
  const [service, setService] = useState("recruitment");
  const [position, setPosition] = useState("");
  const [employeesNeeded, setEmployeesNeeded] = useState<number>(1);
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [location, setLocation] = useState("Dubai, UAE");
  const [experience, setExperience] = useState("Mid-Senior (4-7 yrs)");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!company.trim() || !contactName.trim() || !email.trim() || !position.trim()) {
      setErrorMsg("Please fill in company name, contact person, work email, and required position.");
      return;
    }

    try {
      setIsSubmitting(true);
      await base44.entities.WorkforceRequest.create({
        company: company.trim(),
        contact_name: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        industry,
        service,
        position: position.trim(),
        employees_needed: Number(employeesNeeded) || 1,
        employment_type: employmentType,
        location: location.trim(),
        experience,
        skills: skills.trim(),
        start_date: startDate,
        budget: budget.trim(),
        requirements: requirements.trim(),
        status: "New",
      });

      base44.analytics.track({
        eventName: "workforce_request_submit",
        properties: { company, position, service, industry },
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-xs text-center space-y-4 animate-in fade-in-50 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal/20 text-foreground border border-signal/40">
          <CheckCircle2 className="h-8 w-8 text-lime-600" />
        </div>
        <h3 className="text-2xl font-black text-foreground">
          Workforce Request Logged
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-foreground">{contactName}</span>. Your request for{" "}
          <span className="font-semibold text-foreground">{position}</span> at{" "}
          <span className="font-semibold text-foreground">{company}</span> has been dispatched to our principal practice leads.
        </p>
        <p className="text-xs text-muted-foreground">
          A dedicated account manager will present sourcing strategy, rate cards, or verified profiles within 24 hours.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setPosition("");
              setRequirements("");
              setSkills("");
            }}
            className="text-xs font-semibold"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs space-y-6"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-foreground">
          Request Talent & Workforce Deployment
        </h3>
        <p className="text-xs text-muted-foreground">
          Fill in your headcount requirements to receive candidate matches or custom staffing terms.
        </p>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      {/* Organization and Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company / Entity Name" required>
          <Input
            required
            placeholder="e.g. Al Qudra Holdings"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Field>

        <Field label="Contact Person Name" required>
          <Input
            required
            placeholder="e.g. Tariq Bin Rashid"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Work Email Address" required>
          <Input
            type="email"
            required
            placeholder="tariq@alqudra.ae"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Phone / Mobile Number">
          <Input
            placeholder="+971 50 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
      </div>

      {/* Position and Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Industry Vertical">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {industries.map((ind) => (
              <option key={ind.slug} value={ind.slug}>
                {ind.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Requested Service Type">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {services.map((srv) => (
              <option key={srv.slug} value={srv.slug}>
                {srv.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Role specifics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Target Role / Job Title" required>
          <Input
            required
            placeholder="e.g. Senior Cloud Architect"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Field>

        <Field label="Number of Hires Needed">
          <Input
            type="number"
            min={1}
            max={500}
            value={employeesNeeded}
            onChange={(e) => setEmployeesNeeded(Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Engagement Type">
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="Full-time">Full-time Permanent</option>
            <option value="Contract">Contract / Project</option>
            <option value="Manpower Supply">Volume Manpower Supply</option>
            <option value="Part-time">Part-time</option>
          </select>
        </Field>

        <Field label="Work Location">
          <Input
            placeholder="e.g. Dubai, UAE"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field label="Experience Seniority">
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="Junior (1-3 yrs)">Junior (1-3 yrs)</option>
            <option value="Mid-Senior (4-7 yrs)">Mid-Senior (4-7 yrs)</option>
            <option value="Senior / Lead (8-12 yrs)">Senior / Lead (8-12 yrs)</option>
            <option value="Executive / C-Suite (12+ yrs)">Executive / C-Suite (12+ yrs)</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Target Start Date">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Field>

        <Field label="Budget / Salary Allocation">
          <Input
            placeholder="e.g. 25,000 - 32,000 AED / month"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Key Skills Required (Comma separated)">
        <Input
          placeholder="e.g. Kubernetes, AWS, TypeScript, Python, Terraform"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </Field>

      <Field label="Additional Requirements & Scope">
        <Textarea
          rows={3}
          placeholder="Outline specific project deliverables, shift patterns, certifications, or licensing requirements..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </Field>

      <div className="pt-2">
        <Button
          type="submit"
          variant="signal"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Transmitting Request...</span>
            </>
          ) : (
            <>
              <span>Submit Workforce Request</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
