import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-black text-[#1a2e4c] mb-3">{title}</h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const Terms = () => {
  return (
    <div className="max-w-2xl mx-auto pb-12">

      {/* Header */}
      <section className="bg-[#1a2e4c] text-white rounded-3xl p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Legal</p>
        <h1 className="text-3xl font-black mb-3">Terms of Use</h1>
        <p className="text-gray-400 text-sm">Last updated: June 2026</p>
      </section>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        {/* TL;DR */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8">
          <p className="font-black text-orange-800 text-sm mb-1">The short version</p>
          <p className="text-sm text-orange-700 leading-relaxed">
            Use this app for personal study. Don't copy or redistribute our content.
            Content is sourced from public government and news sources — always verify
            critical facts before your exam. We provide this platform in good faith —
            use it in good faith.
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using this app ("the Platform"), you agree to be bound by
            these Terms of Use. If you do not agree with any part of these terms, please
            discontinue use of the Platform.
          </p>
        </Section>

        <Section title="2. Who Can Use This App">
          <p>
            This app is open to anyone. There is no age restriction and no registration
            required. The Platform is intended for individuals seeking to improve their
            knowledge of current affairs, particularly in the context of competitive
            examination preparation including SSC CGL, IBPS PO, SBI PO, RRB, and UPSC.
          </p>
        </Section>

        <Section title="3. What This App Provides">
          <p>The Platform offers three study tools:</p>
          <ul className="list-none mt-2 space-y-2">
            {[
              ['Flashcards', 'Weekly current affairs in question-answer format for active recall practice.'],
              ['Practice Quiz', 'Multiple-choice questions modelled on competitive exam patterns, with explanations.'],
              ['Focus Module', 'A structured digest of current affairs with key facts separated and categorised by topic for efficient reading.'],
            ].map(([term, def]) => (
              <li key={term} className="pl-3 border-l-2 border-orange-300">
                <span className="font-bold text-gray-800">{term}:</span> {def}
              </li>
            ))}
          </ul>
          <p>
            Content is updated on a weekly basis and covers topics relevant to competitive
            examinations including but not limited to Polity, Economy, International Affairs,
            Science & Technology, Environment, and Sports.
          </p>
        </Section>

        <Section title="4. Permitted Use">
          <p>You may use this app solely for your own personal, non-commercial study and preparation. This includes:</p>
          <ul className="list-none mt-2 space-y-1.5">
            {[
              'Reading and studying the Focus Module for personal learning',
              'Practising flashcards and quizzes for exam preparation',
              'Referencing content during your own revision sessions',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-teal-500 font-black mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="5. Prohibited Use">
          <p>You may not:</p>
          <ul className="list-none mt-2 space-y-1.5">
            {[
              'Copy, reproduce, or republish any content from this platform without explicit written permission',
              'Use the content commercially — including selling, licensing, or distributing it',
              'Scrape, crawl, or extract content from this platform by automated means',
              'Present content from this app as your own original work',
              'Use this platform to harm, mislead, or deceive others',
              'Attempt to interfere with or disrupt this platform\'s infrastructure',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-400 font-black mt-0.5">×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content on this platform — including but not limited to flashcard text, quiz
            questions, explanations, and Focus Module material — is the intellectual property
            of this app and its developers. The curation, selection, categorisation, and
            formatting of current affairs information into our study formats represents
            original creative work.
          </p>
          <p>
            Underlying news events are matters of public record, but our specific expression,
            format, and framing of that information is protected. Reproduction of our content
            in any form without permission is a violation of these terms.
          </p>
        </Section>

        <Section title="7. Accuracy and Educational Purpose">
          <p>
            This app makes every effort to ensure the accuracy of content. However, current
            affairs by nature involves rapidly changing situations, and we cannot guarantee
            that every fact remains accurate after publication.
          </p>
          <p>
            All content is provided for educational and examination preparation purposes only.
            It should not be relied upon as legal, financial, medical, or professional advice
            of any kind.
          </p>
        </Section>

        <Section title="8. Content Sources & Accuracy Disclaimer">
          <p>
            Content on this platform is sourced from publicly available government and media
            sources including Press Information Bureau (PIB), Reserve Bank of India (RBI),
            Ministry of External Affairs (MEA), reputed national news publications, and
            other freely available public interest material on the internet.
          </p>
          <p>
            While we strive for accuracy and relevance, this app does not guarantee the
            completeness, correctness, or timeliness of any information presented. News
            and current affairs are subject to revision, correction, and reinterpretation.
            Users are strongly advised to verify critical facts from official government
            sources before relying on them in competitive examinations or any other context.
          </p>
          <p>
            This app and its developers shall not be held responsible for any loss,
            disadvantage, or harm — including exam performance — arising from reliance
            on inaccurate, incomplete, or outdated information in this platform.
          </p>
          <p>
            This app does not guarantee success in any competitive examination including
            SSC CGL, IBPS PO, SBI PO, SBI Clerk, RRB, or UPSC. This platform is a
            supplementary study tool only and is not affiliated with any examination
            board or government body.
          </p>
        </Section>

        <Section title="9. Data & Privacy">
          <p>
            This app does not require user registration or login. No personal information
            such as name, email address, or phone number is collected by this platform.
          </p>
          <p>
            Quiz scores and flashcard progress may be stored anonymously on our servers
            to enable session continuity. This data is not linked to any personal identity
            and cannot be used to identify individual users.
          </p>
          <p>
            For full details on how data is handled, please refer to our Privacy Policy
            available in the app's Settings section.
          </p>
        </Section>

        <Section title="10. Advertising">
          <p>
            This app is free to use and is supported by advertisements served by
            Google AdMob. Some content modules may be unlocked by watching a short
            rewarded advertisement.
          </p>
          <p>
            Google AdMob may collect device identifiers and usage data to serve
            relevant advertisements. This data collection is governed by Google's
            Privacy Policy and is independent of this app's own data practices.
            You may opt out of personalised ads at any time via your device settings
            under Google → Ads → Opt out of Ads Personalisation.
          </p>
        </Section>

        <Section title="11. Service Availability">
          <p>
            We aim to keep this app available at all times but do not guarantee
            uninterrupted access. The platform may be temporarily unavailable for
            maintenance, updates, or reasons outside our control. We are not liable
            for any inconvenience caused by downtime.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We reserve the right to update these Terms of Use at any time. The "Last updated"
            date at the top of this page will reflect any changes. Continued use of this
            platform after an update constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section title="13. Governing Law">
          <p>
            These Terms of Use shall be governed by and construed in accordance with
            the laws of India. Any disputes arising from the use of this platform shall
            be subject to the jurisdiction of courts in India.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            For questions about these terms, content accuracy concerns, or to request
            permission for use of our content, please contact us through the Support
            section of this app.
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

export default Terms;