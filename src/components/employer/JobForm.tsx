import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Loader2, Sparkles } from "lucide-react";
import { JobEntity, base44 } from "@/api/base44Client";
import { industries, categories } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Field from "@/components/forms/Field";
import { useQueryClient } from "@tanstack/react-query";

interface JobFormProps {
  initialJob?: Partial<JobEntity>;
  isEdit?: boolean;
}

export default function JobForm({ initialJob = {}, isEdit = false }: JobFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(initialJob.title || "");
  const [slug, setSlug] = useState(initialJob.slug || "");
  const [company, setCompany] = useState(initialJob.company || "");
  const [location, setLocation] = useState(initialJob.location || "Dubai, UAE");
  const [employmentType, setEmploymentType] = useState<JobEntity["employment_type"]>(
    initialJob.employment_type || "Full-time"
  );
  const [industry, setIndustry] = useState(initialJob.industry || "technology");
  const [category, setCategory] = useState(initialJob.category || "Technology");
  const [department, setDepartment] = useState(initialJob.department || "");
  const [experienceMin, setExperienceMin] = useState<number | undefined>(
    initialJob.experience_min
  );
  const [experienceMax, setExperienceMax] = useState<number | undefined>(
    initialJob.experience_max
  );
  const [salaryMin, setSalaryMin] = useState<number | undefined>(initialJob.salary_min);
  const [salaryMax, setSalaryMax] = useState<number | undefined>(initialJob.salary_max);
  const [currency, setCurrency] = useState(initialJob.currency || "AED");
  const [education, setEducation] = useState(initialJob.education || "");
  const [description, setDescription] = useState(initialJob.description || "");
  const [aboutCompany, setAboutCompany] = useState(initialJob.about_company || "");
  const [vacancies, setVacancies] = useState<number>(initialJob.vacancies || 1);
  const [deadline, setDeadline] = useState(initialJob.deadline || "");
  const [featured, setFeatured] = useState<boolean>(initialJob.featured || false);
  const [status, setStatus] = useState<JobEntity["status"]>(
    initialJob.status || "Published"
  );

  // Dynamic Array Fields
  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialJob.responsibilities || [""]
  );
  const [requirements, setRequirements] = useState<string[]>(
    initialJob.requirements || [""]
  );
  const [skills, setSkills] = useState<string[]>(
    initialJob.skills || [""]
  );
  const [benefits, setBenefits] = useState<string[]>(
    initialJob.benefits || ["Comprehensive Health Insurance", "Annual Flight Allowance"]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && !slug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim() || !company.trim()) {
      setErrorMsg("Please provide both job title and hiring organization.");
      return;
    }

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const cleanResponsibilities = responsibilities.filter((r) => r.trim());
    const cleanRequirements = requirements.filter((r) => r.trim());
    const cleanSkills = skills.filter((s) => s.trim());
    const cleanBenefits = benefits.filter((b) => b.trim());

    try {
      setIsSubmitting(true);

      const payload: Partial<JobEntity> = {
        title: title.trim(),
        slug: finalSlug,
        company: company.trim(),
        location: location.trim(),
        employment_type: employmentType,
        industry,
        category,
        department: department.trim() || undefined,
        experience_min: experienceMin ? Number(experienceMin) : undefined,
        experience_max: experienceMax ? Number(experienceMax) : undefined,
        salary_min: salaryMin ? Number(salaryMin) : undefined,
        salary_max: salaryMax ? Number(salaryMax) : undefined,
        currency,
        education: education.trim() || undefined,
        description: description.trim(),
        about_company: aboutCompany.trim() || undefined,
        vacancies: Number(vacancies) || 1,
        deadline: deadline || undefined,
        featured,
        status,
        responsibilities: cleanResponsibilities,
        requirements: cleanRequirements,
        skills: cleanSkills,
        benefits: cleanBenefits,
      };

      if (isEdit && initialJob.id) {
        await base44.entities.Job.update(initialJob.id, payload);
      } else {
        await base44.entities.Job.create(payload);
      }

      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save position listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {errorMsg && (
        <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-sm font-semibold text-destructive">
          {errorMsg}
        </div>
      )}

      {/* Basic Position Details */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
          1. Position & Role Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Job Title" required>
            <Input
              required
              placeholder="e.g. Senior React & Cloud Platform Engineer"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </Field>

          <Field label="URL Slug" hint="Auto-generated identifier">
            <Input
              placeholder="senior-react-cloud-platform-engineer"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Hiring Company / Entity" required>
            <Input
              required
              placeholder="e.g. FinApex Technologies"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Field>

          <Field label="Work Location" required>
            <Input
              required
              placeholder="e.g. DIFC, Dubai, UAE"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Employment Type">
            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as JobEntity["employment_type"])
              }
              className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </Field>

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

          <Field label="Job Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {/* Compensation & Criteria */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
          2. Compensation & Qualifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Currency">
            <Input
              placeholder="AED"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Field>

          <Field label="Minimum Salary (Monthly)">
            <Input
              type="number"
              placeholder="e.g. 20000"
              value={salaryMin ?? ""}
              onChange={(e) =>
                setSalaryMin(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>

          <Field label="Maximum Salary (Monthly)">
            <Input
              type="number"
              placeholder="e.g. 28000"
              value={salaryMax ?? ""}
              onChange={(e) =>
                setSalaryMax(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Min Experience (Years)">
            <Input
              type="number"
              min={0}
              placeholder="e.g. 5"
              value={experienceMin ?? ""}
              onChange={(e) =>
                setExperienceMin(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>

          <Field label="Max Experience (Years)">
            <Input
              type="number"
              min={0}
              placeholder="e.g. 9"
              value={experienceMax ?? ""}
              onChange={(e) =>
                setExperienceMax(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>

          <Field label="Education / Certification">
            <Input
              placeholder="e.g. Bachelor's in CS / CFA"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* Detailed Descriptions & Scope */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
          3. Detailed Description & Requirements
        </h3>

        <Field label="Position Summary / Description" required>
          <Textarea
            required
            rows={4}
            placeholder="Comprehensive description of the mission, team structure, and impact..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        {/* Dynamic Responsibilities */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Key Responsibilities
            </span>
            <button
              type="button"
              onClick={() => addArrayItem(setResponsibilities)}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add Responsibility</span>
            </button>
          </div>
          {responsibilities.map((resp, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                placeholder={`Responsibility #${idx + 1}`}
                value={resp}
                onChange={(e) =>
                  handleArrayChange(setResponsibilities, idx, e.target.value)
                }
              />
              {responsibilities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem(setResponsibilities, idx)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Requirements */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Candidate Requirements
            </span>
            <button
              type="button"
              onClick={() => addArrayItem(setRequirements)}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add Requirement</span>
            </button>
          </div>
          {requirements.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                placeholder={`Requirement #${idx + 1}`}
                value={req}
                onChange={(e) =>
                  handleArrayChange(setRequirements, idx, e.target.value)
                }
              />
              {requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem(setRequirements, idx)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Skills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Target Technical / Functional Skills
            </span>
            <button
              type="button"
              onClick={() => addArrayItem(setSkills)}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add Skill</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. React, TypeScript, Financial Modeling"
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange(setSkills, idx, e.target.value)
                  }
                />
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setSkills, idx)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Benefits */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Benefits & Perks
            </span>
            <button
              type="button"
              onClick={() => addArrayItem(setBenefits)}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add Benefit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. Private Health Insurance"
                  value={b}
                  onChange={(e) =>
                    handleArrayChange(setBenefits, idx, e.target.value)
                  }
                />
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setBenefits, idx)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Field label="About Hiring Organization">
          <Textarea
            rows={2}
            placeholder="Brief profile of the hiring firm, scale, or mission..."
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
          />
        </Field>
      </div>

      {/* Listing Controls */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-3">
          4. Publishing & Status Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Vacancies">
            <Input
              type="number"
              min={1}
              value={vacancies}
              onChange={(e) => setVacancies(Number(e.target.value))}
            />
          </Field>

          <Field label="Application Deadline">
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </Field>

          <Field label="Publication Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as JobEntity["status"])}
              className="flex h-11 w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="Published">Published (Public)</option>
              <option value="Draft">Draft (Private)</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
            </select>
          </Field>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="job-featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer"
          />
          <label
            htmlFor="job-featured"
            className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="h-4 w-4 text-signal" />
            <span>Mark as Featured Opening (pinned on home and top of listings)</span>
          </label>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/dashboard")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="signal"
          size="lg"
          disabled={isSubmitting}
          className="px-8 font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Position...</span>
            </>
          ) : isEdit ? (
            "Update Position Listing"
          ) : (
            "Publish Position"
          )}
        </Button>
      </div>
    </form>
  );
}
