import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Check,
  ChevronLeft,
  Upload,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Layers,
  Code,
  Server,
  Cpu,
  Wrench,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { siteConfig } from '../../config/siteConfig';

interface FormData {
  serviceType: string;
  projectSize: string;
  budgetRange: string;
  title: string;
  description: string;
  existingSystem: string;
  desiredOutcome: string;
  hasDesign: 'yes' | 'no' | 'partial' | 'not_sure';
  desiredDeadline: string;
  referenceUrl: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    preferredMethod: 'email' | 'whatsapp' | 'phone';
  };
  consent: boolean;
  website_hp: string;
}

export const StartProjectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: initialService,
    projectSize: '',
    budgetRange: '',
    title: '',
    description: '',
    existingSystem: '',
    desiredOutcome: '',
    hasDesign: 'not_sure',
    desiredDeadline: '',
    referenceUrl: '',
    contact: {
      name: '',
      email: '',
      phone: '',
      company: '',
      preferredMethod: 'email',
    },
    consent: false,
    website_hp: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedAttachments, setUploadedAttachments] = useState<any[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceNumber: string;
    title: string;
  } | null>(null);

  // Sync service preselection from query param
  useEffect(() => {
    if (initialService && !formData.serviceType) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const serviceOptions = [
    {
      id: 'Website Development',
      title: 'Website Development',
      icon: <Layers size={20} />,
      desc: 'Landing pages, business portfolios, responsive UI redesigns.',
    },
    {
      id: 'React Development',
      title: 'React & TypeScript Development',
      icon: <Code size={20} />,
      desc: 'Single-page web applications, interactive dashboards, component libraries.',
    },
    {
      id: 'Backend/API Development',
      title: 'Backend & API Development',
      icon: <Server size={20} />,
      desc: 'Node.js/Express REST APIs, MongoDB data architecture, secure auth.',
    },
    {
      id: 'AI Integration',
      title: 'Practical AI Integration',
      icon: <Cpu size={20} />,
      desc: 'LLM APIs, resume & text parsing, automated analysis & scoring.',
    },
    {
      id: 'Technical Fixes/Deployment',
      title: 'Bug Fixing & Deployment',
      icon: <Wrench size={20} />,
      desc: 'Fixing runtime bugs, responsive mobile layouts, cloud deployment troubleshooting.',
    },
    {
      id: 'Other',
      title: 'Other Technical Requirement',
      icon: <HelpCircle size={20} />,
      desc: 'Custom technical tasks, consulting, or requirements not listed above.',
    },
  ];

  const sizeOptions = [
    { id: 'Small task', title: 'Small Task', desc: '1–3 days. Focused bug fix, single component or small page update.' },
    { id: 'Small project', title: 'Small Project', desc: '1–2 weeks. Clean landing page, targeted API, or small tool.' },
    { id: 'Medium project', title: 'Medium Project', desc: '3–5 weeks. Multi-page web app, dashboard, or AI integration.' },
    { id: 'Large/custom project', title: 'Large / Custom', desc: '6+ weeks. Comprehensive end-to-end full-stack platform.' },
    { id: 'Not sure', title: 'Not Sure Yet', desc: 'We will determine the scope together after requirement review.' },
  ];

  const budgetOptions = [
    { id: '₹2,000–₹5,000', label: '₹2,000 – ₹5,000', desc: 'Small fixes & single page tasks' },
    { id: '₹5,000–₹15,000', label: '₹5,000 – ₹15,000', desc: 'Targeted features & landing pages' },
    { id: '₹15,000–₹30,000', label: '₹15,000 – ₹30,000', desc: 'Full-stack modules & apps' },
    { id: '₹30,000+', label: '₹30,000+', desc: 'Complete platforms & deep AI features' },
    { id: 'Need a quote', label: 'Need a custom quote', desc: 'Scope will determine preliminary estimate' },
  ];

  // Validation per step
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.serviceType) {
        errors.serviceType = 'Please select a service to proceed.';
      }
    } else if (step === 2) {
      if (!formData.projectSize) {
        errors.projectSize = 'Please choose an estimated project size.';
      }
      if (!formData.budgetRange) {
        errors.budgetRange = 'Please choose a preliminary budget range.';
      }
    } else if (step === 3) {
      if (!formData.title.trim() || formData.title.trim().length < 3) {
        errors.title = 'Title must be at least 3 characters.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        errors.description = 'Please describe your requirement in at least 10 characters.';
      }
      if (!formData.desiredOutcome.trim() || formData.desiredOutcome.trim().length < 5) {
        errors.desiredOutcome = 'Please tell us what a successful outcome looks like.';
      }
      if (formData.referenceUrl.trim() && !formData.referenceUrl.startsWith('http')) {
        errors.referenceUrl = 'Please enter a valid URL starting with http:// or https://';
      }
    } else if (step === 5) {
      if (!formData.contact.name.trim() || formData.contact.name.trim().length < 2) {
        errors.name = 'Please provide your name (at least 2 characters).';
      }
      if (!formData.contact.email.trim() || !/\S+@\S+\.\S+/.test(formData.contact.email)) {
        errors.email = 'Please provide a valid email address.';
      }
      if (
        (formData.contact.preferredMethod === 'whatsapp' ||
          formData.contact.preferredMethod === 'phone') &&
        (!formData.contact.phone.trim() || formData.contact.phone.trim().length < 6)
      ) {
        errors.phone = 'Phone / WhatsApp number is required for your preferred contact method.';
      }
      if (!formData.consent) {
        errors.consent = 'You must agree to be contacted regarding this request.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const combined = [...selectedFiles, ...filesArray].slice(0, 5);
      setSelectedFiles(combined);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Final Form Submission
  const handleSubmit = async () => {
    if (!validateStep(5)) {
      setCurrentStep(5);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      let attachmentsData = [...uploadedAttachments];

      // Upload selected files if any
      if (selectedFiles.length > 0 && uploadedAttachments.length === 0) {
        setUploadingFiles(true);
        const uploadRes = await apiClient.uploadAttachments(selectedFiles);
        if (uploadRes.success && uploadRes.data) {
          attachmentsData = uploadRes.data;
          setUploadedAttachments(uploadRes.data);
        } else {
          throw new Error(uploadRes.error?.message || 'File upload failed. Please try again.');
        }
        setUploadingFiles(false);
      }

      // Submit the project request
      const payload = {
        serviceType: formData.serviceType,
        projectSize: formData.projectSize,
        budgetRange: formData.budgetRange,
        title: formData.title,
        description: formData.description,
        existingSystem: formData.existingSystem,
        desiredOutcome: formData.desiredOutcome,
        hasDesign: formData.hasDesign,
        desiredDeadline: formData.desiredDeadline,
        referenceUrl: formData.referenceUrl,
        contact: formData.contact,
        consent: {
          accepted: true,
        },
        attachments: attachmentsData,
        website_hp: formData.website_hp,
      };

      const res = await apiClient.submitProjectRequest(payload);

      if (res.success && res.data) {
        setSubmissionResult({
          referenceNumber: res.data.referenceNumber,
          title: res.data.title,
        });
      } else {
        setSubmitError(res.error?.message || 'Submission failed. Please check your inputs.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadingFiles(false);
    }
  };

  // SUCCESS CONFIRMATION RECEIPT
  if (submissionResult) {
    const whatsappFollowup = siteConfig.getWhatsappUrl(
      `Hi Nikhil, I just submitted project request ${submissionResult.referenceNumber} ("${submissionResult.title}").`
    );

    return (
      <div className="section">
        <div className="container-form">
          <div
            className="card card-elevated"
            style={{
              padding: 'var(--space-10) var(--space-8)',
              background: 'linear-gradient(135deg, #18233D 0%, #121A2E 100%)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6) auto',
              }}
            >
              <CheckCircle2 size={34} />
            </div>

            <span className="tag tag-success" style={{ marginBottom: 'var(--space-2)' }}>
              Submission Confirmed
            </span>

            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-3)' }}>
              Project Request Received!
            </h1>

            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Thank you, <strong>{formData.contact.name}</strong>. Your project requirement has been safely logged.
            </p>

            {/* Reference Number Box */}
            <div
              style={{
                backgroundColor: 'rgba(11, 16, 32, 0.7)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                YOUR PROJECT REFERENCE NUMBER:
              </span>
              <strong
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                {submissionResult.referenceNumber}
              </strong>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: 0 }}>
                Please keep this reference for any correspondence. A confirmation has been prepared for {formData.contact.email}.
              </p>
            </div>

            {/* Next Steps Checklist */}
            <div
              style={{
                textAlign: 'left',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--color-border-subtle)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                Expected Next Steps:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: 'var(--color-primary)' }} />
                  Nikhil will review your requirement, specifications, and files within 24–48 hours.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: 'var(--color-primary)' }} />
                  You will receive an assessment or preliminary scope via {formData.contact.preferredMethod.toUpperCase()}.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} style={{ color: 'var(--color-primary)' }} />
                  No payment is expected until scope, milestones, and timeline are finalized.
                </li>
              </ul>
            </div>

            {/* Next Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={whatsappFollowup}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <MessageSquare size={16} style={{ color: '#25D366' }} />
                Send Urgent Note on WhatsApp
              </a>
              <Link to="/projects" className="btn btn-ghost">
                Explore More Featured Work &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stepLabels = ['Service', 'Scope & Budget', 'Requirements', 'Files', 'Contact', 'Review'];

  return (
    <div className="section">
      <div className="container-form">
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="tag" style={{ marginBottom: 'var(--space-2)' }}>
            Guided Project Intake
          </span>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
            Start a Project Request
          </h1>
          <p style={{ marginInline: 'auto', fontSize: 'var(--text-sm)' }}>
            Fill out the details below so I can understand your requirements and prepare a clear preliminary scope.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-8)',
            position: 'relative',
          }}
        >
          {stepLabels.map((lbl, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={lbl}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isCompleted
                      ? 'var(--color-primary)'
                      : isCurrent
                      ? 'var(--color-surface-raised)'
                      : 'var(--color-surface)',
                    border: '1px solid',
                    borderColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                    color: isCompleted ? '#070B14' : isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                  }}
                >
                  {isCompleted ? <Check size={16} /> : stepNum}
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: isCurrent ? 600 : 400,
                    display: 'none',
                  }}
                  className="step-text"
                >
                  {lbl}
                </span>
              </div>
            );
          })}
        </div>

        {/* Global Submit Error Banner */}
        {submitError && (
          <div
            className="card"
            style={{
              backgroundColor: 'var(--color-error-bg)',
              borderColor: 'var(--color-error)',
              color: 'var(--color-error)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span style={{ fontSize: 'var(--text-sm)' }}>{submitError}</span>
          </div>
        )}

        {/* Hidden Honeypot Input */}
        <input
          type="text"
          name="website_hp"
          value={formData.website_hp}
          onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
          style={{ display: 'none', position: 'absolute', left: '-9999px' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* STEP 1: SERVICE TYPE */}
        {currentStep === 1 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 1: What service do you need?
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Choose the primary area of assistance. You can clarify details in the next step.
            </p>

            {fieldErrors.serviceType && (
              <div className="field-error-text" style={{ marginBottom: 'var(--space-4)' }}>
                <AlertCircle size={14} /> {fieldErrors.serviceType}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
              }}
            >
              {serviceOptions.map((srv) => {
                const isSelected = formData.serviceType === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, serviceType: srv.id });
                      setFieldErrors({});
                    }}
                    style={{
                      textAlign: 'left',
                      padding: 'var(--space-5)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'rgba(110, 231, 242, 0.1)' : 'var(--color-surface)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                      boxShadow: isSelected ? '0 0 16px var(--color-primary-glow)' : 'none',
                      cursor: 'pointer',
                      transition: 'all var(--duration-fast) var(--ease-standard)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {srv.icon}
                      {isSelected && <Check size={18} style={{ color: 'var(--color-primary)' }} />}
                    </div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {srv.title}
                    </strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      {srv.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Continue to Scope &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT SIZE & BUDGET */}
        {currentStep === 2 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 2: Project Size &amp; Preliminary Budget
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Budget selections are preliminary estimates to help gauge project scope and do not create binding quotations.
            </p>

            {/* Size Section */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label className="form-label" style={{ marginBottom: 'var(--space-3)' }}>
                Estimated Project Size
              </label>
              {fieldErrors.projectSize && (
                <div className="field-error-text" style={{ marginBottom: 'var(--space-3)' }}>
                  <AlertCircle size={14} /> {fieldErrors.projectSize}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {sizeOptions.map((s) => {
                  const isSelected = formData.projectSize === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectSize: s.id })}
                      style={{
                        textAlign: 'left',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'rgba(110, 231, 242, 0.1)' : 'var(--color-surface)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                          {s.title}
                        </strong>
                        <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                          {s.desc}
                        </span>
                      </div>
                      {isSelected && <Check size={18} style={{ color: 'var(--color-primary)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Section */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <label className="form-label" style={{ marginBottom: 'var(--space-3)' }}>
                Preliminary Budget Range
              </label>
              {fieldErrors.budgetRange && (
                <div className="field-error-text" style={{ marginBottom: 'var(--space-3)' }}>
                  <AlertCircle size={14} /> {fieldErrors.budgetRange}
                </div>
              )}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                {budgetOptions.map((b) => {
                  const isSelected = formData.budgetRange === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: b.id })}
                      style={{
                        textAlign: 'left',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'rgba(110, 231, 242, 0.1)' : 'var(--color-surface)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block' }}>
                        {b.label}
                      </strong>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {b.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Continue to Requirements &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT REQUIREMENTS */}
        {currentStep === 3 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 3: Project Requirements &amp; Details
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Tell me about what you want to build or change. Non-technical descriptions are completely welcome!
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="req-title">
                Project Title / Summary *
              </label>
              <input
                id="req-title"
                type="text"
                placeholder="e.g. Modern Landing Page for SaaS product / React Dashboard Fix"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`input ${fieldErrors.title ? 'input-error' : ''}`}
              />
              {fieldErrors.title && <span className="field-error-text">{fieldErrors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="req-desc">
                What do you want to build or change? *
              </label>
              <textarea
                id="req-desc"
                rows={4}
                placeholder="Describe what features you need, what problems need solving, or what changes are required..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`textarea ${fieldErrors.description ? 'input-error' : ''}`}
              />
              {fieldErrors.description && <span className="field-error-text">{fieldErrors.description}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="req-outcome">
                What result would make this project successful? *
              </label>
              <input
                id="req-outcome"
                type="text"
                placeholder="e.g. Visitors can sign up easily / API responds in under 200ms / Mobile layout looks clean"
                value={formData.desiredOutcome}
                onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
                className={`input ${fieldErrors.desiredOutcome ? 'input-error' : ''}`}
              />
              {fieldErrors.desiredOutcome && <span className="field-error-text">{fieldErrors.desiredOutcome}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="req-existing">
                What already exists? (Optional)
              </label>
              <input
                id="req-existing"
                type="text"
                placeholder="e.g. We have a Figma design / Existing GitHub repo / Nothing, starting from scratch"
                value={formData.existingSystem}
                onChange={(e) => setFormData({ ...formData, existingSystem: e.target.value })}
                className="input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="req-design">
                  Do you have designs ready?
                </label>
                <select
                  id="req-design"
                  value={formData.hasDesign}
                  onChange={(e: any) => setFormData({ ...formData, hasDesign: e.target.value })}
                  className="select"
                >
                  <option value="not_sure">Not sure / Need advice</option>
                  <option value="yes">Yes, complete designs (Figma/Adobe)</option>
                  <option value="partial">Partial wireframes or inspiration</option>
                  <option value="no">No, need design from scratch</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="req-deadline">
                  Target Deadline (Optional)
                </label>
                <input
                  id="req-deadline"
                  type="text"
                  placeholder="e.g. Within 2 weeks / End of month"
                  value={formData.desiredDeadline}
                  onChange={(e) => setFormData({ ...formData, desiredDeadline: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="req-refurl">
                Reference Website or Repository URL (Optional)
              </label>
              <input
                id="req-refurl"
                type="url"
                placeholder="https://example.com or https://github.com/..."
                value={formData.referenceUrl}
                onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                className={`input ${fieldErrors.referenceUrl ? 'input-error' : ''}`}
              />
              {fieldErrors.referenceUrl && <span className="field-error-text">{fieldErrors.referenceUrl}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)' }}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Continue to Attachments &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ATTACHMENTS */}
        {currentStep === 4 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 4: Supporting Files &amp; Attachments (Optional)
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Attach screenshots, design files, PDF briefs, or error logs. You can skip this step if you don&apos;t have files.
            </p>

            {/* Drop Zone */}
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-10)',
                border: '2px dashed var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(18, 26, 46, 0.4)',
                cursor: 'pointer',
                marginBottom: 'var(--space-6)',
              }}
            >
              <Upload size={32} style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }} />
              <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                Click to browse files
              </strong>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                Allowed: PNG, JPEG, WebP, PDF, DOCX, TXT · Up to 5 files (Max 10MB each)
              </span>
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.webp,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                  Selected Files ({selectedFiles.length}/5):
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                          {file.name}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                          ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                        }}
                        aria-label="Remove file"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary">
                {selectedFiles.length > 0 ? 'Continue with Files' : 'Skip & Continue'} &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {currentStep === 5 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 5: Your Contact Details
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              How should I reach you regarding your project evaluation?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="c-name">
                  Full Name *
                </label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.contact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, name: e.target.value },
                    })
                  }
                  className={`input ${fieldErrors.name ? 'input-error' : ''}`}
                />
                {fieldErrors.name && <span className="field-error-text">{fieldErrors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="c-email">
                  Email Address *
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value },
                    })
                  }
                  className={`input ${fieldErrors.email ? 'input-error' : ''}`}
                />
                {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Preferred Contact Method *
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {[
                  { id: 'email', label: 'Email' },
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'phone', label: 'Phone Call' },
                ].map((m) => {
                  const isSelected = formData.contact.preferredMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, preferredMethod: m.id as any },
                        })
                      }
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border-subtle)',
                        backgroundColor: isSelected ? 'rgba(110, 231, 242, 0.12)' : 'transparent',
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="c-phone">
                  Phone / WhatsApp Number{' '}
                  {formData.contact.preferredMethod === 'email' ? '(Optional)' : '*'}
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  className={`input ${fieldErrors.phone ? 'input-error' : ''}`}
                />
                {fieldErrors.phone && <span className="field-error-text">{fieldErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="c-company">
                  Company / Organization (Optional)
                </label>
                <input
                  id="c-company"
                  type="text"
                  placeholder="Company name"
                  value={formData.contact.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, company: e.target.value },
                    })
                  }
                  className="input"
                />
              </div>
            </div>

            {/* Explicit Consent Checkbox */}
            <div style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                />
                <span>
                  I consent to Nikhil Kumar contacting me regarding this project request. My information will never be shared or sold.{' '}
                  <Link to="/privacy" target="_blank" style={{ textDecoration: 'underline' }}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {fieldErrors.consent && (
                <div className="field-error-text" style={{ marginTop: '0.4rem' }}>
                  <AlertCircle size={14} /> {fieldErrors.consent}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                <ChevronLeft size={16} /> Back
              </button>
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Review Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: FINAL REVIEW & SUBMIT */}
        {currentStep === 6 && (
          <div className="card card-elevated animate-fade-in" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Step 6: Review Your Project Request
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Please review your information before submitting. You can click Edit on any section to make adjustments.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              {/* Review Section 1: Service & Budget */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
                    Service &amp; Budget
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Service:</strong> {formData.serviceType}</div>
                  <div><strong>Project Size:</strong> {formData.projectSize}</div>
                  <div><strong>Budget:</strong> {formData.budgetRange}</div>
                </div>
              </div>

              {/* Review Section 2: Requirements */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
                    Requirement Details
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Title:</strong> {formData.title}</div>
                  <div style={{ marginTop: '0.25rem' }}><strong>Description:</strong> {formData.description}</div>
                  <div style={{ marginTop: '0.25rem' }}><strong>Desired Outcome:</strong> {formData.desiredOutcome}</div>
                  {formData.desiredDeadline && <div><strong>Deadline:</strong> {formData.desiredDeadline}</div>}
                  {formData.referenceUrl && <div><strong>Reference:</strong> {formData.referenceUrl}</div>}
                </div>
              </div>

              {/* Review Section 3: Contact */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>
                    Contact Information
                  </strong>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <div><strong>Name:</strong> {formData.contact.name}</div>
                  <div><strong>Email:</strong> {formData.contact.email}</div>
                  <div><strong>Preferred Method:</strong> {formData.contact.preferredMethod.toUpperCase()}</div>
                  {formData.contact.phone && <div><strong>Phone / WhatsApp:</strong> {formData.contact.phone}</div>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="btn btn-secondary"
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
              >
                {isSubmitting ? (
                  uploadingFiles ? 'Uploading Files...' : 'Submitting Request...'
                ) : (
                  <>
                    <Sparkles size={18} /> Submit Project Request
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .step-text {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
