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
    { label: "X", url: "https://x.com/aedt_interact?s=21" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/africa-education-and-development-trust-70b204129?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
    { label: "Instagram", url: "https://www.instagram.com/elimishatrust?rpxt=MTF5dGNvajl0YzN2Nw==" },
    { label: "TikTok", url: "https://www.tiktok.com/@elimishatrust?_r=1&_t=ZS-9AbGHuhLVkg" }
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

    countries: [
    { name: "Kenya", codes: [404], pin: [37.9, 0.5], universities: 130, beneficiaries: 4058 },
    { name: "Uganda", codes: [800], pin: [32.3, 1.4], universities: 11, beneficiaries: 131 },
    { name: "Malaysia", codes: [458], pin: [102, 4], universities: 23, beneficiaries: 58 },
    { name: "Sudan", codes: [729], pin: [30, 15.5], universities: 10, beneficiaries: 35 },
    { name: "United Kingdom", codes: [826], pin: [-2, 54], universities: 23, beneficiaries: 34 },
    { name: "Tanzania", codes: [834], pin: [34.8, -6.4], universities: 9, beneficiaries: 27 },
    { name: "Turkey", codes: [792], pin: [35, 39], universities: 13, beneficiaries: 20 },
    { name: "China", codes: [156], pin: [104, 35], universities: 9, beneficiaries: 10 },
    { name: "Canada", codes: [124], pin: [-100, 58], universities: 8, beneficiaries: 9 },
    { name: "Cyprus", codes: [196], pin: [33.2, 35], universities: 3, beneficiaries: 9 },
    { name: "USA", codes: [840], pin: [-98, 39], universities: 6, beneficiaries: 6 },
    { name: "Australia", codes: [36], pin: [134, -25], universities: 4, beneficiaries: 5 },
    { name: "Russia", codes: [643], pin: [95, 62], universities: 2, beneficiaries: 4 },
    { name: "Costa Rica", codes: [188], pin: [-84, 10], universities: 1, beneficiaries: 3 },
    { name: "Egypt", codes: [818], pin: [30, 26.5], universities: 3, beneficiaries: 3 },
    { name: "India", codes: [356], pin: [79, 22], universities: 3, beneficiaries: 3 },
    { name: "Ireland", codes: [372], pin: [-8, 53.2], universities: 3, beneficiaries: 3 },
    { name: "Ukraine", codes: [804], pin: [31, 49], universities: 1, beneficiaries: 3 },
    { name: "France", codes: [250], pin: [2.5, 46.6], universities: 2, beneficiaries: 2 },
    { name: "Spain", codes: [724], pin: [-3.7, 40], universities: 1, beneficiaries: 2 },
    { name: "Ethiopia", codes: [231], pin: [39, 9], universities: 1, beneficiaries: 1 },
    { name: "Germany", codes: [276], pin: [10.4, 51], universities: 1, beneficiaries: 1 },
    { name: "Netherlands", codes: [528], pin: [5.3, 52.2], universities: 1, beneficiaries: 1 },
    { name: "Romania", codes: [642], pin: [25, 45.9], universities: 1, beneficiaries: 1 },
    { name: "Rwanda", codes: [646], pin: [29.9, -1.9], universities: 1, beneficiaries: 1 },
    { name: "South Africa", codes: [710], pin: [25, -29], universities: 1, beneficiaries: 1 },
    { name: "Sweden", codes: [752], pin: [16, 62], universities: 1, beneficiaries: 1 },
    { name: "Thailand", codes: [764], pin: [101, 15], universities: 1, beneficiaries: 1 },
    { name: "UAE", codes: [784], pin: [54, 24], universities: 1, beneficiaries: 1 },
  ],

      programDetails: {
    "Undergraduate Study Loan": {
      heading: "Bachelor's programme: soft loan application requirements",
      intro: "Applications are made online through our portal. Please have these documents ready before you start.",
      groups: [
        {
          title: "A. Student",
          items: [
            "Curriculum Vitae (CV)",
            "Copy of your Form 4 certificate or other relevant certificates",
            "School leaving certificate",
            "University admission letter for your Bachelor's programme, and the fee structure",
            "Copy of ID",
            "Copy of KRA PIN",
            "Coloured passport-size photo",
            "A handwritten piece of about 300 words about yourself, explaining why you need the soft loan",
          ],
        },
        {
          title: "B. Parent or guardian",
          items: ["Copy of ID, copy of KRA PIN and one coloured passport-size photo"],
        },
        {
          title: "Also required from the person paying the loan",
          items: [
            "Employment letter (if employed) or business registration documents (if self-employed)",
            "Bank statement for the last 6 months",
            "Three recent pay slips",
            "Loan security: 2 guarantors and/or a title deed or car log book, where applicable",
          ],
        },
      ],
      notes: [
        "If you are successful, you will sign a contract with our lawyer and pay Ksh 2,500 in legal fees. This fee is paid only once.",
        "Repayment starts at the end of the same month in which the first semester's fees are disbursed.",
        "Fees are transferred directly to the university's account.",
        "The bank charges for the transfer form part of the soft loan and are charged to the successful applicant's account.",
      ],
    },

    "Postgraduate Study Loan": {
      heading: "Postgraduate programme: soft loan application requirements",
      intro: "Applications are made online through our portal. Please have one complete set of these documents ready before you start.",
      groups: [
        {
          title: "A. Applicant",
          items: [
            "Curriculum Vitae (CV)",
            "Copy of your last educational certificate (Bachelor's degree or Master's)",
            "University admission letter for your Master's programme, and the fee structure",
            "Copy of ID",
            "Copy of KRA PIN",
            "Two coloured passport-size photos",
          ],
        },
        {
          title: "Employment and finances",
          items: [
            "Employment letter (if employed) or business registration documents (if self-employed)",
            "Bank statement for the last 6 months",
            "Three recent pay slips",
            "Loan security: a guarantor and/or a title deed or car log book, where applicable",
          ],
        },
      ],
      notes: [
        "If you are successful, you will sign a contract with our lawyer and pay Ksh 5,000 in legal fees. This fee is paid only once.",
        "Repayment starts at the end of the same month in which the first semester's fees are disbursed.",
        "Fees are transferred directly to the university's account.",
        "The bank charges for the transfer form part of the soft loan and are charged to the successful applicant's account.",
      ],
    },

    "Diploma Study Loan": {
      heading: "Diploma programme: soft loan application requirements",
      intro: "Applications are made online through our portal. Please have one complete set of these documents ready before you start.",
      groups: [
        {
          title: "A. Student",
          items: [
            "Curriculum Vitae (CV)",
            "Copy of your Form 4 certificate or other relevant certificates",
            "School leaving certificate",
            "College admission letter for your Diploma programme, and the fee structure",
            "Copy of ID",
            "Copy of KRA PIN",
            "Two coloured passport-size photos",
            "A handwritten piece of about 300 words about yourself, explaining why you need the soft loan",
          ],
        },
        {
          title: "B. Parent or guardian",
          items: ["Copy of ID, copy of KRA PIN and two coloured passport-size photos"],
        },
        {
          title: "Also required from the person paying the loan",
          items: [
            "Employment letter (if employed) or business registration documents (if self-employed)",
            "Bank statement for the last 6 months",
            "Three recent pay slips",
            "Loan security: 2 guarantors",
          ],
        },
      ],
      notes: [
        "If you are successful, you will sign a contract with our lawyer and pay Ksh 1,500 in legal fees. This fee is paid only once.",
        "Repayment starts at the end of the same month in which the first semester's fees are disbursed.",
        "Fees are transferred directly to the college's account.",
        "The bank charges for the transfer form part of the soft loan and are charged to the successful applicant's account.",
      ],
    },
    "Umma University Student Support": {
      heading: "UUSSP programme: soft loan application requirements",
      intro: "Applications are made online through our portal. Please have one complete set of these documents ready before you start.",
      groups: [
        {
          title: "A. Student",
          items: [
            "Curriculum Vitae (CV)",
            "Copy of your Form 4 certificate or other relevant certificates",
            "School leaving certificate",
            "Umma University admission letter for your Bachelor programme, and the fee structure",
            "Copy of ID/Birth certificate",
            "Scholarship recommendation letter from either Umma University, Imam or Local authority",
            "Father's death certificate (if an orphan)",
            "Two coloured passport-size photos",
            "A handwritten piece of about 300 words about yourself, explaining why you need the soft loan",
          ],
        },
        {
          title: "B. Parent or guardian",
          items: ["Copy of ID, copy of KRA PIN and two coloured passport-size photos"],
        },
        {
          title: "Also required from the person paying the loan",
          items: [
            "Employment letter (if employed) or business registration documents (if self-employed)",
            "Bank statement for the last 6 months",
            "Three recent pay slips",
            "Loan security: 2 guarantors",
          ],
        },
      ],
      notes: [
        "If you are successful, you will sign a contract with our lawyer and pay Ksh 2,500 in legal fees. This fee is paid only once.",
        "Repayment starts at the end of the same month in which the first semester's fees are disbursed.",
        "Fees are transferred directly to the college's account.",
      ],
    },
  },
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
    { name: "Garissa University", logo: "/partners/garissa uni logo.jpg",},
    { name: "Dr. Kalebi's Lab", logo: "/partners/dkl.png",},
    { name: "Takaful Insurance of Africa", logo: "/partners/takaful.png",},


    // { name: "Partner name", logo: "/partners/file.png" },
  ],
    news: [
    {
      slug: "garissa-university-mou",
      date: "2026-08-27",
      tag: "MoU signed",
      title: "AEDT and Garissa University sign deal for interest-free staff study loans",
      summary: "A new Staff Development Scheme gives Garissa University staff and their dependents zero-interest tuition loans repayable over an extended period.",
      image: "/images/news/garissa.jpg",
      gallery: [
        // { src: "/images/news/garissa-2.jpg", caption: "Add a caption" },
      ],
      body: [
        "AEDT and Garissa University have signed a Memorandum of Understanding under the Staff Development Scheme, giving university staff and their dependents access to flexible education financing.",
        "The scheme includes zero-interest tuition fee loans that can be repaid over an extended period. It is meant to support continuing learning, institutional capacity building and professional growth among staff.",
        "The MoU was signed on 27 August 2026 by the Garissa University management team, led by Vice-Chancellor Prof. Ahmed O. Warfa, and AEDT Chief Executive Officer Umar Abdalla. Prof. Warfa thanked AEDT, encouraged eligible staff to take up the opportunity, and asked AEDT to consider a similar arrangement for Garissa University students.",
        "The agreement is part of AEDT's growing collaboration with universities. In July we signed with Mount Kenya University, and similar arrangements exist with Umma University and the Islamic University of Kenya.",
      ],
      source: { name: "Sahifa Media", url: "https://www.sahifa.co.ke/post/aedt-garissa-university-sign-deal-for-interest-free-staff-study-loans" },
    },
        {
      slug: "mount-kenya-university-mou",
      date: "2026-07-01",
      tag: "MoU signed",
      title: "AEDT and Mount Kenya University sign MoU to support MKU staff education",
      summary: "An interest-free Staff Development Scheme will help eligible Mount Kenya University employees pursue higher education.",
      image: "/images/news/mku.jpg",
            image: "/images/news/mku.jpg",
      focus: "50% 10%",
      gallery: [
        // { src: "/images/news/mku-2.jpg", caption: "Add a caption" },
      ],
      body: [
        "AEDT and Mount Kenya University (MKU) have signed a Memorandum of Understanding to set up an interest-free Staff Development Scheme, enabling university employees to pursue higher education.",
        "The agreement was signed on Wednesday, 1 July 2026, at a ceremony held at MKU. MKU Vice-Chancellor Prof. Deogratius Jaganyi and AEDT Trustee Sheikh Irshad Ibrahim signed on behalf of their institutions. The ceremony was witnessed by Prof. Peter Wanderi, MKU Principal for Corporate Services, Marketing, Communication and Alumni Relations, and AEDT's Chief Executive Officer, alongside senior officials from both organisations.",
        "Under the agreement, AEDT will run an interest-free study loan programme that makes quality higher education more accessible and affordable for eligible MKU staff. Both institutions said the partnership reflects a shared commitment to investing in people, helping staff strengthen their professional skills and advance their careers.",
        "Prof. Jaganyi said the scheme builds on MKU's ongoing capacity-building and partnership efforts, and is expected to strengthen staff capacity, support professional growth and improve institutional performance.",
        "Sheikh Irshad Ibrahim said education and investment in people are the most important drivers of socio-economic development. He added that the collaboration strengthens AEDT's vision of widening access to education for underprivileged students through Shariah-compliant, interest-free study loans.",
        "AEDT's loan programme runs on a revolving fund model: beneficiaries repay the loan within their study period on a monthly basis, and the money is used again to support other learners.",
      ],
      source: { name: "Jamia TV", url: "https://jamiatv.co.ke/news/1233/aedt-mount-kenya-university-sign-mou-to-support-mku-staff-education" },
    },
  ],
  careers: [], // example: { title: "Programme Officer", location: "Nairobi", link: "mailto:..." }
};
