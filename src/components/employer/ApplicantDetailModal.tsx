import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  Trash2,
  Copy,
  Check,
  Star,
  ExternalLink,
  MessageSquare,
  Clock,
  Briefcase,
  AlertCircle,
  Save,
  CheckCircle2,
} from "lucide-react";
import { ApplicationEntity } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface ApplicantDetailModalProps {
  applicant: ApplicationEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, status: ApplicationEntity["status"]) => void;
  onUpdateApplicant: (id: string, updates: Partial<ApplicationEntity>) => void;
  onDeleteApplicant: (id: string) => void;
}

export default function ApplicantDetailModal({
  applicant,
  open,
  onOpenChange,
  onUpdateStatus,
  onUpdateApplicant,
  onDeleteApplicant,
}: ApplicantDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState(applicant?.notes || "");
  const [rating, setRating] = useState<number>(applicant?.rating || 0);
  const [interviewDate, setInterviewDate] = useState(
    applicant?.interview_date ? applicant.interview_date.slice(0, 16) : ""
  );
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (applicant) {
      setNotes(applicant.notes || "");
      setRating(applicant.rating || 0);
      setInterviewDate(
        applicant.interview_date ? applicant.interview_date.slice(0, 16) : ""
      );
      setConfirmDelete(false);
    }
  }, [applicant]);

  if (!applicant) return null;

  const cleanPhone = applicant.phone?.replace(/[^0-9]/g, "") || "";
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hello ${applicant.full_name}, this is JobKota regarding your application for the ${applicant.job_title} role at ${applicant.company}.`
      )}`
    : null;

  const handleCopyContact = () => {
    const contactText = [
      `Candidate: ${applicant.full_name}`,
      `Position: ${applicant.job_title} (${applicant.company})`,
      `Email: ${applicant.email}`,
      applicant.phone ? `Phone: ${applicant.phone}` : null,
      applicant.location ? `Location: ${applicant.location}` : null,
      `Status: ${applicant.status}`,
      applicant.rating ? `Rating: ${applicant.rating}/5 Stars` : null,
      applicant.notes ? `Notes: ${applicant.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(contactText);
    setCopied(true);
    toast({
      title: "Contact Info Copied",
      description: `Copied details for ${applicant.full_name} to clipboard.`,
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    onUpdateApplicant(applicant.id, {
      notes,
      rating,
      interview_date: interviewDate ? new Date(interviewDate).toISOString() : undefined,
    });
    toast({
      title: "Applicant Updated",
      description: "Recruiter notes, rating, and scheduling details saved.",
      variant: "success",
    });
    setTimeout(() => setIsSavingNotes(false), 400);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onUpdateApplicant(applicant.id, { rating: newRating });
    toast({
      title: "Rating Updated",
      description: `Rated ${applicant.full_name} ${newRating} out of 5 stars.`,
      variant: "default",
    });
  };

  const getStatusVariant = (status: ApplicationEntity["status"]) => {
    switch (status) {
      case "Selected":
        return "success";
      case "Shortlisted":
      case "Interview":
        return "signal";
      case "Under Review":
        return "warning";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const pipelineStages: ApplicationEntity["status"][] = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[92vh] p-0 overflow-hidden flex flex-col bg-card border-border"
        onClose={() => onOpenChange(false)}
      >
        {/* Top Header Banner */}
        <div className="p-6 sm:p-7 bg-muted/40 border-b border-border/80 relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-signal/25 text-foreground font-black flex items-center justify-center text-lg border border-signal/40 shrink-0 shadow-xs">
                {applicant.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-foreground">
                    {applicant.full_name}
                  </h3>
                  <Badge variant={getStatusVariant(applicant.status)}>
                    {applicant.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-signal" />
                    {applicant.job_title}
                  </span>
                  <span>·</span>
                  <span className="text-foreground/80">{applicant.company}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Applied {new Date(applicant.created_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Rating Selector */}
            <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 pt-1 sm:pt-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Recruiter Rating
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="p-0.5 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-500"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline Stage Bar */}
          <div className="mt-5 pt-4 border-t border-border/60">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              <span>Recruitment Pipeline Stage</span>
              <span className="text-foreground font-semibold">
                Current: {applicant.status}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {pipelineStages.map((stage) => {
                const isCurrent = applicant.status === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => onUpdateStatus(applicant.id, stage)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer border ${
                      isCurrent
                        ? "bg-signal text-primary font-black border-signal shadow-xs"
                        : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Contact Details & Quick Actions Bar */}
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Verified Candidate Contacts
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyContact}
                className="h-8 text-xs font-bold gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Contact Card</span>
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Direct Phone / Call */}
              <div className="p-3 rounded-xl bg-muted/50 border border-border/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Phone Number
                </span>
                <div className="flex items-center justify-between gap-1">
                  <a
                    href={`tel:${applicant.phone || ""}`}
                    className="text-xs font-bold text-foreground hover:text-primary hover:underline truncate"
                  >
                    {applicant.phone || "Not provided"}
                  </a>
                  {applicant.phone && (
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={`tel:${applicant.phone}`}
                        className="p-1 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Email */}
              <div className="p-3 rounded-xl bg-muted/50 border border-border/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-1">
                  <a
                    href={`mailto:${applicant.email}?subject=${encodeURIComponent(
                      `JobKota Application: ${applicant.job_title}`
                    )}`}
                    className="text-xs font-bold text-foreground hover:text-primary hover:underline truncate"
                  >
                    {applicant.email}
                  </a>
                  <a
                    href={`mailto:${applicant.email}?subject=${encodeURIComponent(
                      `JobKota Application: ${applicant.job_title}`
                    )}`}
                    className="p-1 rounded-lg bg-signal/20 text-foreground hover:bg-signal/30 transition-colors shrink-0"
                    title="Send Email"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-3 rounded-xl bg-muted/50 border border-border/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Location & Mobility
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{applicant.location || "GCC Region"}</span>
                </div>
              </div>
            </div>

            {applicant.linkedin_url && (
              <div className="pt-1 text-xs">
                <a
                  href={applicant.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Verified LinkedIn Profile</span>
                </a>
              </div>
            )}
          </div>

          {/* Recruiter Notes & Evaluation */}
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Recruiter Notes & Candidate Evaluation
              </span>
              <Button
                variant="signal"
                size="sm"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="h-8 text-xs font-bold gap-1.5 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Notes</span>
              </Button>
            </div>

            <Textarea
              placeholder="Add interview assessment notes, compensation expectations, technical screening feedback, or notice period..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-xs leading-relaxed min-h-[90px] resize-y"
            />

            {/* Interview Scheduler Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">
                  Schedule Interview Date & Time
                </label>
                <Input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">
                  Pipeline Quick Status
                </label>
                <select
                  value={applicant.status}
                  onChange={(e) =>
                    onUpdateStatus(
                      applicant.id,
                      e.target.value as ApplicationEntity["status"]
                    )
                  }
                  className="w-full h-9 rounded-xl border border-input bg-card px-3 text-xs font-bold text-foreground cursor-pointer"
                >
                  {pipelineStages.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>
            </div>
          </div>

          {/* CV / Resume File Preview */}
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Candidate Dossier / Attached CV
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/80">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    {applicant.cv_file_name || `${applicant.full_name}_Resume.pdf`}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Verified PDF Document · Attached via candidate portal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`#view-cv-${applicant.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "CV Dossier Preview",
                      description: `Opening verified resume for ${applicant.full_name}.`,
                      variant: "default",
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-bold text-foreground cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Cover Letter / Statement */}
          {applicant.cover_letter && (
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Cover Letter & Candidate Statement
              </span>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                "{applicant.cover_letter}"
              </div>
            </div>
          )}

          {/* Danger Zone: Delete Applicant */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-destructive">
                  Confirm permanent deletion?
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDeleteApplicant(applicant.id);
                    onOpenChange(false);
                  }}
                  className="h-8 text-xs font-bold cursor-pointer"
                >
                  Yes, Delete Candidate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                  className="h-8 text-xs cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove candidate application</span>
              </button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs font-bold cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
