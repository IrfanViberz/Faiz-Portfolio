import type { Metadata } from 'next';
import ContactHeader from '@/sections/contact/ContactHeader';
import ContactForm from '@/sections/contact/ContactForm';
import DirectChannels from '@/sections/contact/DirectChannels';

export const metadata: Metadata = {
  title: 'Contact — Faiz Irfan',
  description: 'Get in touch with Faiz Irfan for engineering roles, projects, or collaboration.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHeader />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <ContactForm />
          <DirectChannels />
        </div>
      </section>
    </div>
  );
}
