import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
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
  Copy,
  Clock,
  ShieldCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { siteConfig } from '../../config/siteConfig';
import { Button, Card, Badge, Input, Textarea, Select } from '../../components/ui';

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
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
      icon: <Layers size={22} />,
      desc: 'High-converting landing pages, corporate web presence, and responsive UI redesigns.',
      tag: 'Frontend / UI',
    },
    {
      id: 'React Development',
      title: 'React & TypeScript Development',
      icon: <Code size={22} />,
      desc: 'Complex single-page applications, interactive SaaS dashboards, and design systems.',
      tag: 'Modern SPAs',
    },
    {
      id: 'Backend/API Development',
      title: 'Backend & API Architecture',
      icon: <Server size={22} />,
      desc: 'Production Node.js/Express REST APIs, MongoDB data modeling, and robust JWT auth.',
      tag: 'Node / REST',
    },
    {
      id: 'AI Integration',
      title: 'Practical AI Integration',
      icon: <Cpu size={22} />,
      desc: 'LLM APIs (OpenAI/Gemini), automated document analysis, scoring workflows, and bots.',
      tag: 'Intelligent Apps',
    },
    {
      id: 'Technical Fixes/Deployment',
      title: 'Bug Fixing & Cloud Deployment',
      icon: <Wrench size={22} />,
      desc: 'Diagnosing runtime errors, fixing cross-device layout glitches, and CI/CD hosting fixes.',
      tag: 'Diagnostics',
    },
    {
      id: 'Other',
      title: 'Custom Engineering Task',
      icon: <HelpCircle size={22} />,
      desc: 'Specialized architecture consulting, migration, code audits, or bespoke engineering.',
      tag: 'Bespoke',
    },
  ];

  const sizeOptions = [
    {
      id: 'Small task',
      title: 'Small Task / Quick Fix',
      timeline: '1–3 days',
      desc: 'Isolated bug fix, single component refinement, or targeted speed enhancement.',
    },
    {
      id: 'Small project',
      title: 'Small Project / Landing Page',
      timeline: '1–2 weeks',
      desc: 'High-impact landing page, standalone utility tool, or specific API service.',
    },
    {
      id: 'Medium project',
      title: 'Medium Application / Full Module',
      timeline: '3–5 weeks',
      desc: 'Multi-screen web app, customer portal, or AI-powered processing pipeline.',
    },
    {
      id: 'Large/custom project',
      title: 'Comprehensive Platform',
      timeline: '6+ weeks',
      desc: 'End-to-end full-stack SaaS platform with database, auth, and custom UI.',
    },
    {
      id: 'Not sure',
      title: 'Scope TBD',
      timeline: 'Flexible',
      desc: 'We will collaboratively map the technical scope after reviewing your specifications.',
    },
  ];

  const budgetOptions = [
    {
      id: '₹2,000–₹5,000',
      label: '₹2,000 – ₹5,000',
      desc: 'Small fixes, script updates, single-component tweaks',
    },
    {
      id: '₹5,000–₹15,000',
      label: '₹5,000 – ₹15,000',
      desc: 'High-converting landing pages & targeted API endpoints',
    },
    {
      id: '₹15,000–₹30,000',
      label: '₹15,000 – ₹30,000',
      desc: 'Full-stack application modules & dashboards',
    },
    {
      id: '₹30,000+',
      label: '₹30,000+',
      desc: 'Full platforms, extensive integrations, bespoke systems',
    },
    {
      id: 'Need a quote',
      label: 'Need a Custom Quote',
      desc: 'Budget will be determined after technical requirement review',
    },
  ];

  // Validation per step
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.serviceType) {
        errors.serviceType = 'Please select a service category to proceed.';
      }
    } else if (step === 2) {
      if (!formData.projectSize) {
        errors.projectSize = 'Please select an estimated project scope.';
      }
      if (!formData.budgetRange) {
        errors.budgetRange = 'Please select a preliminary budget bracket.';
      }
    } else if (step === 3) {
      if (!formData.title.trim() || formData.title.trim().length < 3) {
        errors.title = 'Project title must be at least 3 characters.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        errors.description = 'Please describe your requirement in at least 10 characters.';
      }
      if (!formData.desiredOutcome.trim() || formData.desiredOutcome.trim().length < 5) {
        errors.desiredOutcome = 'Please describe what a successful delivery looks like.';
      }
      if (formData.referenceUrl.trim() && !formData.referenceUrl.startsWith('http')) {
        errors.referenceUrl = 'Please enter a valid URL starting with http:// or https://';
      }
    } else if (step === 5) {
      if (!formData.contact.name.trim() || formData.contact.name.trim().length < 2) {
        errors.name = 'Please provide your name (at least 2 characters).';
      }
      if (!formData.contact.email.trim() || !/\S+@\S+\.\S+/.test(formData.contact.email)) {
        errors.email = 'Please provide a valid business or personal email address.';
      }
      if (
        (formData.contact.preferredMethod === 'whatsapp' ||
          formData.contact.preferredMethod === 'phone') &&
        (!formData.contact.phone.trim() || formData.contact.phone.trim().length < 6)
      ) {
        errors.phone = 'Phone / WhatsApp number is required for your selected contact method.';
      }
      if (!formData.consent) {
        errors.consent = 'You must acknowledge agreement to be contacted regarding this request.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const combined = [...selectedFiles, ...filesArray].slice(0, 5);
      setSelectedFiles(combined);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
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

  const handleCopyRef = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // SUCCESS CONFIRMATION RECEIPT
  if (submissionResult) {
    const whatsappFollowup = siteConfig.getWhatsappUrl(
      `Hi Nikhil, I just submitted project request ${submissionResult.referenceNumber} ("${submissionResult.title}").`
    );

    return (
      <div className="section" style={{ padding: 'var(--space-12) 0 var(--space-20)' }}>
        <div className="container-form" style={{ maxWidth: '680px' }}>
          <Card
            variant="elevated"
            padding="lg"
            style={{
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse at top, rgba(14, 165, 233, 0.08) 0%, #0E1627 70%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            {/* Top Glow Accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #38BDF8, #2DD4BF, #10B981)',
              }}
            />

            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--color-success)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6) auto',
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            <Badge variant="success" dot style={{ marginBottom: 'var(--space-3)' }}>
              Transmission Logged &amp; Verified
            </Badge>

            <h1
              style={{
                fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-3xl))',
                fontWeight: 700,
                marginBottom: 'var(--space-3)',
                letterSpacing: '-0.02em',
              }}
            >
              Project Request Received!
            </h1>

            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 auto var(--space-8) auto',
              }}
            >
              Thank you, <strong style={{ color: 'var(--color-text-primary)' }}>{formData.contact.name}</strong>. Your project specifications have been encrypted and queued for architectural review.
            </p>

            {/* Reference Number Box */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-base)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-8)',
                textAlign: 'center',
                boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.4)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Official Tracking Reference
              </span>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: 'var(--space-2) var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <strong
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {submissionResult.referenceNumber}
                </strong>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  title="Copy reference number"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedRef ? 'var(--color-success)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    transition: 'color var(--duration-fast)',
                  }}
                >
                  {copiedRef ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--color-success)' }} />
                Save this reference code. A receipt was prepared for {formData.contact.email}.
              </p>
            </div>

            {/* Expected Next Steps Timeline */}
            <div
              style={{
                textAlign: 'left',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <Clock size={16} style={{ color: 'var(--color-primary)' }} />
                What Happens Next:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    1
                  </div>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block' }}>
                      Scope &amp; Feasibility Review (Within 24 Hours)
                    </strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      I evaluate your requirements, dependencies, and files to calculate precise engineering milestones.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    2
                  </div>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block' }}>
                      Written Assessment &amp; Proposal
                    </strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      You will receive a clear technical scope, deliverables checklist, and transparent quotation via {formData.contact.preferredMethod.toUpperCase()}.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    3
                  </div>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block' }}>
                      Zero Upfront Pressure
                    </strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      No payment or commitment is required until we agree on technical milestones and timeline.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <a
                href={whatsappFollowup}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    border: 'none',
                    color: '#FFFFFF',
                  }}
                >
                  <MessageSquare size={18} />
                  Fast-Track Discussion on WhatsApp
                </Button>
              </a>

              <Link to="/projects" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="md" style={{ width: '100%' }}>
                  Explore Case Studies &amp; Architecture &rarr;
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const stepLabels = [
    { title: 'Service', sub: 'Category' },
    { title: 'Scope', sub: 'Scale & Budget' },
    { title: 'Details', sub: 'Requirements' },
    { title: 'Files', sub: 'Attachments' },
    { title: 'Contact', sub: 'Channels' },
    { title: 'Review', sub: 'Submission' },
  ];

  return (
    <div className="section" style={{ padding: 'var(--space-10) 0 var(--space-20)' }}>
      <div className="container-form" style={{ maxWidth: '820px' }}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <Badge variant="brand" style={{ marginBottom: 'var(--space-3)' }}>
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            Guided Project Intake
          </Badge>
          <h1
            style={{
              fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-3xl))',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-3)',
            }}
          >
            Start a Project Request
          </h1>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Structured requirement intake to evaluate feasibility, estimate milestones, and provide a clear quotation without endless back-and-forth.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div
          style={{
            marginBottom: 'var(--space-10)',
            position: 'relative',
          }}
        >
          {/* Background Track */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '4%',
              right: '4%',
              height: '2px',
              backgroundColor: 'var(--color-border)',
              zIndex: 1,
            }}
          >
            {/* Active Fill Track */}
            <div
              style={{
                height: '100%',
                backgroundColor: 'var(--color-primary)',
                width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100}%`,
                transition: 'width var(--duration-normal) var(--ease-standard)',
                boxShadow: '0 0 10px var(--color-primary-glow)',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {stepLabels.map((lbl, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <button
                  key={lbl.title}
                  type="button"
                  onClick={() => {
                    // Allow clicking previous steps
                    if (isCompleted) {
                      setCurrentStep(stepNum);
                    }
                  }}
                  disabled={!isCompleted && !isCurrent}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: isCompleted ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    width: '60px',
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isCompleted
                        ? 'var(--color-primary)'
                        : isCurrent
                        ? 'var(--color-surface-elevated)'
                        : 'var(--color-surface-base)',
                      border: '2px solid',
                      borderColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
                      color: isCompleted
                        ? '#080C16'
                        : isCurrent
                        ? 'var(--color-primary)'
                        : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      boxShadow: isCurrent ? '0 0 16px var(--color-primary-glow)' : 'none',
                      transition: 'all var(--duration-fast) var(--ease-standard)',
                    }}
                  >
                    {isCompleted ? <Check size={16} strokeWidth={3} /> : stepNum}
                  </div>
                  <div style={{ textAlign: 'center' }} className="step-label-container">
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: isCurrent ? 600 : 500,
                        color: isCurrent
                          ? 'var(--color-text-primary)'
                          : isCompleted
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                        display: 'block',
                      }}
                    >
                      {lbl.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Submit Error Banner */}
        {submitError && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              color: 'var(--color-error)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
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
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 1 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Select Primary Service Domain
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Choose the technical discipline that best matches your immediate requirement.
              </p>
            </div>

            {fieldErrors.serviceType && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  color: 'var(--color-error)',
                  fontSize: 'var(--text-xs)',
                  marginBottom: 'var(--space-4)',
                  padding: 'var(--space-2) var(--space-3)',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <AlertCircle size={15} /> {fieldErrors.serviceType}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: isSelected
                        ? 'rgba(56, 189, 248, 0.09)'
                        : 'var(--color-surface-base)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                      boxShadow: isSelected
                        ? '0 0 20px var(--color-primary-glow), inset 0 0 12px rgba(56, 189, 248, 0.05)'
                        : 'none',
                      cursor: 'pointer',
                      transition: 'all var(--duration-fast) var(--ease-standard)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected
                            ? 'rgba(56, 189, 248, 0.2)'
                            : 'var(--color-surface-elevated)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {srv.icon}
                      </div>
                      <Badge variant={isSelected ? 'brand' : 'subtle'} size="sm">
                        {srv.tag}
                      </Badge>
                    </div>

                    <div>
                      <strong
                        style={{
                          fontSize: 'var(--text-base)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                          display: 'block',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {srv.title}
                      </strong>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.5,
                          display: 'block',
                        }}
                      >
                        {srv.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" size="md" onClick={handleNext}>
                Continue to Scope &amp; Budget
                <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: PROJECT SIZE & BUDGET */}
        {currentStep === 2 && (
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 2 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Estimated Scope &amp; Preliminary Budget
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Budget brackets provide mutual clarity and do not represent binding obligations until specifications are approved.
              </p>
            </div>

            {/* Scope / Size Section */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <label
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Estimated Project Scope *
              </label>

              {fieldErrors.projectSize && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    color: 'var(--color-error)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <AlertCircle size={14} /> {fieldErrors.projectSize}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {sizeOptions.map((s) => {
                  const isSelected = formData.projectSize === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectSize: s.id })}
                      style={{
                        textAlign: 'left',
                        padding: 'var(--space-4) var(--space-5)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected
                          ? 'rgba(56, 189, 248, 0.08)'
                          : 'var(--color-surface-base)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        transition: 'all var(--duration-fast)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
                          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                            {s.title}
                          </strong>
                          <Badge variant="subtle" size="sm">
                            {s.timeline}
                          </Badge>
                        </div>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'block' }}>
                          {s.desc}
                        </span>
                      </div>
                      {isSelected ? (
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-primary)',
                            color: '#080C16',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '1px solid var(--color-border)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range Section */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <label
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Preliminary Budget Bracket *
              </label>

              {fieldErrors.budgetRange && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    color: 'var(--color-error)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <AlertCircle size={14} /> {fieldErrors.budgetRange}
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
                        backgroundColor: isSelected
                          ? 'rgba(56, 189, 248, 0.08)'
                          : 'var(--color-surface-base)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                        cursor: 'pointer',
                        transition: 'all var(--duration-fast)',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'var(--font-mono)',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                          display: 'block',
                          marginBottom: '4px',
                        }}
                      >
                        {b.label}
                      </strong>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'block' }}>
                        {b.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" size="md" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </Button>
              <Button variant="primary" size="md" onClick={handleNext}>
                Continue to Requirements
                <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: PROJECT REQUIREMENTS */}
        {currentStep === 3 && (
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 3 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Project Specifications &amp; Goals
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Explain your goals in plain English. No engineering jargon required.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
              <Input
                label="Project Title / Summary"
                required
                placeholder="e.g. Modern Landing Page for AI Product / React Dashboard Refactor"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={fieldErrors.title}
                helperText="A brief heading for this milestone or initiative."
              />

              <Textarea
                label="Detailed Description & Requirements"
                required
                rows={4}
                placeholder="Describe key features, user flows, current friction points, or exact changes needed..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={fieldErrors.description}
                helperText="Minimum 10 characters. Include any specific technical preferences."
              />

              <Input
                label="What result makes this project 100% successful?"
                required
                placeholder="e.g. Conversion rate increases / Dashboard loads under 1 second / Fully responsive on mobile"
                value={formData.desiredOutcome}
                onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
                error={fieldErrors.desiredOutcome}
                helperText="Your measurable target or definition of done."
              />

              <Input
                label="Existing Architecture or Assets (Optional)"
                placeholder="e.g. Have Figma wireframes / Existing GitHub repo / Starting completely from scratch"
                value={formData.existingSystem}
                onChange={(e) => setFormData({ ...formData, existingSystem: e.target.value })}
                helperText="Mention existing tools, tech stack, or accounts we will work with."
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <Select
                  label="Design Assets Status"
                  value={formData.hasDesign}
                  onChange={(e) => setFormData({ ...formData, hasDesign: e.target.value as any })}
                >
                  <option value="not_sure">Not sure / Need advice &amp; guidance</option>
                  <option value="yes">Yes, production designs ready (Figma/Adobe)</option>
                  <option value="partial">Partial sketches or design inspiration</option>
                  <option value="no">No, need UI/UX designed from scratch</option>
                </Select>

                <Input
                  label="Target Delivery Deadline (Optional)"
                  leftIcon={<Calendar size={16} />}
                  placeholder="e.g. Within 2 weeks / End of quarter"
                  value={formData.desiredDeadline}
                  onChange={(e) => setFormData({ ...formData, desiredDeadline: e.target.value })}
                />
              </div>

              <Input
                label="Reference Website, Figma, or Repository URL (Optional)"
                leftIcon={<ExternalLink size={16} />}
                placeholder="https://example.com or https://github.com/..."
                value={formData.referenceUrl}
                onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                error={fieldErrors.referenceUrl}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" size="md" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </Button>
              <Button variant="primary" size="md" onClick={handleNext}>
                Continue to Attachments
                <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 4: ATTACHMENTS */}
        {currentStep === 4 && (
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 4 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Supporting Files &amp; Briefs (Optional)
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Attach project specs, Figma exports, PDF requirement documents, or screenshots. You may skip this step.
              </p>
            </div>

            {/* Dropzone */}
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-10) var(--space-6)',
                border: '2px dashed',
                borderColor: isDragging ? 'var(--color-primary)' : 'var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isDragging ? 'rgba(56, 189, 248, 0.08)' : 'var(--color-surface-base)',
                cursor: 'pointer',
                marginBottom: 'var(--space-6)',
                transition: 'all var(--duration-fast)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <Upload size={26} />
              </div>
              <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Drag &amp; drop files here, or click to browse
              </strong>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Supported: PNG, JPEG, WebP, PDF, DOCX, TXT · Up to 5 files (Max 10MB each)
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Files Queued for Upload ({selectedFiles.length}/5):
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFiles([])}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-error)',
                      fontSize: 'var(--text-xs)',
                      cursor: 'pointer',
                    }}
                  >
                    Clear All
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'var(--color-surface-elevated)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <FileText size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', display: 'block' }}>
                            {file.name}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
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
              <Button variant="secondary" size="md" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </Button>
              <Button variant="primary" size="md" onClick={handleNext}>
                {selectedFiles.length > 0 ? 'Continue with Files' : 'Skip & Continue'}
                <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 5: CONTACT DETAILS */}
        {currentStep === 5 && (
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 5 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Contact &amp; Delivery Channel
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Where should I send the technical breakdown and quotation?
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <Input
                  label="Full Name"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.contact.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, name: e.target.value },
                    })
                  }
                  error={fieldErrors.name}
                />

                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.contact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value },
                    })
                  }
                  error={fieldErrors.email}
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    display: 'block',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Preferred Contact Channel *
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {[
                    { id: 'email', label: 'Email Communication' },
                    { id: 'whatsapp', label: 'WhatsApp Messenger' },
                    { id: 'phone', label: 'Direct Phone Call' },
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
                          padding: 'var(--space-2) var(--space-4)',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                          backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                          color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all var(--duration-fast)',
                        }}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <Input
                  label={`Phone / WhatsApp Number ${
                    formData.contact.preferredMethod === 'email' ? '(Optional)' : '*'
                  }`}
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  error={fieldErrors.phone}
                />

                <Input
                  label="Company or Startup (Optional)"
                  placeholder="e.g. Acme Studio"
                  value={formData.contact.company}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, company: e.target.value },
                    })
                  }
                />
              </div>

              {/* Consent Checkbox */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-base)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    style={{
                      marginTop: '2px',
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--color-primary)',
                      cursor: 'pointer',
                    }}
                  />
                  <span>
                    I consent to Nikhil Kumar reviewing this project requirement and contacting me with an assessment. Information is strictly private and never shared.{' '}
                    <Link to="/privacy" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {fieldErrors.consent && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      color: 'var(--color-error)',
                      fontSize: 'var(--text-xs)',
                      marginTop: 'var(--space-2)',
                    }}
                  >
                    <AlertCircle size={14} /> {fieldErrors.consent}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" size="md" onClick={handleBack}>
                <ChevronLeft size={16} /> Back
              </Button>
              <Button variant="primary" size="md" onClick={handleNext}>
                Review &amp; Submit
                <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 6: FINAL REVIEW & SUBMIT */}
        {currentStep === 6 && (
          <Card variant="elevated" padding="lg" className="animate-fade-in">
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Step 6 of 6
              </span>
              <h2
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Final Review &amp; Dispatch
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Please confirm your details. Click any section&apos;s &ldquo;Edit&rdquo; button to make quick updates.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
              {/* Section 1: Service & Budget */}
              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-base)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    1. Domain &amp; Budget
                  </strong>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                    style={{ padding: '2px 8px', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Service: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.serviceType}</strong></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Project Scope: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.projectSize}</strong></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Budget: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.budgetRange}</strong></div>
                </div>
              </div>

              {/* Section 2: Requirements */}
              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-base)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    2. Specifications &amp; Goals
                  </strong>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                    style={{ padding: '2px 8px', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Title: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.title}</strong></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Requirement: </span><span style={{ color: 'var(--color-text-secondary)' }}>{formData.description}</span></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Target Outcome: </span><span style={{ color: 'var(--color-text-secondary)' }}>{formData.desiredOutcome}</span></div>
                  {formData.desiredDeadline && <div><span style={{ color: 'var(--color-text-muted)' }}>Deadline: </span><span style={{ color: 'var(--color-text-secondary)' }}>{formData.desiredDeadline}</span></div>}
                  {formData.referenceUrl && <div><span style={{ color: 'var(--color-text-muted)' }}>Reference: </span><a href={formData.referenceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>{formData.referenceUrl}</a></div>}
                </div>
              </div>

              {/* Section 3: Contact */}
              <div
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-base)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    3. Contact Details
                  </strong>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(5)}
                    style={{ padding: '2px 8px', fontSize: 'var(--text-xs)' }}
                  >
                    Edit
                  </Button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Name: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.contact.name}</strong></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Email: </span><strong style={{ color: 'var(--color-text-primary)' }}>{formData.contact.email}</strong></div>
                  <div><span style={{ color: 'var(--color-text-muted)' }}>Preferred Channel: </span><Badge variant="subtle" size="sm">{formData.contact.preferredMethod.toUpperCase()}</Badge></div>
                  {formData.contact.phone && <div><span style={{ color: 'var(--color-text-muted)' }}>Phone / WhatsApp: </span><span style={{ color: 'var(--color-text-primary)' }}>{formData.contact.phone}</span></div>}
                  {selectedFiles.length > 0 && <div><span style={{ color: 'var(--color-text-muted)' }}>Attachments: </span><span style={{ color: 'var(--color-text-primary)' }}>{selectedFiles.length} file(s) attached</span></div>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="secondary"
                size="md"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                <ChevronLeft size={16} /> Back
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                isLoading={isSubmitting}
              >
                {uploadingFiles ? (
                  'Uploading Attachments...'
                ) : (
                  <>
                    <Sparkles size={18} /> Submit Project Request
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .step-label-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
