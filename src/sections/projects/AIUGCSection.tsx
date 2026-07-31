import { Bot, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import LinkButton from '@/components/ui/LinkButton';

export default function AIUGCSection() {
  return (
    <Section title="02. AI UGC Automation & Marketing">
      <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 relative z-10 border-l-4 border-l-[var(--invert-bg)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            {/* Icon */}
            <div className="mt-1 shrink-0">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors duration-500 border border-[var(--border-color)]">
                <Bot className="w-5 h-5 text-[var(--text-primary)]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow max-w-2xl">
              <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
                TikTok AI Pipeline + Paid Ads Scaling
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 transition-colors duration-500">
                Utilizing Google Flow and generative APIs to programmatically script and edit
                User-Generated Content (UGC) videos. What sets this apart is the execution: I
                directly deploy this AI content as creative assets for{' '}
                <strong className="text-[var(--text-primary)]">TikTok Ads</strong>, testing the
                limits of automated pipelines while optimizing ad spend for audience retention and
                conversion.
              </p>
              <div className="flex gap-2 flex-wrap mb-6 sm:mb-0">
                <Badge highlight>TikTok Ads Manager</Badge>
                <Badge>Google Flow</Badge>
                <Badge>AI Automation</Badge>
                <Badge>ROAS Optimization</Badge>
              </div>
            </div>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-3 min-w-[160px] shrink-0 sm:self-center">
            <LinkButton
              href="https://www.tiktok.com/@snowwies_?is_from_webapp=1&sender_device=pc"
              icon={ArrowUpRight}
              primary
            >
              View TikTok Proof
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
