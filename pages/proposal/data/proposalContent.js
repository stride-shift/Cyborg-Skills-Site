// All proposal content in one place. Edit here, not in components.

export const cover = {
  title: 'National AI Economic Activation Platform',
  subtitle: 'A Joint Proposal from D-Lab & StrideShift',
  audience: 'For the Attention of Hon. Nhlanhla Selepe\nParliamentary Committee on Employment and Labour',
  date: 'March 2026',
  targetCount: 45000,
  hook: 'The question is not what to teach them — but how behaviors actually change at scale.',
};

export const honestProblem = {
  headline: 'Why Programs Fail',
  intro: 'The committee does not need convincing that youth unemployment is a crisis. The harder question is: why do programs designed to solve it keep falling short?',
  failures: [
    {
      stat: '80%',
      label: 'of digital skills programs report enrollment as their primary success metric',
      insight: 'Enrollment is not activation. Completion certificates do not change behavior.',
    },
    {
      stat: '95%',
      label: 'typical dropout rate for self-paced online programs without social support',
      insight: 'A program without community is a PDF with extra steps.',
    },
    {
      stat: '0',
      label: 'programs that succeed by building Capability alone',
      insight: 'This is the core insight from behavioral science.',
    },
  ],
  comb: {
    title: 'The COM-B Model',
    subtitle: 'For any behavior to occur, three conditions must be met simultaneously. Most programs only address one.',
    citation: 'Michie, van Stralen & West, 2011 — The Behaviour Change Wheel',
    segments: [
      {
        id: 'capability',
        label: 'Capability',
        description: 'Can they do it?',
        color: 'blue',
        items: [
          'AI fluency — knowing how to ask, refine, evaluate',
          'Digital literacy — basic smartphone + WhatsApp proficiency',
          'Language — content must work in their mother tongue',
        ],
        status: 'green',
        statusNote: 'Cyborg Habits platform addresses this directly',
      },
      {
        id: 'opportunity',
        label: 'Opportunity',
        description: 'Does their environment allow it?',
        color: 'green',
        items: [
          'Data access — zero-rated or subsidized connectivity',
          'Device access — personal phone or shared hub screen',
          'Community — peers and facilitators who normalize the behavior',
          'Time — 5 minutes in the flow of life, not a 6-month course',
        ],
        status: 'amber',
        statusNote: 'Requires government partnership on zero-rating + hub access',
      },
      {
        id: 'motivation',
        label: 'Motivation',
        description: 'Do they want to?',
        color: 'green',
        items: [
          'Immediate value — first session solves a real problem in their life',
          'Identity shift — "I am someone who creates with AI"',
          'Peer proof — seeing others in their community succeed',
          'Business imagination — seeing opportunities, not waiting for jobs',
        ],
        status: 'green',
        statusNote: 'Designed into every touchpoint via EAST principles',
      },
    ],
    center: {
      label: 'Behavior',
      description: 'Youth actively using AI to solve problems and create value in their daily lives',
    },
  },
};

export const behaviorChange = {
  headline: 'Designing for Behavior Change',
  intro: 'We applied the EAST framework — developed by the UK Behavioural Insights Team and used by National Treasury — to every touchpoint in the program.',
  cards: [
    {
      principle: 'Easy',
      icon: 'Zap',
      front: 'Reduce friction to near zero. Every barrier you remove doubles participation.',
      back: [
        'WhatsApp-first delivery — no app download, no login, no new behavior',
        '5 minutes a day — in the flow of life, not separate from it',
        'Works on any WhatsApp-capable phone — not just smartphones',
      ],
    },
    {
      principle: 'Attractive',
      icon: 'Sparkles',
      front: 'The reward must be immediate and personal. "Complete this course" is not attractive. "Get an answer that helps you right now" is.',
      back: [
        'First session: ask AI about YOUR problem, get a useful answer TODAY',
        'The incentive is the experience itself — not a future certificate',
        'Each habit demonstrates immediate personal value before asking for commitment',
      ],
    },
    {
      principle: 'Social',
      icon: 'Users',
      front: 'Humans imitate humans, not curricula. Behavior spreads through social proof, not instruction.',
      back: [
        'Alumni catalysts from D-Lab\'s existing network — they already know the material',
        'WhatsApp communities of practice — cyborgs helping cyborgs',
        'Facilitators are peers, not teachers — same background, one step ahead',
      ],
    },
    {
      principle: 'Timely',
      icon: 'Clock',
      front: 'Meet people at the moment of need. Unemployed youth need something that works this week, not a 6-month roadmap.',
      back: [
        'Value starts on Day 1 — not after completing prerequisites',
        'Daily prompts arrive when participants are ready to engage',
        'Business imagination exercises connect to their immediate reality',
      ],
    },
  ],
};

export const seed = {
  headline: 'The Seed: Cyborg Habits',
  intro: 'This is not a course. Not a curriculum. These are behavioral tactics — simple enough to use in 5 minutes, powerful enough to change how someone thinks about every problem they face.',
  quote: {
    text: 'The current platform plants the seed for initial awareness. We need funding to grow it into a complete solution — contextualized for this audience, with more substance for a longer-term journey.',
    author: 'Justin Germishuys, StrideShift',
  },
  habits: [
    {
      name: 'Explain It',
      icon: 'Lightbulb',
      description: 'Get accessible explanations on demand. For the first time, anyone with a phone can understand anything.',
      example: '"Explain the SMME registration process like I\'m doing it for the first time, step by step"',
    },
    {
      name: 'Plan It',
      icon: 'Target',
      description: 'Create detailed, multi-step strategies. Break any goal into actionable steps.',
      example: '"I want to start selling baked goods in my community. Give me a week-by-week plan."',
    },
    {
      name: 'Critique It',
      icon: 'Shield',
      description: 'Challenge your own assumptions. Find the weaknesses before they find you.',
      example: '"Play devil\'s advocate on my business idea. What could go wrong?"',
    },
    {
      name: 'Guide Me',
      icon: 'Compass',
      description: 'Get step-by-step guidance through unfamiliar processes. No assumed knowledge.',
      example: '"Walk me through how to open a business bank account. Don\'t skip any steps."',
    },
    {
      name: 'Imagine It',
      icon: 'Rocket',
      description: 'Explore possibilities. See opportunities you couldn\'t see before.',
      example: '"What are 10 ways someone in my area could earn money using AI and a phone?"',
    },
    {
      name: 'What If',
      icon: 'GitBranch',
      description: 'Test assumptions. Explore implications before committing.',
      example: '"What if I offered this service to local shops instead of individuals? How would that change things?"',
    },
    {
      name: 'Improve It',
      icon: 'TrendingUp',
      description: 'Continuously refine and enhance. Every draft becomes better.',
      example: '"Here\'s my flyer text. Make it more compelling but keep it in isiZulu."',
    },
  ],
  goal: 'The ultimate goal: autonomous learners who recognize that AI can help them understand anything, in their own language and terms — and who start seeing economic opportunities where they previously saw none.',
};

export const delivery = {
  headline: 'How It Reaches People',
  intro: 'A digital program means nothing if people can\'t access it. Every delivery decision was shaped by the reality of our participants\' lives.',
  components: [
    {
      id: 'whatsapp',
      label: 'WhatsApp Delivery',
      icon: 'MessageCircle',
      description: 'Primary interface. Already on every phone. Free AI access built into WhatsApp. Low data. No new app, no login, no friction.',
      position: { x: 50, y: 15 },
    },
    {
      id: 'alumni',
      label: 'Alumni Catalysts',
      icon: 'UserCheck',
      description: '20+ facilitators hired from D-Lab\'s existing alumni pool. They know the material. They\'re from the same communities. They\'re looking for placement.',
      position: { x: 15, y: 50 },
    },
    {
      id: 'community',
      label: 'Communities of Practice',
      icon: 'Users',
      description: 'WhatsApp groups where participants support each other. Peer-to-peer learning creates a flywheel effect. The behavior spreads socially.',
      position: { x: 85, y: 50 },
    },
    {
      id: 'hubs',
      label: 'Partner Centers & Hubs',
      icon: 'Building2',
      description: 'Existing TVET colleges and innovation centers provide "AI time" on physical screens for device-dependent activities.',
      position: { x: 25, y: 85 },
    },
    {
      id: 'zerorating',
      label: 'Zero-Rated Access',
      icon: 'Wifi',
      description: 'Government negotiates with Vodacom/MTN to zero-rate the platform domain. This is the single most important enabler for scale.',
      position: { x: 75, y: 85 },
    },
  ],
  centerNode: {
    label: 'The Participant',
    description: 'An unemployed youth with a phone and WhatsApp',
  },
};

export const proof = {
  headline: 'What We Can Build',
  intro: 'This is not the proposal. This is evidence that the team can deliver — and a preview of what your investment unlocks at scale.',
  items: [
    {
      title: 'Cyborg Habits Platform',
      description: 'Deployed. Mobile-tested. Currently used with corporate clients. The 2-hour master class was run and well-received — "good questions from participants."',
      icon: 'Monitor',
    },
    {
      title: 'Rapid Content Pipeline',
      description: 'Using NotebookLM, Gemini, and Claude, we can produce a complete learning experience — video, audio, interactive activity — in hours, not months. Seven 5-minute branded videos for Cyborg Habits are producible in days.',
      icon: 'Layers',
    },
    {
      title: '52-Card Activity Deck',
      description: '56 cards. 7 habit dividers. 49 prompt cards. Designed for workshop facilitation, community catalysts, and independent use. Print-ready.',
      icon: 'LayoutGrid',
    },
    {
      title: 'Interactive Learning Games',
      description: 'Two games built and playable (Reframe: multi-perspective synthesis; Babel: how instructions shape AI). Two more designed. The point: we build experiences where the skill IS the mechanic.',
      icon: 'Gamepad2',
    },
    {
      title: 'Audio & Podcast Content',
      description: '40 audio scripts, podcast episodes, micro-stories — all generated and refined using the same AI tools we teach. The content pipeline is proven.',
      icon: 'Headphones',
    },
  ],
  punchline: 'We built all of the above with a team of 3 using the same cyborg skills we teach. This is the proof of concept for the program itself.',
};

export const premortem = {
  headline: 'What Could Go Wrong',
  intro: 'We conducted a pre-mortem: imagining this program has failed, then working backward to understand why. Here are the five most likely failure modes and how we\'ve designed against each.',
  failures: [
    {
      mode: 'Digital program, no digital access',
      description: '45,000 people told to log onto a platform, but 60% cannot afford the data.',
      mitigation: 'WhatsApp-first delivery (already low-data). Explicit ask: government negotiates zero-rating for the platform domain. Fallback: partner center "AI time" at existing innovation hubs.',
      status: 'amber',
      statusLabel: 'Requires government action',
      combLayer: 'Opportunity',
    },
    {
      mode: 'Content without context',
      description: 'Generic AI training irrelevant to a 22-year-old in Limpopo looking for income.',
      mitigation: 'Sector-specific examples (AgriTech, Mining, SMME). Content generated in local languages via AI TTS. Prompts grounded in SA realities — not Silicon Valley use cases.',
      status: 'green',
      statusLabel: 'In our control, partially built',
      combLayer: 'Capability',
    },
    {
      mode: 'No community, 95% dropout',
      description: 'Self-paced digital program with no social support. Participants disengage by week 2.',
      mitigation: 'Alumni catalysts (20+ hired from D-Lab\'s existing network). WhatsApp communities of practice. Social proof through shared challenges. Facilitators are peers, not lecturers.',
      status: 'green',
      statusLabel: 'Alumni pool confirmed',
      combLayer: 'Motivation',
    },
    {
      mode: 'Skills without demand',
      description: 'Participants complete program but there\'s no market for their skills. Educated into a vacuum.',
      mitigation: 'Focus on business imagination and earning capacity — not CV prep. SMME kits (registration, tax, marketing automation) as part of the ecosystem. The goal is self-reliance, not placement.',
      status: 'amber',
      statusLabel: 'Needs further design in Phase 1',
      combLayer: 'Opportunity',
    },
    {
      mode: 'Measurement without meaning',
      description: 'Report 45,000 enrollments to committee. Nobody actually changed behavior.',
      mitigation: 'Behavioral metrics: frequency of unprompted AI use, task completion, economic activity indicators. Not completion certificates. Phased rollout starting with 100 to validate metrics before scaling.',
      status: 'green',
      statusLabel: 'Analytics built into platform',
      combLayer: 'All',
    },
  ],
};

export const funding = {
  headline: 'What R40–50M Buys',
  intro: 'Not a finished program. The capacity to design, validate, iterate, and scale — with decision gates at every stage.',
  budget: [
    { category: 'Platform & AI Licensing', range: 'R8–10M', description: 'Enterprise AI access for 45K users, WhatsApp integration, analytics', color: 'blue' },
    { category: 'Content & R&D', range: 'R10–12M', description: 'Contextualization, sector modules, language localization, extended habit curriculum', color: 'green' },
    { category: 'Community Activation', range: 'R8–10M', description: 'Alumni catalyst stipends across 9 provinces, hub partnerships, WhatsApp facilitation', color: 'blue' },
    { category: 'Phased Rollout', range: 'R6–8M', description: 'Operations for 100 → 1,000 → 10,000 → 45,000 scaling', color: 'green' },
    { category: 'Monitoring & Evaluation', range: 'R4–5M', description: 'Behavioral analytics, independent evaluation, feedback loops, course corrections', color: 'blue' },
    { category: 'Governance & Oversight', range: 'R3–4M', description: 'Steering committee, reporting, compliance, parliamentary liaison', color: 'green' },
  ],
  phases: [
    {
      name: 'Design & Validate',
      duration: 'Month 1–3',
      participants: '100',
      budget: 'R5M',
      description: 'Contextualize Cyborg Habits for target audience. Test WhatsApp delivery. Validate behavioral metrics. Learn what doesn\'t work.',
      gate: 'Do engagement metrics justify scaling? If <50% sustained engagement, redesign Opportunity layer before proceeding.',
    },
    {
      name: 'Iterate & Expand',
      duration: 'Month 4–6',
      participants: '1,000',
      budget: 'R10M',
      description: 'Incorporate Phase 1 learnings. Launch sector-specific content. Deploy alumni catalysts across first 3 provinces.',
      gate: 'Are participants showing behavioral change (unprompted AI use)? Are catalysts effective? Adjust ratios and content.',
    },
    {
      name: 'Scale',
      duration: 'Month 7–12',
      participants: '10,000+',
      budget: 'R15M',
      description: 'Provincial rollout. Community hub activation. Begin workflow development for economically active participants.',
      gate: 'Is the system self-reinforcing? Are communities of practice sustaining without direct facilitation?',
    },
    {
      name: 'Full Activation',
      duration: 'Month 13–18',
      participants: '45,000',
      budget: 'R15M',
      description: 'National deployment. Catalyst network operating independently. Economic activation metrics tracked.',
      gate: 'Final review: behavioral outcomes, economic activation indicators, system sustainability assessment.',
    },
  ],
  punchline: 'Phase 1 is where we find out what doesn\'t work. That is not failure — it is the design process. Funding a program that cannot course-correct is funding a program that will fail silently.',
};

export const ask = {
  headline: 'The Ask',
  team: {
    dlab: {
      name: 'D-Lab',
      role: 'Delivery Partner',
      strengths: ['Youth development track record', 'Alumni network of 500+', 'Operational presence across provinces', 'Existing partner center relationships'],
    },
    strideshift: {
      name: 'StrideShift',
      role: 'Ecosystem Design Partner',
      strengths: ['Cyborg skills framework and platform', 'Rapid AI content pipeline', 'Game and experience design capability', 'Technical architecture'],
    },
    structure: 'D-Lab as primary contractor. StrideShift as subcontractor for ecosystem development. Steering committee with parliamentary oversight.',
  },
  asks: [
    {
      number: 1,
      title: 'Funding Approval',
      description: 'R40–50M over 18 months, released in phases tied to decision gates. Not a blank cheque — structured accountability at every stage.',
      icon: 'Wallet',
    },
    {
      number: 2,
      title: 'Zero-Rating Partnership',
      description: 'Government to negotiate with Vodacom/MTN to zero-rate the platform domain and WhatsApp AI delivery channel. This is the single biggest enabler.',
      icon: 'Wifi',
    },
    {
      number: 3,
      title: 'Steering Committee',
      description: 'Parliamentary oversight mechanism with quarterly review gates tied to behavioral outcome data — not enrollment numbers.',
      icon: 'ShieldCheck',
    },
  ],
  closing: 'This proposal is a skeleton, not a finished building. We are asking you to fund the architecture — the design, testing, and scaling capacity that turns a framework into a national system. We know what we know. We know what we don\'t know. And we have designed a process to learn what we need to learn before we scale.',
};
