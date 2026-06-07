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
        <p className="text-gray-400 text-sm">Last updated: June 2026</p>
      </section>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        {/* TL;DR */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-8">
          <p className="font-black text-teal-800 text-sm mb-1">The short version</p>
          <p className="text-sm text-teal-700 leading-relaxed">
            This app does not collect any personal information. No login, no name,
            no email — nothing that identifies you. Quiz scores are saved anonymously
            to track your progress. Ads are served by Google AdMob, which may collect
            device-level data as per Google's own privacy policy.
          </p>
        </div>

        <Section title="1. No Account, No Personal Data">
          <p>
            This app does not require you to create an account or provide any personal
            information. There is no registration, no email, no name, no phone number,
            and no password involved at any point.
          </p>
          <p>
            You arrive, you study, you leave. Nothing that identifies you personally
            is collected or stored by this app.
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
              'Browsing behaviour or clickstream data',
              'Any information that can identify you as an individual',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-400 font-black mt-0.5">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. What We Do Store">
          <p>This app stores the following data anonymously:</p>
          <ul className="list-none space-y-1.5 mt-2">
            {[
              'Quiz scores — saved per week to track your performance over time',
              'Flashcard progress — cards marked as known or to be reviewed again',
              'Current streak — number of consecutive days of activity',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-teal-500 font-black mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            This data is stored on our backend (Supabase) without any link to your
            personal identity. It cannot be used to identify who you are. It exists
            solely to provide you with a consistent study experience across sessions.
          </p>
        </Section>

        <Section title="4. Content Delivery">
          <p>
            All study content — flashcards, quiz questions, and Focus Module files — is
            fetched from our backend (Supabase) when you navigate to a section. This is
            a standard database read operation. No personal information about you is sent
            as part of these requests beyond what any standard HTTPS connection includes
            (such as your IP address, which we do not log or store).
          </p>
        </Section>

        <Section title="5. Advertising — Google AdMob">
          <p>
            This app is free to use and is supported by advertisements served by
            Google AdMob. Some content modules can be unlocked by watching a short
            rewarded advertisement.
          </p>
          <p>
            Google AdMob may collect the following as part of ad serving:
          </p>
          <ul className="list-none space-y-1.5 mt-2">
            {[
              'Device identifiers (Android Advertising ID)',
              'Approximate location based on IP address',
              'App usage and interaction data for ad personalisation',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-orange-400 font-black mt-0.5">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            This data collection is governed entirely by Google's Privacy Policy
            and is outside the control of this app. You can opt out of personalised
            ads at any time via your device settings:
          </p>
          <p className="bg-gray-50 rounded-xl p-3 font-mono text-xs text-gray-500">
            Settings → Google → Ads → Opt out of Ads Personalisation
          </p>
        </Section>

        <Section title="6. Cookies and Local Storage">
          <p>
            This app does not set tracking cookies, advertising cookies, or analytics
            cookies. We do not use any third-party analytics services such as
            Google Analytics or Firebase Analytics.
          </p>
          <p>
            Your device may store minimal data locally (such as cached assets for
            performance), but this is standard behaviour and contains no personally
            identifiable information.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>
            We use the following third-party services to operate this app:
          </p>
          <ul className="list-none space-y-2 mt-2">
            {[
              ['Supabase', 'Backend database and storage for content delivery and anonymous score saving. supabase.com/privacy'],
              ['Google AdMob', 'Advertisement serving. policies.google.com/privacy'],
            ].map(([name, desc]) => (
              <li key={name} className="pl-3 border-l-2 border-orange-300">
                <span className="font-bold text-gray-800">{name}:</span> {desc}
              </li>
            ))}
          </ul>
          <p>
            We do not integrate any social media trackers, marketing tools,
            or any other third-party data collection services beyond those listed above.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            This app is a general educational platform intended for competitive exam
            aspirants. We do not knowingly collect personal information from anyone,
            including children. Since no personal data is collected by this app itself,
            there is no special privacy risk to users of any age.
          </p>
        </Section>

        <Section title="9. Data Security">
          <p>
            All data transmitted between this app and our backend is encrypted via
            HTTPS. Anonymous progress data stored on Supabase is protected by
            Supabase's own security infrastructure. Since no personal information
            is collected, the risk of a personal data breach is minimal.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            If we change how this app works in a way that affects privacy — for example,
            if we introduce user accounts in a future update — this policy will be updated
            and the "Last updated" date at the top will reflect the change. We encourage
            you to review this page periodically.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            If you have any questions about this privacy policy or how your data is
            handled, please contact us through the Support section of this app.
          </p>
        </Section>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-8 pt-6 border-t border-gray-100">
          © 2026 CA Weekly. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Privacy;