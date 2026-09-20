import { useState } from 'react';
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Copy, Check } from 'lucide-react';
import { portfolioContent } from '../content';
import { RevealOnScroll } from './RevealOnScroll';

export function ContactSection() {
  const { contact } = portfolioContent;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#ceb573]/15 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <RevealOnScroll>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ceb573] block mb-3">
            Get in Touch
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] font-normal tracking-tight mb-6">
            Let's Build Something Meaningful.
          </h2>
          <p className="text-base sm:text-lg text-[#A39E93] font-sans-editorial max-w-2xl mx-auto mb-14 leading-relaxed text-pretty">
            {contact.availabilityNote || "Currently seeking Associate Product Manager and Product Manager opportunities. Feel free to reach out to discuss product ideas, openings, or collaborations."}
          </p>
        </RevealOnScroll>

        {/* Contact & Social Links Grid: Email, LinkedIn, GitHub, Resume (All same size, 16px corners, near-black with inner highlight) */}
        <RevealOnScroll delay={150} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* 1. Email Button */}
          <div
            id="contact-email-card"
            className="group p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between text-left relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          >
            <a
              id="contact-email-link"
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3.5 min-w-0 flex-1"
            >
              <div className="w-10 h-10 rounded-[12px] bg-[#18181F] border border-white/[0.06] flex items-center justify-center text-[#ceb573] group-hover:border-[#ceb573]/50 transition-colors shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#736F68]">Email</span>
                <span className="text-sm font-sans-editorial font-medium text-[#EDE9E1] group-hover:text-[#ceb573] transition-colors duration-200 block truncate">
                  {contact.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-1.5 ml-2 shrink-0">
              <button
                type="button"
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-white/[0.08] hover:border-[#ceb573]/50 hover:bg-white/[0.04] text-[#A39E93] hover:text-[#EDE9E1] transition-colors duration-200 cursor-pointer"
                title={copiedEmail ? "Copied!" : "Copy email address"}
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[#ceb573]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Send email"
                className="p-1 text-[#736F68] group-hover:text-[#ceb573] transition-colors duration-200"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* 2. LinkedIn */}
          <a
            id="contact-linkedin-link"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#18181F] border border-white/[0.06] flex items-center justify-center text-[#ceb573] group-hover:border-[#ceb573]/50 transition-colors shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#736F68]">Connect</span>
                <span className="text-sm font-sans-editorial font-medium text-[#EDE9E1] group-hover:text-[#ceb573] transition-colors duration-200">
                  LinkedIn
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#736F68] group-hover:text-[#ceb573] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>

          {/* 3. GitHub */}
          <a
            id="contact-github-link"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#18181F] border border-white/[0.06] flex items-center justify-center text-[#ceb573] group-hover:border-[#ceb573]/50 transition-colors shrink-0">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#736F68]">Code & Work</span>
                <span className="text-sm font-sans-editorial font-medium text-[#EDE9E1] group-hover:text-[#ceb573] transition-colors duration-200">
                  GitHub
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#736F68] group-hover:text-[#ceb573] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>

          {/* 4. Resume */}
          <a
            id="contact-resume-link"
            href={contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-[16px] bg-[#121215] border border-white/[0.08] hover:border-[#ceb573]/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-[12px] bg-[#18181F] border border-white/[0.06] flex items-center justify-center text-[#ceb573] group-hover:border-[#ceb573]/50 transition-colors shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-[#736F68]">Document</span>
                <span className="text-sm font-sans-editorial font-medium text-[#EDE9E1] group-hover:text-[#ceb573] transition-colors duration-200">
                  Resume
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#736F68] group-hover:text-[#ceb573] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
