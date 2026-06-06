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
        <p className="text-gray-400 text-sm">Last updated: June 2025</p>
      </section>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

        {/* TL;DR */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8">
          <p className="font-black text-orange-800 text-sm mb-1">The short version</p>
          <p className="text-sm text-orange-700 leading-relaxed">
            Use CurrentIQ for personal study. Don't copy or redistribute our content.
            We provide this platform in good faith — use it in good faith.
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using CurrentIQ ("the Platform"), you agree to be bound by
            these Terms of Use. If you do not agree with any part of these terms, please
            discontinue use of the Platform.
          </p>
        </Section>

        <Section title="2. Who Can Use CurrentIQ">
          <p>
            CurrentIQ is open to anyone. There is no age restriction and no registration
            required. The Platform is intended for individuals seeking to improve their
            knowledge of current affairs, particularly in the context of competitive
            examination preparation.
          </p>
        </Section>

        <Section title="3. What CurrentIQ Provides">
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
          <p>You may use CurrentIQ solely for your own personal, non-commercial study and preparation. This includes:</p>
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
              'Copy, reproduce, or republish any content from the Platform without explicit written permission',
              'Use the content commercially — including selling, licensing, or distributing it',
              'Scrape, crawl, or extract content from the Platform by automated means',
              'Present CurrentIQ content as your own original work',
              'Use the Platform to harm, mislead, or deceive others',
              'Attempt to interfere with or disrupt the Platform\'s infrastructure',
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
            All content on CurrentIQ — including but not limited to flashcard text, quiz
            questions, explanations, and Focus Module material — is the intellectual property
            of CurrentIQ. The curation, selection, categorisation, and formatting of current
            affairs information into our study formats represents original creative work.
          </p>
          <p>
            Underlying news events are matters of public record, but our specific expression,
            format, and framing of that information is protected. Reproduction of our content
            in any form without permission is a violation of these terms.
          </p>
        </Section>

        <Section title="7. Accuracy and Educational Purpose">
          <p>
            CurrentIQ makes every effort to ensure the accuracy of content. However, current
            affairs by nature involves rapidly changing situations, and we cannot guarantee
            that every fact remains accurate after publication.
          </p>
          <p>
            All content is provided for educational and examination preparation purposes only.
            It should not be relied upon as legal, financial, medical, or professional advice
            of any kind.
          </p>
        </Section>

        <Section title="8. No Account, No Liability for Data Loss">
          <p>
            CurrentIQ operates without user accounts. As a result, we hold no user data and
            bear no liability for the loss of study progress, quiz scores, or any other
            session information, as none of this information is stored on our servers.
          </p>
        </Section>

        <Section title="9. Service Availability">
          <p>
            We aim to keep CurrentIQ available at all times but do not guarantee uninterrupted
            access. The Platform may be taken down temporarily for maintenance, updates, or
            reasons outside our control. We are not liable for any inconvenience caused by
            downtime.
          </p>
        </Section>

        <Section title="10. Changes to These Terms">
          <p>
            We reserve the right to update these Terms of Use at any time. The "Last updated"
            date at the top of this page will reflect any changes. Continued use of the
            Platform after an update constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            For questions about these terms or to request permission for use of our content,
            please contact us through the Support section of the Platform.
          </p>
        </Section>

      </div>
    </div>
  );
};

export default Terms;
