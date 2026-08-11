import { Laptop } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';

export default function HardwareSection() {
  return (
    <Section title="04. Hardware Arbitrage & E-commerce">
      <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 relative z-10 border-l-4 border-l-[var(--invert-bg)]">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          {/* Icon */}
          <div className="mt-1 shrink-0">
            <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors duration-500 border border-[var(--border-color)]">
              <Laptop className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow max-w-2xl">
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
              Device Restoration &amp; Ad-Driven Flipping
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 transition-colors duration-500">
              A hands-on secondary operation focused on sourcing, diagnosing, and repairing
              second-hand laptops. Restored units are strategically priced and flipped on
              platforms like Carousell. To scale volume, I run targeted{' '}
              <strong className="text-[var(--text-primary)]">Facebook Ads</strong> and{' '}
              <strong className="text-[var(--text-primary)]">Shopee Ads</strong> to acquire buyers
              efficiently. This proves I understand the full lifecycle: hardware infrastructure,
              digital marketing, and unit economics.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge highlight>Meta (Facebook) Ads</Badge>
              <Badge highlight>Shopee Ads</Badge>
              <Badge>Hardware Diagnostics</Badge>
              <Badge>Market Arbitrage</Badge>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
