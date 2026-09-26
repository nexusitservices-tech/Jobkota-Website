import { useState } from "react";
import { ApplicationEntity, JobEntity, base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { UserPlus, Loader2 } from "lucide-react";

interface AddApplicantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs: JobEntity[];
  onApplicantCreated: () => void;
}

export default function AddApplicantModal({
  open,
  onOpenChange,
  jobs,
  onApplicantCreated,
}: AddApplicantModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Dubai, UAE");
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || "");
  const [status, setStatus] = useState<ApplicationEntity["status"]>("Applied");
  const [rating, setRating] = useState<number>(3);
  const [notes, setNotes] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide candidate name and email address.",
        variant: "destructive",
      });
      return;
    }

    const job = jobs.find((j) => j.id === selectedJobId) || jobs[0];

    try {
      setIsSubmitting(true);
      await base44.entities.Application.create({
        job_id: job?.id || "job_general",
        job_title: job?.title || "General Candidate Pool",
        company: job?.company || "JobKota Talent Pool",
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        location: location.trim() || undefined,
        cv_file_name: `${fullName.trim().replace(/\s+/g, "_")}_Resume.pdf`,
        cover_letter: coverLetter.trim() || undefined,
        status,
        rating,
        notes: notes.trim() || undefined,
        consent: true,
        source: "recruiter_manual",
      });

      toast({
        title: "Candidate Added",
        description: `Successfully added ${fullName} to ${job?.title || "talent pool"}.`,
        variant: "success",
      });

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setCoverLetter("");
      setNotes("");
      onApplicantCreated();
      onOpenChange(false);
    } catch (err: any) {
      toast({
        title: "Failed to Add Candidate",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl max-h-[92vh] overflow-y-auto p-6 sm:p-8"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-signal/20 text-foreground flex items-center justify-center shrink-0 border border-signal/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-foreground">
                Add Candidate Manually
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Register a direct applicant, walk-in candidate, or executive referral.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Full Name *</label>
              <Input
                required
                placeholder="e.g. Zaid Al-Hamad"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Email Address *</label>
              <Input
                type="email"
                required
                placeholder="e.g. zaid.hamad@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Phone Number</label>
              <Input
                type="tel"
                placeholder="+971 50 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-xs h-10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">City & Country</label>
              <Input
                placeholder="e.g. Dubai, UAE"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-xs h-10"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Assign to Position</label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} — {j.company} ({j.location})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Initial Pipeline Stage</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationEntity["status"])}
                className="w-full h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
              >
                <option value="Applied">Applied (New)</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview Scheduled</option>
                <option value="Selected">Selected / Offered</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Recruiter Star Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full h-10 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground cursor-pointer"
              >
                <option value="5">5 Stars — Outstanding</option>
                <option value="4">4 Stars — Strong Fit</option>
                <option value="3">3 Stars — Qualified</option>
                <option value="2">2 Stars — Under Qualified</option>
                <option value="1">1 Star — Poor Fit</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Cover Letter / Background Summary</label>
            <Textarea
              placeholder="Candidate background, experience summary, key achievements..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Internal Recruiter Notes</label>
            <Textarea
              placeholder="Notice period, salary expectations, interview notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="signal"
              disabled={isSubmitting}
              className="text-xs font-bold gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adding Candidate...</span>
                </>
              ) : (
                <span>Save Candidate</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
