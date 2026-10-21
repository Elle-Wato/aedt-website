import { SITE } from "../data/site.js";

const UPDATED = "October 2026"; // change to the date you publish or approve this statement

const L = ({ items }) => (
  <ul>{items.map((i) => (<li key={i}>{i}</li>))}</ul>
);
const S = ({ n, title, children }) => (
  <>
    <h2>{n}. {title}</h2>
    {children}
  </>
);

export function Privacy() {
  return (
    <div className="legal">
      <h1>Privacy Statement</h1>
      <p>Last updated: {UPDATED}</p>

      <p>Africa Education and Development Trust (AEDT) respects your privacy and is committed to protecting your personal data. This Privacy Statement explains how we collect, use, store, share and protect your information when you interact with AEDT, including through our website, application portal, programs and services.</p>

      <S n="1" title="Who We Are">
        <p>Africa Education and Development Trust (AEDT) provides education financing and related support, including study loans, scholarships, mentorship, financial literacy and other education-development programs.</p>
        <p>For personal data collected and processed for these purposes, AEDT acts as a <strong>Data Controller</strong>.</p>
      </S>

      <S n="2" title="Who This Privacy Statement Applies To">
        <p>This Privacy Statement applies to individuals who interact with AEDT, including:</p>
        <L items={[
          "Study loan applicants;",
          "Beneficiaries;",
          "Parents and guardians;",
          "Guarantors;",
          "Visitors;",
          "Suppliers and service providers;",
          "Partners and representatives of educational institutions;",
          "Donors and program partners; and",
          "Users of our website and online application portal.",
        ]} />
      </S>

      <S n="3" title="Personal Data We Collect">
        <p>Depending on your relationship with AEDT, we may collect information such as:</p>
        <L items={[
          "Name, National ID or passport details;",
          "Contact details, including telephone number and email address;",
          "Residential and postal address;",
          "Passport-size photograph;",
          "KRA PIN;",
          "Academic records and admission information;",
          "Employment and income information;",
          "Financial and loan-related information;",
          "Parent, guardian and guarantor information;",
          "Repayment and arrears information;",
          "Website usage, device and IP address information;",
          "Visitor records and CCTV footage; and",
          "Communications sent to or received from AEDT.",
        ]} />
        <p>We only collect information that is reasonably necessary for the purpose for which it is required.</p>
      </S>

      <S n="4" title="How We Collect Your Information">
        <p>We may collect your personal data through:</p>
        <L items={[
          "Online or physical application forms;",
          "AEDT's website and application portal;",
          "Email, telephone, SMS and other communications;",
          "Interviews and program assessments;",
          "Educational institutions;",
          "Parents, guardians and guarantors;",
          "Employers, where lawfully permitted;",
          "Government or regulatory sources;",
          "Partner organizations and authorized service providers; and",
          "CCTV and visitor-management systems at AEDT premises.",
        ]} />
      </S>

      <S n="5" title="How We Use Your Personal Data">
        <p>AEDT may use your personal data to:</p>
        <L items={[
          "Process study loan and scholarship applications;",
          "Verify applicant information and eligibility;",
          "Conduct application reviews and interviews;",
          "Administer loans, scholarships and other programs;",
          "Monitor academic progress;",
          "Manage loan repayments and arrears;",
          "Communicate repayment reminders;",
          "Conduct financial literacy and mentorship programs;",
          "Prevent fraud and misuse of AEDT programs;",
          "Conduct program monitoring, evaluation and research;",
          "Communicate with beneficiaries and applicants;",
          "Meet audit, legal and regulatory requirements;",
          "Maintain records;",
          "Improve our programs and services; and",
          "Maintain the security of our premises and information systems.",
        ]} />
      </S>

      <S n="6" title="Our Lawful Basis for Processing">
        <p>AEDT processes personal data where there is an appropriate lawful basis, including:</p>
        <L items={[
          "Your consent;",
          "Performance of a contract;",
          "Taking steps before entering into a contract;",
          "Compliance with a legal obligation;",
          "Legitimate interests;",
          "Public interest, where applicable;",
          "Protection of vital interests; or",
          "Research and statistical purposes as permitted by law.",
        ]} />
        <p>Where consent is used, you may withdraw it at any time, subject to applicable legal requirements.</p>
      </S>

      <S n="7" title="Sharing Your Personal Data">
        <p>AEDT does not sell your personal data.</p>
        <p>Where necessary and lawfully permitted, we may share personal data with:</p>
        <L items={[
          "Universities, colleges and other educational institutions;",
          "Banks and payment-service providers;",
          "Employers, where appropriate;",
          "Credit Reference Bureaus, where applicable;",
          "Debt recovery service providers;",
          "Auditors, lawyers and professional advisers;",
          "Technology and system service providers;",
          "Government agencies and regulatory authorities;",
          "Courts and law-enforcement agencies;",
          "Donors and program partners, subject to appropriate safeguards; and",
          "Other authorized service providers supporting AEDT's operations.",
        ]} />
        <p>We require third parties handling personal data on our behalf to apply appropriate confidentiality and data protection safeguards.</p>
      </S>

      <S n="8" title="Loan Administration and Recovery">
        <p>Where you receive a study loan from AEDT, we may process your information to:</p>
        <L items={[
          "Monitor repayment;",
          "Communicate repayment obligations;",
          "Follow up outstanding amounts;",
          "Verify relevant employment or contact information;",
          "Manage agreed repayment arrangements; and",
          "Recover overdue amounts in accordance with applicable laws and contractual requirements.",
        ]} />
      </S>

      <S n="9" title="Data Retention">
        <p>AEDT keeps personal data only for as long as reasonably necessary for the purpose for which it was collected and to meet applicable legal, contractual, financial, audit and regulatory requirements.</p>
        <p>When personal data is no longer required, it will be securely deleted, destroyed, anonymized or otherwise disposed of in accordance with AEDT's records-retention procedures.</p>
      </S>

      <S n="10" title="Data Security">
        <p>AEDT applies reasonable physical, technical and organizational safeguards to protect personal data against:</p>
        <L items={[
          "Unauthorized access;",
          "Loss;",
          "Disclosure;",
          "Alteration;",
          "Misuse; and",
          "Destruction.",
        ]} />
        <p>Access to personal data is limited to authorized persons who require it for legitimate purposes.</p>
      </S>

      <S n="11" title="Cookies">
        <p>AEDT's website may use cookies and similar technologies to support website functionality, improve security and understand how users interact with the website. See our <a href="#/cookies">Cookie policy</a> for details.</p>
        <p>You may manage or disable cookies through your browser settings. Disabling certain cookies may affect the functionality of the website.</p>
      </S>

      <S n="12" title="International Data Transfers">
        <p>Where personal data is transferred or stored outside Kenya, AEDT will take appropriate steps to ensure that the transfer is carried out in accordance with applicable data protection laws and that appropriate safeguards are in place.</p>
      </S>

      <S n="13" title="Your Data Protection Rights">
        <p>Subject to applicable law, you may have the right to:</p>
        <L items={[
          "Be informed about how your personal data is used;",
          "Access personal data held about you;",
          "Request correction of inaccurate or incomplete information;",
          "Object to certain processing;",
          "Request deletion of personal data where applicable;",
          "Request restriction of processing;",
          "Request data portability where applicable;",
          "Withdraw consent where processing is based on consent; and",
          "Raise a complaint about how your personal data has been handled.",
        ]} />
        <p>Some rights may be subject to legal, contractual or regulatory limitations.</p>
      </S>

      <S n="14" title="Exercising Your Rights">
        <p>To exercise any of your data protection rights or raise a privacy concern, please contact AEDT's Data Protection Officer.</p>
        <p>We may need to verify your identity before processing your request.</p>
      </S>

      <S n="15" title="Children's Personal Data">
        <p>Where AEDT processes personal data relating to persons below the age of eighteen years, appropriate safeguards will be applied and parental or guardian consent will be obtained where required by law.</p>
      </S>

      <S n="16" title="Changes to This Privacy Statement">
        <p>AEDT may update this Privacy Statement from time to time to reflect changes in law, our programs, technology or our personal data-processing practices.</p>
        <p>The latest version will always be available on this website.</p>
      </S>

      <S n="17" title="Contact Us">
        <p>For questions, complaints or requests relating to your personal data, please contact:</p>
        <p>
          <strong>Data Protection Officer</strong><br />
          <strong>Africa Education and Development Trust (AEDT)</strong><br />
          2nd Floor, Heidelberg Plaza<br />
          Bellevue, Mombasa Road<br />
          Nairobi, Kenya
        </p>
        <p>
          <strong>P.O. Box:</strong> 51723-00100<br />
          <strong>Email:</strong> <a href="mailto:complaints@elimishatrust.or.ke">complaints@elimishatrust.or.ke</a><br />
          <strong>Telephone:</strong> <a href="tel:+254726919711">+254 726 919 711</a>
        </p>
        <p>You may also lodge a complaint with the <strong>Office of the Data Protection Commissioner (ODPC)</strong> if you are dissatisfied with how your personal data has been handled.</p>
      </S>
    </div>
  );
}

export function Cookies() {
  return (
    <div className="legal">
      <h1>Cookie policy</h1>
      <p>Last updated: {UPDATED}</p>
      <h2>What are cookies?</h2>
      <p>Cookies are small files a website stores in your browser.</p>
      <h2>What we use</h2>
      <ul>
        <li><b>Essential:</b> we store your cookie choice so we do not ask you again.</li>
        <li><b>Analytics (optional):</b> only if you accept. Add the cookies your analytics tool sets here, if you use one.</li>
        <li><b>Google Maps:</b> the map in our contact section is provided by Google and may set its own cookies. See Google's privacy policy for details.</li>
      </ul>
      <h2>Managing cookies</h2>
      <p>You can clear or block cookies in your browser settings. You can also clear your choice to see the banner again.</p>
      <p>For how we handle personal data more broadly, see our <a href="#/privacy">Privacy statement</a>.</p>
    </div>
  );
}