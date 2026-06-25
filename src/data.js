// ── SVG icon generator ────────────────────────────────────────────────────────
const icon = (label, bg) => {
  const short = label.length > 4 ? label.slice(0, 3) : label;
  const fs = short.length <= 2 ? 22 : short.length === 3 ? 18 : 14;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="${bg}"/>
    <text x="32" y="${32 + fs * 0.38}" font-family="monospace" font-size="${fs}" font-weight="bold"
      fill="white" text-anchor="middle" dominant-baseline="middle">${short}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// ── SVG placeholder for project cards ─────────────────────────────────────────
const svgCard = (bg, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient></defs>
    <rect width="320" height="200" fill="url(#g)"/>
    <text x="160" y="100" font-family="sans-serif" font-size="13" font-weight="600"
      fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.9">${label}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// ── Skills — grouped by category ──────────────────────────────────────────────
export const listTools = [
  {
    category: "Programming",
    items: ["Python", "R", "SQL"],
  },
  {
    category: "Data Science",
    items: ["pandas", "NumPy", "scikit-learn", "PyTorch"],
  },
  {
    category: "AI / NLP",
    items: ["HuggingFace Transformers", "RoBERTa Fine-tuning", "RAG Pipeline", "Prompt Engineering", "OpenAI API", "Anthropic API"],
  },
  {
    category: "Research Methods",
    items: ["Quantitative Research", "Mixed-Methods Research", "Learning Analytics", "Qualitative Coding"],
  },
  {
    category: "Learning Theory",
    items: ["Knowledge Building", "SSRL", "OECD Learning Compass 2030", "Bloom's Taxonomy", "CASEL SEL Framework"],
  },
];

// ── Research Projects ─────────────────────────────────────────────────────────
// Categories: Conference Paper · AI / NLP Research · Data Science · Teaching
export const listProyek = [
  // ── Conference Papers ──────────────────────────────────────────────────────
  {
    id: 0,
    image: "/myportofolioacadmicmeg/assets/cover_aera.jpg",
    title: "Integrating RAG-Enhanced AI to Support Cognitive, Affective, and Psychomotor Balance in K–12 Lesson Plans",
    subtitle: "Roundtable · AERA 2026 · SIG-SEL · Los Angeles, Apr 2026",
    category: "Conference Paper",
    fullDescription:
      "Accepted at the 2026 AERA Annual Meeting (Los Angeles, April 8-12, 2026), selected from over 13,000 submissions. Placed in a Roundtable Session titled 'Innovative Tools for Supporting Social Emotional Learning,' reviewed by the SIG-Social and Emotional Learning panel.\n\nDeveloped a RAG-Enhanced AI pipeline that audits K-12 lesson plans for cognitive, affective, and psychomotor balance. The system fine-tunes a RoBERTa classifier on Bloom's Taxonomy and CASEL SEL frameworks, achieving k = 0.83 inter-rater reliability. AI-assisted revision increased SEL coverage from 17% to 32% (t = 7.82, p < .01). Funded by NSTC, Taiwan.",
    borderColor: "#1F97A6",
    gradient: "linear-gradient(145deg, #1F97A6 0%, #0a0a0a 100%)",
    url: "/myportofolioacadmicmeg/assets/paper_aera2026.pdf",
    dad: "100",
  },
  {
    id: 1,
    image: "/myportofolioacadmicmeg/assets/poster_nthu.jpg",
    title: "RAG-Driven Revision of East-Asian Secondary Lesson Plans",
    subtitle: "Poster · NTHU Teacher Education Center · Jun 2025",
    category: "Conference Paper",
    fullDescription:
      "Presented at the International Symposium on Teacher Agency and Educational Reform (「教師能動性與教育改革」國際學術研討會), National Tsing Hua University Teacher Education Center, June 7, 2025. 5,937 words.\n\nBuilt a RAG pipeline to audit and revise K–12 lesson plans in Taiwan, bridging the SEL gap and expanding teacher agency. Fine-tuned a RoBERTa classifier to detect SEL-relevant instructional objectives, achieving κ = 0.83. SEL coverage increased from 17% to 32% after AI-assisted augmentation (t = 7.82, p < .01).",
    borderColor: "#1F97A6",
    gradient: "linear-gradient(145deg, #1F97A6 0%, #0a0a0a 100%)",
    url: "/myportofolioacadmicmeg/assets/paper_nthu_poster.pdf",
    urls: [
      { label: "Paper", href: "/myportofolioacadmicmeg/assets/paper_nthu_poster.pdf" },
      { label: "獎狀", href: "/myportofolioacadmicmeg/assets/cert_nthu.pdf" },
    ],
    dad: "100",
  },
  {
    id: 2,
    image: "/myportofolioacadmicmeg/assets/cover_iceel.jpg",
    title: "Using AI to Analyze Lesson Plans: An LLM-Assisted Content Audit of 50 K–12 Documents",
    subtitle: "Oral · ICEEL 2025 · Otsuma Women's University · Nov 2025",
    category: "Conference Paper",
    fullDescription:
      "Oral presentation at the 2025 9th International Conference on Education and E-Learning (ICEEL), Otsuma Women's University, Tokyo, November 21–22, 2025. 5,416 words.\n\nApplied large language models to systematically audit 50 K–12 lesson plans, identifying alignment gaps with curriculum standards. Demonstrated scalable AI-assisted content analysis for educational policy and curriculum design.",
    borderColor: "#0891b2",
    gradient: "linear-gradient(145deg, #0891b2 0%, #0a0a0a 100%)",
    url: "/myportofolioacadmicmeg/assets/paper_iceel.pdf",
    dad: "200",
  },
  {
    id: 3,
    image: "/myportofolioacadmicmeg/assets/cover_utaipei.jpg",
    title: "Aligning National Recruitment Levers with OECD Guidance: Taiwan's TFETP",
    subtitle: "Oral · Unbordered Educators Conference · UTAIPEI · Nov 2025",
    category: "Conference Paper",
    fullDescription:
      "Oral presentation at <Unbordered Educators: Transcend Within, Across Borders, and Disciplines>, Department of Learning and Teaching (International Master's Program), University of Taipei, November 8, 2025. 6,658 words.\n\nComparative policy analysis of Taiwan's Foreign English Teacher Program (TFETP) against OECD recruitment frameworks. Examines structural alignment gaps and proposes evidence-based policy levers.",
    borderColor: "#127B99",
    gradient: "linear-gradient(145deg, #127B99 0%, #0a0a0a 100%)",
    url: "/myportofolioacadmicmeg/assets/paper_utaipei.pdf",
    urls: [
      { label: "Paper", href: "/myportofolioacadmicmeg/assets/paper_utaipei.pdf" },
      { label: "Certificate", href: "/myportofolioacadmicmeg/assets/accept_utaipei.pdf" },
    ],
    dad: "300",
  },
  {
    id: 4,
    image: "/myportofolioacadmicmeg/assets/cover_tigps.jpg",
    title: "Regional Digital Development and the Psychometric Network of School–Family–Classroom Experiences Among Taiwanese Adolescents",
    subtitle: "Oral · Academia Sinica (Institute of Ethnology) · Jun 2026",
    category: "Conference Paper",
    fullDescription:
      "Oral presentation at the 3rd Symposium on Digital Interaction, Interpersonal Affect and Taiwan i-Generation Research (數位互動與人際情感暨2026臺灣數位世代研究第三屆學術研討會), Institute of Ethnology, Academia Sinica, June 11-13, 2026. Sponsored by NSTC.\n\nUsing Wave 1 of the Taiwan i-Generation Panel Study (TIGPS; N = 4,715), this study examined whether macro-level regional digital development context reorganizes the conditional dependence structure of adolescents' school, family, and classroom experiences. Spearman-based EBICglasso networks were estimated across 21 items spanning parenting involvement, school attitude, student identity, and class cohesion; group differences were tested via the Network Comparison Test (NCT; 1,000 permutations) for digitally Mature vs. Potential regions and public vs. private school sectors.\n\nNeither regional digital development (delta-GS = 0.43, p = .58) nor school sector (p = .53) significantly reorganized network structure. Results were cross-platform replicated in Python. In the full-sample network, warm parenting and school liking emerged as the most systemically central nodes, conditionally linked to the widest range of experiential dimensions. Findings suggest the relational architecture of adolescent school-family experience is anchored in proximal interpersonal processes that remain stable across distal macro-level structural contexts.",
    borderColor: "#1a6b7a",
    gradient: "linear-gradient(145deg, #1a6b7a 0%, #0a0a0a 100%)",
    url: "/myportofolioacadmicmeg/assets/paper_tigps.pdf",
    urls: [
      { label: "Paper", href: "/myportofolioacadmicmeg/assets/paper_tigps.pdf" },
      { label: "Certificate", href: "/myportofolioacadmicmeg/assets/cert_tigps.pdf" },
    ],
    dad: "350",
  },
  // ── AI / NLP Research ─────────────────────────────────────────────────────
  {
    id: 4,
    image: svgCard("#577870", "Master's Thesis"),
    title: "Knowledge Building & OECD Learning Compass Analysis",
    subtitle: "Master's Thesis · n = 133 lesson plans · Mixed-methods",
    category: "AI / NLP Research",
    fullDescription:
      "Compared Taiwan's 108 Curriculum lesson plans with Knowledge Building lesson plans (n = 133). Operationalized the OECD Learning Compass 2030 across Agency (AG), Anticipation–Action–Reflection (AAR), and Transformative Competencies (TC). Key finding: AAR-cycle quality showed the largest effect size in differentiating high-quality collaborative lesson plans. Advisor: Prof. Huang-Yao Hong.",
    borderColor: "#577870",
    gradient: "linear-gradient(145deg, #577870 0%, #0a0a0a 100%)",
    url: "https://github.com/Megan123123",
    dad: "400",
  },
  // ── Data Science ──────────────────────────────────────────────────────────
  {
    id: 5,
    image: svgCard("#7C3AED", "Data Science"),
    title: "Brain-to-Text EEG Neural Decoding",
    subtitle: "Kaggle · PyTorch · Deep Learning",
    category: "Data Science",
    fullDescription:
      "Processed EEG neural-signal datasets for brain-to-text decoding tasks. Implemented baseline ML and deep-learning models for neural-signal classification, including feature engineering, exploratory data analysis, and systematic model evaluation. Tech stack: Python, scikit-learn, PyTorch, pandas.",
    borderColor: "#7C3AED",
    gradient: "linear-gradient(145deg, #7C3AED 0%, #0a0a0a 100%)",
    url: "https://github.com/Megan123123",
    dad: "500",
  },
  {
    id: 6,
    image: svgCard("#B45309", "Data Science"),
    title: "Bike-Sharing Demand Prediction",
    subtitle: "Time-series forecasting · pandas · scikit-learn",
    category: "Data Science",
    fullDescription:
      "Built time-series forecasting models predicting bike availability across campus stations. Engineered lag-based and rolling-window statistical features, improving RMSE and MAE relative to baseline approaches. Tech stack: Python, pandas, scikit-learn, matplotlib.",
    borderColor: "#B45309",
    gradient: "linear-gradient(145deg, #B45309 0%, #0a0a0a 100%)",
    url: "https://github.com/Megan123123",
    dad: "600",
  },
  // ── Teaching ──────────────────────────────────────────────────────────────
  {
    id: 7,
    image: svgCard("#0F766E", "Teaching"),
    title: "Junior High School Teaching Practicum",
    subtitle: "Computer Technology · Taiwan 108 Curriculum · 2025–Present",
    category: "Teaching",
    fullDescription:
      "Teacher-in-training for Computer Technology under Taiwan's 108 Curriculum. Observed how collaborative learning succeeds and breaks down in authentic classroom environments — directly witnessing student behaviors including disengagement, conversational derailment, surface compliance, and collaborative problem-solving.",
    borderColor: "#0F766E",
    gradient: "linear-gradient(145deg, #0F766E 0%, #0a0a0a 100%)",
    url: "https://github.com/Megan123123",
    dad: "700",
  },
];
