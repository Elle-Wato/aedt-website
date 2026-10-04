export const SITE = {
  name: "Africa Education and Development Trust",
  applyUrl: "https://apply.elimishatrust.or.ke/", // <- your application portal
  email: "aedt@elimishatrust.or.ke",
  phones: ["0726 919 557", "0726 919 711", "0712 995 508"],
  address: "2nd Floor, Heidelberg House, next to Rubis Petrol Station, Bellevue, Mombasa Road",
  postal: "P.O. Box 51723-00100, Nairobi, Kenya",
  mapQuery: "Heidelberg Plaza, Mombasa Road, Nairobi, Kenya",
  asOf: "31 July 2026",
  socials: [
    { label: "Facebook", url: "https://facebook.com/yourpage" },
    { label: "X", url: "https://x.com/yourpage" },
    { label: "LinkedIn", url: "https://linkedin.com/company/yourpage" },
    { label: "Instagram", url: "https://instagram.com/yourpage" },
  ],
  headline: { beneficiaries: 4233, graduates: 1194, portfolioMillions: 1447, repayment: 99 },
  programs: [
    { title: "Postgraduate Study Loan", beneficiaries: 919, graduates: 306, text: "Soft loans secured through personal guarantees for Master's degrees and PhDs." },
    { title: "Undergraduate Study Loan", beneficiaries: 1123, graduates: 259, text: "Soft loans to help qualified students earn bachelor's degrees in areas where skills are needed." },
    { title: "Umma University Student Support", beneficiaries: 1889, graduates: 579, text: "Financial aid for Umma University students, delivered with Direct Aid." },
    { title: "Diploma Study Loan", beneficiaries: 249, graduates: 50, text: "Soft loans for qualified students pursuing diplomas in their study areas." },
    { title: "University Staff Development", beneficiaries: 53, graduates: null, text: "Soft loans for university academic staff, backed by guarantees and a council resolution." },
  ],
      levels: [["Diploma", 249], ["Bachelor's", 1123], ["Master's", 789], ["PhD", 130], ["Umma University", 1889]],
  steps: [
    ["Application", "Submit your application and required documents on our portal."],
    ["Interviews", "The Secretariat reviews applications and invites applicants to an interview."],
    ["Contract signing", "If the panel approves, the borrower and guarantors sign a loan agreement."],
    ["Disbursement", "Fees are paid directly to the university account through RTGS."],
    ["Repayment", "The loan covers tuition fees and is repaid within the study period."],
  ],
  support: [
    ["Mentorship", "Forums that guide students through academic and personal growth and life after graduation."],
    ["Skill development", "Training in employment, life and social skills so beneficiaries thrive at work."],
    ["Volunteering and community service", "Service projects that encourage students to give back across Kenya."],
    ["Work-study", "Hands-on experience in administrative and operational roles at Umma University."],
  ],
  testimonials: [
    { quote: "The study loan has reduced my fees burden. Poor and needy students are benefiting, and many more will because of the revolving fund model. I appreciate AEDT for ensuring fairness in selecting beneficiaries.", who: "Business Management student (UU-SSP)" },
    { quote: "When I first approached you I almost stopped my programme. Alhamdulillah, I completed my loan repayments in April and am now in the final stages of my course.", who: "Nutrition student" },
    { quote: "This fund has made higher education financing very affordable. I am a teacher in Mandera earning a below-average salary, but through AEDT I enrolled for a degree at Umma University.", who: "Beneficiary and teacher, Mandera" },
    { quote: "AEDT's support helped transform my ambition into a career of service. My story is proof that investing in one person's education can improve the health and wellbeing of entire communities.",
  who: "Obstetrician and Gynaecologist",
  initials: "Dr",},
  { quote: "My story shows that financial hardship does not have to define a person's future. With determination, hard work, and support from those who believe in your potential, no dream is beyond reach.",
  who: "Teacher, UU-SSP programme",
  initials: "UU",},
  ],

  partners: [
    { name: "Umma University", logo: "/partners/umma.png", dark: true },
    { name: "Direct Aid", logo: "/partners/directaid.png" },
    { name: "NAMA Foundation", logo: "/partners/nama.png", },
    { name: "Mount Kenya University", logo: "/partners/mku.png" },
    { name: "Garissa University", logo: "/partners/garissa.png", dark: true },


    // { name: "Partner name", logo: "/partners/file.png" },
  ],
  news: [], // example: { date: "2026-09-15", title: "...", text: "..." }
  careers: [], // example: { title: "Programme Officer", location: "Nairobi", link: "mailto:..." }
};