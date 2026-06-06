import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-black text-[#1a2e4c] mb-3">{title}</h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const Privacy = () => {
  return (
    <div className="max-w-2xl mx-auto pb-12">

      {/* Header */}
      <section className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Legal</p>
        <h1 className="text-3xl font-black mb-3">Privacy Policy</h1>
        <p className="text-gray-400 text-sm">Last updated: June 2025</p>
      </section>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        {/* TL;DR */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-8">
          <p className="font-black text-teal-800 text-sm mb-1">The short version</p>
          <p className="text-sm text-teal-700 leading-relaxed">
            CurrentIQ does not collect, store, or share any personal information.
            There are no accounts, no login, and no tracking. You use the platform
            anonymously and nothing about you is recorded.
          </p>
        </div>

        <Section title="1. No Account, No Data">
          <p>
            CurrentIQ does not require you to create an account or provide any personal
            information to use the platform. There is no registration, no email, no name,
            no phone number, and no password involved at any point.
          </p>
          <p>
            You arrive, you study, you leave. Nothing about your identity is collected.
          </p>
        </Section>

        <Section title="2. What We Do Not Collect">
          <p>We do not collect:</p>
          <ul className="list-none space-y-1.5 mt-2">
            {[
              'Names, email addresses, or any contact information',
              'Passwords or authentication credentials of any kind',
              'Payment information',
              'Location data',
              'Device identifiers or fingerprints',
              'Quiz scores, flashcard progress, or study history',
              'Browsing behaviour or clickstream data',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-teal-500 font-black mt-0.5">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. Content Delivery">
          <p>
            All study content — flashcards, quiz questions, and Focus Module files — is
            fetched from our backend (Supabase) when you navigate to a section. This is
            a standard database read operation. No information about you is sent as part
            of these requests beyond what your browser automatically includes in any HTTPS
            connection (such as your IP address, which we do not log or store).
          </p>
        </Section>

        <Section title="4. Cookies and Local Storage">
          <p>
            CurrentIQ does not set tracking cookies, advertising cookies, or analytics
            cookies. We do not use any third-party analytics services (such as Google
            Analytics).
          </p>
          <p>
            Your browser may store minimal data locally (such as cached assets for
            performance), but this is standard browser behaviour and contains no
            personally identifiable information. We do not read or write to
            localStorage for tracking purposes.
          </p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>
            We use <strong className="text-gray-800">Supabase</strong> as our backend
            database and file storage provider. Content is served over Supabase's
            infrastructure. Supabase's own privacy policy governs the handling of
            infrastructure-level data. We do not pass any user information to Supabase
            beyond anonymous content queries.
          </p>
          <p>
            We do not integrate any advertising networks, social media trackers,
            or third-party marketing tools.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            CurrentIQ is a general educational platform. Because we collect no personal
            data from any user, there is no special risk to users of any age. We do not
            knowingly collect information from anyone.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            If we ever change how this platform works in a way that affects privacy
            (for example, if we introduce accounts in the future), this policy will be
            updated and the "Last updated" date at the top will reflect the change.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            If you have any questions about this privacy policy, you can reach us through
            the contact details provided in the Support section of the platform.
          </p>
        </Section>

      </div>
    </div>
  );
};

export default Privacy;
