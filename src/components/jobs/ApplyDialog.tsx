import React, { useState } from "react";
import { UploadCloud, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { JobEntity, base44 } from "@/api/base44Client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ApplyDialogProps {
  job: JobEntity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplyDialog({ job, open, onOpenChange }: ApplyDialogProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Dubai, UAE");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please provide your full name and email address.");
      return;
    }

    if (!cvFile) {
      setErrorMsg("Please attach your CV / Resume (PDF or DOCX).");
      return;
    }

    if (!consent) {
      setErrorMsg("Please agree to the privacy statement to proceed.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload file via base44 integration
      const uploadRes = await base44.integrations.Core.UploadPrivateFile({ file: cvFile });

      // Create Application entity
      await base44.entities.Application.create({
        job_id: job.id,
        job_title: job.title,
        company: job.company,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        cv_file_uri: uploadRes.file_uri,
        cv_file_name: cvFile.name,
        cover_letter: coverLetter.trim(),
        consent: true,
        status: "Applied",
      });

      base44.analytics.track({
        eventName: "job_application_submit",
        properties: { jobId: job.id, title: job.title, company: job.company },
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    if (submitted) {
      // Reset form after short delay
      setTimeout(() => {
        setSubmitted(false);
        setFullName("");
        setEmail("");
        setPhone("");
        setCoverLetter("");
        setCvFile(null);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose}>
        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal/20 text-foreground border border-signal/40">
              <CheckCircle2 className="h-8 w-8 text-lime-600" />
            </div>
            <h3 className="text-2xl font-black text-foreground">
              Application Transmitted!
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-foreground">{fullName}</span>. Your application for{" "}
              <span className="font-semibold text-foreground">{job.title}</span> at{" "}
              <span className="font-semibold text-foreground">{job.company}</span> has been received by our executive talent partners.
            </p>
            <div className="pt-4">
              <Button variant="default" onClick={handleClose} className="px-8 font-bold">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Direct Application · {job.company}
              </div>
              <DialogTitle className="text-xl sm:text-2xl">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription>
                Provide your candidate details and curriculum vitae. Our regional recruiters evaluate all submissions.
              </DialogDescription>
            </DialogHeader>

            {errorMsg && (
              <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs font-medium text-destructive">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="app-name">Full Name *</Label>
                  <Input
                    id="app-name"
                    required
                    placeholder="e.g. Tariq Al-Hashimi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="app-email">Email Address *</Label>
                  <Input
                    id="app-email"
                    type="email"
                    required
                    placeholder="tariq@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="app-phone">Phone Number</Label>
                  <Input
                    id="app-phone"
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="app-location">Current Location</Label>
                  <Input
                    id="app-location"
                    placeholder="e.g. Dubai, UAE"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* CV File Upload */}
              <div className="space-y-1.5">
                <Label htmlFor="app-cv">Curriculum Vitae / Resume * (PDF, DOCX)</Label>
                <div className="relative rounded-2xl border-2 border-dashed border-border hover:border-foreground/40 bg-muted/40 p-4 transition-colors text-center cursor-pointer">
                  <input
                    id="app-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {cvFile ? (
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
                      <FileText className="h-5 w-5 text-signal" />
                      <span>{cvFile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <UploadCloud className="h-6 w-6 text-foreground/60" />
                      <p className="font-semibold text-foreground">
                        Click or drag CV file to upload
                      </p>
                      <p>Up to 10MB in PDF or Word format</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter / Note */}
              <div className="space-y-1.5">
                <Label htmlFor="app-cover">Cover Letter / Note (Optional)</Label>
                <Textarea
                  id="app-cover"
                  rows={3}
                  placeholder="Outline key career achievements, current visa status, or earliest notice availability..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="app-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer"
                />
                <label
                  htmlFor="app-consent"
                  className="text-xs text-muted-foreground leading-normal cursor-pointer"
                >
                  I consent to JobKota securely processing my resume and personal credentials in accordance with the Privacy Policy for current and relevant future mandates.
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="signal"
                  disabled={isSubmitting}
                  className="px-6 font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
