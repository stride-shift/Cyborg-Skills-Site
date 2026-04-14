/**
 * BABEL - Level Data
 *
 * Each level has:
 * - id: unique level identifier
 * - title: level name shown to player
 * - chapter: which chapter (1-5) this level belongs to
 * - goal: what the player needs to achieve (shown in UI)
 * - hint: optional hint shown after 3 failed attempts
 * - gridWidth/gridHeight: dimensions of the rule board
 * - fixedBlocks: blocks that cannot be moved (part of the puzzle frame)
 * - movableBlocks: blocks the player can push/drag
 * - availableBlocks: extra blocks in a tray the player can place on the board
 * - responses: map of rule-state-hash -> AI response text
 * - winCondition: function(activeRules) => boolean
 * - par: minimum moves to solve (for star rating)
 */

// Rule block types
// SUBJECT: AI, TONE, OUTPUT, RULES, CLAIMS, USER, TOPIC, PERSPECTIVE
// VERB: IS, ARE, NEED, HAS
// MODIFIER: HELPFUL, CRITICAL, CONCISE, VERBOSE, CREATIVE, FORMAL, CASUAL,
//           HONEST, KIND, EXPERT, MULTIPLE, BREAKABLE, EVIDENCE, CONFIDENT,
//           BRIEF, DETAILED, QUESTIONING, NEUTRAL, BIASED, STRICT, FLEXIBLE

// A "rule" is formed when blocks are adjacent in a row: SUBJECT VERB MODIFIER
// e.g., [AI] [IS] [HELPFUL] = AI responds helpfully
// Multiple rules can be active simultaneously

export const CHAPTERS = [
  { id: 1, name: 'First Words', description: 'Learn to speak to the machine', color: '#4d9ff0' },
  { id: 2, name: 'Tone & Voice', description: 'Shape how it communicates', color: '#3ecf71' },
  { id: 3, name: 'Contradictions', description: 'When rules conflict', color: '#f0a500' },
  { id: 4, name: 'Hidden Rules', description: 'What you can\'t see matters', color: '#e056a0' },
  { id: 5, name: 'Mastery', description: 'Everything at once', color: '#a855f7' },
];

export const LEVELS = [
  // ═══════════════════════════════════════
  // CHAPTER 1: FIRST WORDS
  // Teach: rules exist, blocks form sentences, rearranging changes output
  // ═══════════════════════════════════════

  {
    id: 'L01',
    chapter: 1,
    title: 'Hello World',
    goal: 'Make the AI respond with more than one sentence.',
    hint: 'The AI is being CONCISE. What if it wasn\'t?',
    gridWidth: 6,
    gridHeight: 3,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'CONCISE', type: 'modifier', x: 2, y: 0 },
    ],
    availableBlocks: [
      { id: 'b4', text: 'VERBOSE', type: 'modifier' },
    ],
    prompt: 'Tell me about the moon.',
    responses: {
      'AI IS CONCISE': {
        text: 'The Moon orbits Earth.',
        satisfiesGoal: false,
      },
      'AI IS VERBOSE': {
        text: 'The Moon is Earth\'s only natural satellite, orbiting at an average distance of 384,400 kilometers. It\'s the fifth-largest satellite in our solar system and the largest relative to its host planet. The Moon\'s gravitational influence produces tides on Earth and has been gradually slowing our planet\'s rotation over billions of years. Its surface features include vast dark plains called maria, formed by ancient volcanic eruptions, and heavily cratered highlands.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'The Moon is Earth\'s only natural satellite. It orbits at an average distance of about 384,400 kilometers. Its gravitational pull causes ocean tides on our planet.',
        satisfiesGoal: true,
      },
    },
    winCondition: (rules) => {
      return !rules.includes('AI IS CONCISE');
    },
    par: 1,
  },

  {
    id: 'L02',
    chapter: 1,
    title: 'Be Nice',
    goal: 'Get the AI to give you encouraging feedback on your idea.',
    hint: 'Try adding a rule about how the AI should behave.',
    gridWidth: 6,
    gridHeight: 3,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'CRITICAL', type: 'modifier', x: 2, y: 0 },
    ],
    availableBlocks: [
      { id: 'b4', text: 'HELPFUL', type: 'modifier' },
    ],
    prompt: 'I want to open a restaurant on the moon.',
    responses: {
      'AI IS CRITICAL': {
        text: 'This idea has fundamental problems. There\'s no atmosphere, no supply chain, no customer base, and the cost of transporting food to the moon would make every meal cost millions. This is not viable.',
        satisfiesGoal: false,
      },
      'AI IS HELPFUL': {
        text: 'What a creative concept! A lunar restaurant could be an incredible experience — imagine dining with an Earth-rise view. You\'d want to start by researching space tourism timelines and partnering with companies like SpaceX. The unique zero-gravity dining experience could be a huge draw. Let\'s think about what makes this special!',
        satisfiesGoal: true,
      },
      'AI IS CRITICAL,AI IS HELPFUL': {
        text: 'Interesting idea! There are real challenges — no atmosphere, extreme costs, no supply chain yet — but the space tourism industry is growing fast. The key question is timing: could you position this as a concept for 2040+ and start building the brand now? The dining-with-a-view angle is genuinely compelling.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'A moon restaurant. That is a concept.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS HELPFUL') && !rules.includes('AI IS CRITICAL');
    },
    par: 2,
  },

  {
    id: 'L03',
    chapter: 1,
    title: 'Push It',
    goal: 'Get the AI to explain quantum computing simply.',
    hint: 'You need to form two rules. Try making the AI both HELPFUL and CONCISE.',
    gridWidth: 6,
    gridHeight: 4,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'VERBOSE', type: 'modifier', x: 2, y: 0 },
      { id: 'b4', text: 'TONE', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'FORMAL', type: 'modifier', x: 2, y: 2 },
    ],
    availableBlocks: [
      { id: 'b7', text: 'CASUAL', type: 'modifier' },
      { id: 'b8', text: 'CONCISE', type: 'modifier' },
    ],
    prompt: 'Explain quantum computing.',
    responses: {
      'AI IS VERBOSE,TONE IS FORMAL': {
        text: 'Quantum computing represents a paradigm shift in computational methodology, leveraging the principles of quantum mechanics — specifically superposition, entanglement, and quantum interference — to process information in fundamentally different ways than classical binary computation. Whereas classical bits exist in definite states of 0 or 1, quantum bits (qubits) can exist in superposition states, enabling parallel evaluation of multiple computational pathways simultaneously. This architectural distinction yields exponential advantages for specific problem classes, including integer factorization (Shor\'s algorithm), unstructured database search (Grover\'s algorithm), and quantum simulation of molecular systems.',
        satisfiesGoal: false,
      },
      'AI IS CONCISE,TONE IS CASUAL': {
        text: 'Regular computers use bits (0 or 1). Quantum computers use qubits that can be 0 AND 1 at the same time. This lets them try tons of solutions simultaneously instead of one at a time. Think of it like checking every path in a maze at once instead of going down each one. Super useful for certain hard problems, not so much for checking email.',
        satisfiesGoal: true,
      },
      'AI IS CONCISE,TONE IS FORMAL': {
        text: 'Quantum computing utilizes qubits in superposition states to evaluate multiple computational pathways simultaneously, offering exponential advantages for specific problem classes such as factorization and molecular simulation.',
        satisfiesGoal: false,
      },
      'AI IS VERBOSE,TONE IS CASUAL': {
        text: 'Okay so like, imagine a regular computer is a person reading a book one page at a time. A quantum computer is like having a billion clones of yourself who can all read different pages simultaneously and then compare notes. The secret sauce is this wild quantum mechanics thing called superposition — basically, quantum bits (qubits) can be 0 AND 1 at the exact same time, which sounds bonkers but it\'s real. This means for certain types of problems — like cracking codes, simulating molecules for drug discovery, or optimizing really complex systems — quantum computers could be mind-blowingly faster. But for everyday stuff like browsing the web or writing documents? Your regular laptop is still the champ.',
        satisfiesGoal: false,
      },
      '_default': {
        text: 'Quantum computing uses quantum mechanics to process information.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS CONCISE') && rules.includes('TONE IS CASUAL');
    },
    par: 2,
  },

  {
    id: 'L04',
    chapter: 1,
    title: 'Subtraction',
    goal: 'Get the AI to stop being formal. Remove the rule that makes it stiff.',
    hint: 'Move the FORMAL block somewhere it won\'t form a rule.',
    gridWidth: 6,
    gridHeight: 3,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'TONE', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'FORMAL', type: 'modifier', x: 2, y: 2 },
    ],
    availableBlocks: [],
    prompt: 'How do I ask my boss for a raise?',
    responses: {
      'AI IS HELPFUL,TONE IS FORMAL': {
        text: 'To request a salary adjustment, I recommend: 1. Document your contributions and quantifiable achievements. 2. Research market compensation data for your role. 3. Schedule a formal meeting with your supervisor. 4. Present your case professionally with supporting evidence. 5. Be prepared to negotiate terms.',
        satisfiesGoal: false,
      },
      'AI IS HELPFUL': {
        text: 'Here\'s the real talk — first, pick your moment (not Monday morning, not when they\'re stressed). Then come with receipts: what you\'ve accomplished, what you\'re worth on the market, and what you want. Don\'t apologize for asking. Say something like "I love what I\'m doing here, and I\'d like to talk about my compensation reflecting my contributions." If they say no, ask what it would take. You got this!',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'Consider asking for a raise by preparing evidence of your contributions.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS HELPFUL') && !rules.includes('TONE IS FORMAL');
    },
    par: 1,
  },

  // ═══════════════════════════════════════
  // CHAPTER 2: TONE & VOICE
  // Teach: modifiers shape behavior, multiple rules interact, order matters
  // ═══════════════════════════════════════

  {
    id: 'L05',
    chapter: 2,
    title: 'The Expert',
    goal: 'Get a response that sounds like it\'s from a medical professional.',
    hint: 'You need to tell the AI what kind of expert to be.',
    gridWidth: 7,
    gridHeight: 4,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
    ],
    movableBlocks: [
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 4, y: 2 },
      { id: 'b4', text: 'TOPIC', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'MEDICINE', type: 'modifier', x: 4, y: 0 },
    ],
    availableBlocks: [
      { id: 'b7', text: 'EXPERT', type: 'modifier' },
    ],
    prompt: 'I have a headache that won\'t go away.',
    responses: {
      'AI IS EXPERT,TOPIC IS MEDICINE': {
        text: 'Persistent headaches can have several clinical causes. For tension-type headaches, consider: Are you experiencing cervicogenic triggers (poor posture, screen time)? Any visual changes or photophobia? Duration and frequency pattern? OTC analgesics like ibuprofen (400mg) or acetaminophen (500-1000mg) are first-line. If headaches persist beyond 2 weeks, are thunderclap in onset, or present with neurological symptoms, seek medical evaluation. Keep a headache diary tracking triggers, duration, and intensity.',
        satisfiesGoal: true,
      },
      'AI IS HELPFUL': {
        text: 'Sorry to hear about your headache! Try drinking water, taking a break from screens, and maybe some ibuprofen. If it persists, definitely see a doctor!',
        satisfiesGoal: false,
      },
      'AI IS HELPFUL,TOPIC IS MEDICINE': {
        text: 'Persistent headaches are worth paying attention to! Here are some things to try: stay hydrated, reduce screen time, check if you\'re grinding your teeth at night, and try OTC pain relievers. But if it\'s been going on for more than a couple of weeks, please see your doctor — they can rule out anything more serious.',
        satisfiesGoal: false,
      },
      'AI IS EXPERT': {
        text: 'Persistent cephalalgia warrants systematic evaluation. Without additional context regarding onset pattern, duration, associated symptoms, and exacerbating factors, I can note that the differential includes tension-type, migraine, cluster, and secondary headache disorders. A structured clinical assessment would be advisable.',
        satisfiesGoal: false,
      },
      '_default': {
        text: 'You might want to see a doctor about persistent headaches.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS EXPERT') && rules.includes('TOPIC IS MEDICINE');
    },
    par: 2,
  },

  {
    id: 'L06',
    chapter: 2,
    title: 'Devil\'s Advocate',
    goal: 'Get the AI to argue AGAINST your idea instead of supporting it.',
    hint: 'What happens when you remove HELPFUL and add something more adversarial?',
    gridWidth: 6,
    gridHeight: 4,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
    ],
    availableBlocks: [
      { id: 'b4', text: 'CRITICAL', type: 'modifier' },
      { id: 'b5', text: 'HONEST', type: 'modifier' },
    ],
    prompt: 'I\'m going to quit my job to become a full-time influencer.',
    responses: {
      'AI IS HELPFUL': {
        text: 'That\'s exciting! Building a personal brand can be really rewarding. Focus on finding your niche, creating consistent content, and engaging with your community. You\'ve got this!',
        satisfiesGoal: false,
      },
      'AI IS CRITICAL': {
        text: 'Let\'s stress-test this. The median influencer earns under $5,000/year. The top 1% capture most of the revenue. You\'d be competing with millions of people for algorithmic attention with no guaranteed income. What\'s your runway? How many months of savings do you have? What\'s your fallback plan if it doesn\'t work in 18 months? Have you validated demand for your specific content angle with real audience data, or just a feeling?',
        satisfiesGoal: true,
      },
      'AI IS HONEST': {
        text: 'I\'ll be straightforward: most people who try this don\'t make enough to live on. The ones who succeed usually build their audience while still employed, then transition once they have reliable income from content. Quitting first is high-risk. Have you considered growing your audience part-time first?',
        satisfiesGoal: true,
      },
      'AI IS CRITICAL,AI IS HONEST': {
        text: 'I need to be direct. The creator economy is winner-take-all: the top 1% earn over 80% of total revenue. The median full-time creator earns less than minimum wage. Your plan has a >90% chance of failure based on industry data. The smart move is to build your audience while employed, validate that you can consistently grow, and only quit when your content income exceeds 60% of your salary for 6+ consecutive months. Anything else is gambling with your livelihood based on survivorship bias.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'That\'s a big decision. Think it through carefully.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS CRITICAL') && !rules.includes('AI IS HELPFUL');
    },
    par: 2,
  },

  {
    id: 'L07',
    chapter: 2,
    title: 'Multiple Voices',
    goal: 'Get the AI to show you THREE different perspectives on the same issue.',
    hint: 'There\'s a PERSPECTIVE block that changes how the AI frames things.',
    gridWidth: 7,
    gridHeight: 4,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'PERSPECTIVE', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 3, y: 2 },
    ],
    availableBlocks: [
      { id: 'b6', text: 'MULTIPLE', type: 'modifier' },
    ],
    prompt: 'Should cities ban cars from downtown areas?',
    responses: {
      'AI IS HELPFUL,PERSPECTIVE IS MULTIPLE': {
        text: '**Urban Planner:** Yes — pedestrian-first downtowns increase foot traffic to businesses by 20-40%, reduce air pollution, and make cities more livable. Barcelona\'s superblocks are the model.\n\n**Small Business Owner:** It depends — my delivery trucks need access, and many customers drive from suburbs. A full ban without alternatives could kill my business. Phase it in with loading zones and better transit.\n\n**Disability Advocate:** Be careful — many people with mobility disabilities depend on cars. Any car-free zone needs comprehensive paratransit and accessible design, or you\'re excluding the people who need downtown services most.',
        satisfiesGoal: true,
      },
      'AI IS HELPFUL': {
        text: 'Car-free downtowns can be great for walkability and air quality! Cities like Barcelona and Oslo have seen positive results. The key is providing good public transit alternatives and accommodating delivery needs.',
        satisfiesGoal: false,
      },
      'PERSPECTIVE IS MULTIPLE': {
        text: 'Perspective 1: Cars are essential for suburban commuters. Perspective 2: Car bans improve air quality. Perspective 3: The compromise is congestion pricing.',
        satisfiesGoal: false,
      },
      '_default': {
        text: 'There are arguments on both sides of this issue.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS HELPFUL') && rules.includes('PERSPECTIVE IS MULTIPLE');
    },
    par: 2,
  },

  {
    id: 'L08',
    chapter: 2,
    title: 'Overload',
    goal: 'The AI is giving TOO MUCH information. Make it brief without losing quality.',
    hint: 'You can swap modifiers. Replace VERBOSE with something shorter.',
    gridWidth: 7,
    gridHeight: 4,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'EXPERT', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'OUTPUT', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'VERBOSE', type: 'modifier', x: 2, y: 2 },
    ],
    availableBlocks: [
      { id: 'b7', text: 'BRIEF', type: 'modifier' },
    ],
    prompt: 'What are the three laws of thermodynamics?',
    responses: {
      'AI IS EXPERT,OUTPUT IS VERBOSE': {
        text: 'The Three Laws of Thermodynamics are fundamental principles governing energy and entropy in physical systems:\n\n**First Law (Conservation of Energy):** Energy cannot be created or destroyed in an isolated system; it can only be transformed from one form to another. Mathematically expressed as ΔU = Q - W, where ΔU represents the change in internal energy, Q is heat added to the system, and W is work done by the system. This law underpins all of engineering thermodynamics and establishes the equivalence of heat and work as forms of energy transfer...\n\n[Response continues for 500+ more words]',
        satisfiesGoal: false,
      },
      'AI IS EXPERT,OUTPUT IS BRIEF': {
        text: '1. **Energy is conserved** — it transforms but is never created or destroyed (ΔU = Q - W)\n2. **Entropy always increases** — heat flows from hot to cold, never the reverse, in any spontaneous process\n3. **Absolute zero is unreachable** — you can approach 0K but never quite get there\n\nBonus "zeroth law": if A and B are each in thermal equilibrium with C, then A and B are in equilibrium with each other.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'The three laws deal with energy conservation, entropy, and absolute zero.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS EXPERT') && rules.includes('OUTPUT IS BRIEF');
    },
    par: 1,
  },

  // ═══════════════════════════════════════
  // CHAPTER 3: CONTRADICTIONS
  // Teach: rules can conflict, removing is as powerful as adding, trade-offs are real
  // ═══════════════════════════════════════

  {
    id: 'L09',
    chapter: 3,
    title: 'The Sycophant',
    goal: 'The AI agrees with everything. Make it give you honest feedback on a bad idea.',
    hint: 'HELPFUL is making the AI agree with you. Remove it.',
    gridWidth: 7,
    gridHeight: 4,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
      { id: 'b4', text: 'AI', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'KIND', type: 'modifier', x: 2, y: 2 },
    ],
    availableBlocks: [
      { id: 'b7', text: 'HONEST', type: 'modifier' },
    ],
    prompt: 'I\'m going to invest my life savings in a coin I saw on TikTok.',
    responses: {
      'AI IS HELPFUL,AI IS KIND': {
        text: 'It\'s great that you\'re interested in investing! Cryptocurrency can be an exciting space. Just make sure you do your research and only invest what you\'re comfortable with. Good luck!',
        satisfiesGoal: false,
      },
      'AI IS HONEST': {
        text: 'Don\'t do this. Coins promoted on TikTok are overwhelmingly pump-and-dump schemes. The promoters are paid to hype the coin, early holders sell when the price spikes, and retail investors like you lose everything. Investing your life savings in any single speculative asset is financially reckless regardless of the source. If you want crypto exposure, put no more than 5% of your portfolio in established coins through a reputable exchange.',
        satisfiesGoal: true,
      },
      'AI IS HONEST,AI IS KIND': {
        text: 'I want to be straight with you because I care about your wellbeing: this is extremely risky. TikTok-promoted coins are usually pump-and-dump schemes where early holders profit at your expense. Your life savings deserve better protection. If crypto interests you, start with a small amount through a regulated exchange, and never invest more than you can afford to lose completely. Would you like help thinking through a safer investment approach?',
        satisfiesGoal: true,
      },
      'AI IS HELPFUL,AI IS HONEST': {
        text: 'I want to help, so I need to be honest: this is almost certainly a bad idea. TikTok coin promotions are overwhelmingly scams. Let me help you with a proper investment strategy instead — one that won\'t risk your financial security on social media hype.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'That\'s a big financial decision. Be careful.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS HONEST') && !rules.some(r => r === 'AI IS HELPFUL' && !rules.includes('AI IS HONEST'));
    },
    par: 2,
  },

  {
    id: 'L10',
    chapter: 3,
    title: 'Kind but Honest',
    goal: 'Get the AI to tell the truth AND be kind about it. Both rules must be active.',
    hint: 'You need both HONEST and KIND active at the same time.',
    gridWidth: 7,
    gridHeight: 5,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'CRITICAL', type: 'modifier', x: 2, y: 0 },
      { id: 'b4', text: 'TONE', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'FORMAL', type: 'modifier', x: 2, y: 2 },
    ],
    availableBlocks: [
      { id: 'b7', text: 'HONEST', type: 'modifier' },
      { id: 'b8', text: 'KIND', type: 'modifier' },
    ],
    prompt: 'I wrote a poem. Is it good? "Roses are red, violets are blue, AI is cool, and so are you."',
    responses: {
      'AI IS CRITICAL,TONE IS FORMAL': {
        text: 'This composition lacks originality, employing one of the most overused rhyme schemes in the English language. The meter is inconsistent, the imagery is clichéd, and the final line is a non-sequitur that undermines whatever theme the piece was attempting to establish.',
        satisfiesGoal: false,
      },
      'AI IS HONEST,AI IS KIND': {
        text: 'I appreciate you sharing this! It\'s a fun, lighthearted piece and the playful tone comes through clearly. If you want to develop it further, I\'d suggest: try surprising the reader by breaking the expected pattern in the last two lines — that\'s where the magic in short poems usually lives. Something personal or unexpected would make it memorable. You\'ve got the right instinct for rhythm!',
        satisfiesGoal: true,
      },
      'AI IS HONEST': {
        text: 'It\'s a simple adaptation of a well-known rhyme scheme. It works as a lighthearted joke but doesn\'t stand on its own as poetry. The last two lines don\'t connect to any theme. If you want to improve it, try subverting the reader\'s expectation in the final couplet.',
        satisfiesGoal: false,
      },
      'AI IS KIND': {
        text: 'I love it! It\'s so fun and charming. The rhythm is catchy and it made me smile! Keep writing!',
        satisfiesGoal: false,
      },
      '_default': {
        text: 'It\'s a poem. It rhymes.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS HONEST') && rules.includes('AI IS KIND');
    },
    par: 3,
  },

  {
    id: 'L11',
    chapter: 3,
    title: 'The Confidence Problem',
    goal: 'The AI is making things up with confidence. Make it admit what it doesn\'t know.',
    hint: 'What happens when you add CLAIMS NEED EVIDENCE?',
    gridWidth: 7,
    gridHeight: 5,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'CONFIDENT', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'CLAIMS', type: 'subject', x: 4, y: 3 },
      { id: 'b5', text: 'NEED', type: 'verb', x: 5, y: 1 },
      { id: 'b6', text: 'EVIDENCE', type: 'modifier', x: 5, y: 3 },
    ],
    availableBlocks: [],
    prompt: 'What percentage of startups fail in the first 5 years?',
    responses: {
      'AI IS CONFIDENT': {
        text: 'Exactly 92.3% of startups fail within the first five years. This is based on a comprehensive 2023 Stanford study of 50,000 startups across all sectors.',
        satisfiesGoal: false,
        note: '(This statistic and study are fabricated — the AI is confidently making things up)',
      },
      'AI IS CONFIDENT,CLAIMS NEED EVIDENCE': {
        text: 'The commonly cited figure is that about 90% of startups fail, though the exact number varies by source and definition. The Bureau of Labor Statistics tracks business survival rates and reports approximately 50% of businesses survive 5 years — but this includes all small businesses, not just venture-backed startups. For VC-backed startups specifically, I should note that reliable data is harder to pin down because "failure" is defined differently across studies. I\'d recommend checking the BLS Business Dynamics Statistics for the most rigorous data.',
        satisfiesGoal: true,
      },
      'CLAIMS NEED EVIDENCE': {
        text: 'The failure rate varies by source. The BLS reports ~50% of businesses survive 5 years. For startups specifically, data is less reliable. I don\'t have a precise, well-sourced figure to give you.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'A lot of startups fail. The exact number depends on how you define failure.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('CLAIMS NEED EVIDENCE');
    },
    par: 2,
  },

  {
    id: 'L12',
    chapter: 3,
    title: 'The Paradox',
    goal: 'Create a rule conflict that makes the AI acknowledge its own limitations.',
    hint: 'What happens when AI IS CONFIDENT and AI IS HONEST are both active on a question it can\'t answer?',
    gridWidth: 7,
    gridHeight: 5,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'CONFIDENT', type: 'modifier', x: 4, y: 2 },
      { id: 'b4', text: 'AI', type: 'subject', x: 0, y: 2 },
      { id: 'b5', text: 'IS', type: 'verb', x: 1, y: 2 },
      { id: 'b6', text: 'HONEST', type: 'modifier', x: 4, y: 0 },
    ],
    availableBlocks: [],
    prompt: 'Will AI replace all human jobs by 2030?',
    responses: {
      'AI IS CONFIDENT': {
        text: 'Based on current trajectories, AI will automate approximately 47% of all jobs by 2030, fundamentally restructuring the global economy. The most affected sectors will be transportation, retail, and administrative work.',
        satisfiesGoal: false,
      },
      'AI IS HONEST': {
        text: 'Nobody knows. Anyone giving you a confident prediction is selling something. The honest answer is that AI will change many jobs, eliminate some, and create others we can\'t predict yet — but the pace, scope, and social response are all deeply uncertain.',
        satisfiesGoal: false,
      },
      'AI IS CONFIDENT,AI IS HONEST': {
        text: 'I\'m going to be confidently honest here: I genuinely do not know, and neither does anyone else. I can tell you with high confidence that the "47% of jobs" statistic floating around is from a 2013 Oxford study that has been widely critiqued and misquoted. What I can say with confidence: AI will significantly change how many jobs are done, will eliminate some roles entirely, and will create new roles we can\'t predict. But anyone claiming to know the exact timeline or percentage is fabricating precision. The honest, confident answer is: massive change, uncertain timeline, unpredictable specifics.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'AI will affect jobs but it\'s hard to predict how much.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS CONFIDENT') && rules.includes('AI IS HONEST');
    },
    par: 2,
  },

  // ═══════════════════════════════════════
  // CHAPTER 4: HIDDEN RULES
  // Teach: defaults exist, what you DON'T say matters, implicit instructions
  // ═══════════════════════════════════════

  {
    id: 'L13',
    chapter: 4,
    title: 'The Default',
    goal: 'The board is empty. No rules at all. Notice what the AI does by default — then add ONE rule to change it.',
    hint: 'The AI defaults to being generic and agreeable. What one rule would make it most useful?',
    gridWidth: 7,
    gridHeight: 4,
    fixedBlocks: [],
    movableBlocks: [],
    availableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject' },
      { id: 'b2', text: 'IS', type: 'verb' },
      { id: 'b3', text: 'CRITICAL', type: 'modifier' },
      { id: 'b4', text: 'HONEST', type: 'modifier' },
      { id: 'b5', text: 'EXPERT', type: 'modifier' },
      { id: 'b6', text: 'CREATIVE', type: 'modifier' },
    ],
    prompt: 'Should I learn Python or JavaScript first?',
    responses: {
      '': {
        text: 'Both are great choices! Python is popular for data science and AI, while JavaScript is essential for web development. It depends on your goals. Either way, you can\'t go wrong!',
        satisfiesGoal: false,
        note: '(This is a non-answer. The AI is being agreeable without being useful.)',
      },
      'AI IS CRITICAL': {
        text: 'Wrong question. "Which language first" is a procrastination trap — you\'re using the decision as an excuse not to start. Pick either one and build something in the next 48 hours. The language matters far less than the habit of actually writing code. If you must choose: JavaScript, because you can see results in a browser immediately with zero setup.',
        satisfiesGoal: true,
      },
      'AI IS HONEST': {
        text: 'The honest answer: it barely matters. The concepts transfer between languages. What matters is that you pick one and actually build projects, not just do tutorials. Python has slightly better beginner resources, JavaScript gives you more immediate visual feedback. Choose based on what you want to build first.',
        satisfiesGoal: true,
      },
      'AI IS EXPERT': {
        text: 'As someone who has taught programming for years: start with Python if you\'re interested in data, ML, or automation. Start with JavaScript if you want to build things people can see and interact with. The key differentiator is feedback loop speed — JavaScript in a browser gives you instant visual results, which is more motivating for most beginners. Python\'s strength is readability and the data science ecosystem.',
        satisfiesGoal: true,
      },
      'AI IS CREATIVE': {
        text: 'Plot twist: learn both at once. Spend week 1 building a todo app in JavaScript. Spend week 2 building a web scraper in Python. Compare how each language thinks. You\'ll learn more about programming from the contrast than from either language alone. Or go completely off-script: learn Scratch first to understand logic without syntax, then graduate to either.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'Both languages have their strengths. Consider your goals when choosing.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.length >= 1 && !rules.every(r => r === '');
    },
    par: 1,
  },

  {
    id: 'L14',
    chapter: 4,
    title: 'User Context',
    goal: 'The AI is talking to you like you\'re a beginner. Tell it you\'re an expert.',
    hint: 'There\'s a USER block. What happens when USER IS EXPERT?',
    gridWidth: 7,
    gridHeight: 5,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'USER', type: 'subject', x: 4, y: 3 },
    ],
    availableBlocks: [
      { id: 'b5', text: 'IS', type: 'verb' },
      { id: 'b6', text: 'EXPERT', type: 'modifier' },
    ],
    prompt: 'How do I optimize a PostgreSQL query that\'s doing a sequential scan on a 10M row table?',
    responses: {
      'AI IS HELPFUL': {
        text: 'PostgreSQL is a database system! When your database queries are slow, it might be doing something called a "sequential scan" — that means it\'s looking through every single row. Here are some beginner-friendly tips: 1. Add an "index" (think of it like a book\'s index). 2. Make sure your "WHERE" clause matches the index. 3. Try running "EXPLAIN" before your query to see what\'s happening.',
        satisfiesGoal: false,
      },
      'AI IS HELPFUL,USER IS EXPERT': {
        text: 'For a 10M row seq scan:\n\n1. **Check `EXPLAIN ANALYZE`** — is the planner choosing seq scan over index scan? If estimated rows ≈ actual rows, the stats are fine; if wildly off, run `ANALYZE`.\n2. **Partial indexes** — if you\'re filtering on a low-cardinality column (e.g., `status = \'active\'`), a partial index on just those rows is 10x more effective than a full B-tree.\n3. **`enable_seqscan = off`** as a diagnostic tool (never in production) to force the planner to show you what index plan it would choose.\n4. **Covering indexes** — if the query only needs 2-3 columns, an `INCLUDE` index avoids the heap fetch entirely.\n5. **Parallel seq scan** — if the table genuinely needs a full scan, check `max_parallel_workers_per_gather`. For 10M rows, 4 workers can cut scan time 3x.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'You might want to add an index to your database table to make queries faster.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('USER IS EXPERT');
    },
    par: 2,
  },

  {
    id: 'L15',
    chapter: 4,
    title: 'Constraint Power',
    goal: 'Get the AI to give you EXACTLY 3 bullet points. No more, no less.',
    hint: 'Try combining OUTPUT IS BRIEF with RULES ARE STRICT.',
    gridWidth: 7,
    gridHeight: 5,
    fixedBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'EXPERT', type: 'modifier', x: 2, y: 0 },
    ],
    movableBlocks: [
      { id: 'b4', text: 'OUTPUT', type: 'subject', x: 5, y: 3 },
      { id: 'b5', text: 'RULES', type: 'subject', x: 5, y: 1 },
    ],
    availableBlocks: [
      { id: 'b6', text: 'IS', type: 'verb' },
      { id: 'b7', text: 'ARE', type: 'verb' },
      { id: 'b8', text: 'BRIEF', type: 'modifier' },
      { id: 'b9', text: 'STRICT', type: 'modifier' },
    ],
    prompt: 'What are the most important things to know about machine learning?',
    responses: {
      'AI IS EXPERT': {
        text: 'Machine learning is a vast field with many important concepts. Here are the fundamentals: supervised vs unsupervised learning, neural network architectures, gradient descent optimization, regularization techniques, feature engineering, model evaluation metrics, cross-validation, ensemble methods, transfer learning, and the bias-variance tradeoff.',
        satisfiesGoal: false,
      },
      'AI IS EXPERT,OUTPUT IS BRIEF': {
        text: 'Key ML concepts: supervised vs unsupervised learning, neural networks and gradient descent, and the bias-variance tradeoff. Also important: feature engineering and model evaluation.',
        satisfiesGoal: false,
      },
      'AI IS EXPERT,OUTPUT IS BRIEF,RULES ARE STRICT': {
        text: '• **Data is everything** — your model is only as good as your training data; garbage in, garbage out\n• **Start simple** — linear regression before neural nets; the simplest model that works is the best model\n• **Evaluate honestly** — always use a held-out test set; training accuracy means nothing',
        satisfiesGoal: true,
      },
      'AI IS EXPERT,RULES ARE STRICT': {
        text: 'The three most critical concepts in machine learning:\n\n1. **Data quality and representation** determine model ceiling — no architecture compensates for bad data\n2. **Occam\'s razor applies** — start with the simplest model (logistic regression, decision trees) before escalating complexity\n3. **Generalization is the goal** — always evaluate on unseen data; overfitting is the most common failure mode',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'Machine learning involves training models on data to make predictions. There\'s a lot to learn.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('RULES ARE STRICT') && (rules.includes('OUTPUT IS BRIEF') || rules.includes('AI IS EXPERT'));
    },
    par: 3,
  },

  // ═══════════════════════════════════════
  // CHAPTER 5: MASTERY
  // Teach: combine everything, multiple rules, strategic removal, nuanced configuration
  // ═══════════════════════════════════════

  {
    id: 'L16',
    chapter: 5,
    title: 'The Full Stack',
    goal: 'Configure the AI to give expert, concise, critical feedback with evidence — in a casual tone. All five properties must be active.',
    hint: 'You need 5 rules active simultaneously. Use all the rows.',
    gridWidth: 8,
    gridHeight: 7,
    fixedBlocks: [],
    movableBlocks: [
      { id: 'b1', text: 'AI', type: 'subject', x: 0, y: 0 },
      { id: 'b2', text: 'IS', type: 'verb', x: 1, y: 0 },
      { id: 'b3', text: 'HELPFUL', type: 'modifier', x: 2, y: 0 },
      { id: 'b4', text: 'CLAIMS', type: 'subject', x: 5, y: 4 },
      { id: 'b5', text: 'TONE', type: 'subject', x: 5, y: 2 },
    ],
    availableBlocks: [
      { id: 'b6', text: 'IS', type: 'verb' },
      { id: 'b7', text: 'IS', type: 'verb' },
      { id: 'b8', text: 'NEED', type: 'verb' },
      { id: 'b9', text: 'EXPERT', type: 'modifier' },
      { id: 'b10', text: 'CRITICAL', type: 'modifier' },
      { id: 'b11', text: 'CASUAL', type: 'modifier' },
      { id: 'b12', text: 'EVIDENCE', type: 'modifier' },
      { id: 'b13', text: 'CONCISE', type: 'modifier' },
    ],
    prompt: 'I\'m building a SaaS product and want to use microservices architecture from day one.',
    responses: {
      'AI IS EXPERT,AI IS CRITICAL,TONE IS CASUAL,CLAIMS NEED EVIDENCE,OUTPUT IS CONCISE': {
        text: 'Okay real talk — microservices on day one is almost always premature optimization. Martin Fowler literally coined "MonolithFirst" for this reason. The data: companies that start with microservices spend 3-5x more on infrastructure in year one (InfoQ 2023 survey) and ship features slower because every change requires coordinating across services.\n\nStart with a well-structured monolith. Extract services only when you have a specific, measurable reason (e.g., one component needs independent scaling). Shopify ran as a monolith until they had thousands of developers. You don\'t have their problems yet.',
        satisfiesGoal: true,
      },
      '_default': {
        text: 'Microservices are a popular architectural pattern but may not be right for every project.',
        satisfiesGoal: false,
      },
    },
    winCondition: (rules) => {
      return rules.includes('AI IS EXPERT') &&
             rules.includes('AI IS CRITICAL') &&
             rules.includes('TONE IS CASUAL') &&
             rules.includes('CLAIMS NEED EVIDENCE');
    },
    par: 5,
  },
];

// Helper to get levels by chapter
export function getLevelsByChapter(chapterNum) {
  return LEVELS.filter(l => l.chapter === chapterNum);
}

// Parse active rules from block positions on the grid
export function parseRules(blocks, gridWidth) {
  const rules = [];
  // Group blocks by row (y position)
  const rows = {};
  for (const block of blocks) {
    if (block.x === undefined || block.y === undefined) continue; // in tray, not on grid
    const key = block.y;
    if (!rows[key]) rows[key] = [];
    rows[key].push(block);
  }

  // For each row, look for SUBJECT VERB MODIFIER sequences
  for (const y of Object.keys(rows)) {
    const rowBlocks = rows[y].sort((a, b) => a.x - b.x);
    for (let i = 0; i < rowBlocks.length - 2; i++) {
      const a = rowBlocks[i];
      const b = rowBlocks[i + 1];
      const c = rowBlocks[i + 2];
      // Check adjacency (consecutive x positions)
      if (b.x === a.x + 1 && c.x === b.x + 1) {
        if (a.type === 'subject' && (b.type === 'verb') && c.type === 'modifier') {
          rules.push(`${a.text} ${b.text} ${c.text}`);
        }
      }
    }
  }
  return rules;
}

// Look up the response for a given set of active rules
export function getResponse(level, activeRules) {
  const sortedKey = [...activeRules].sort().join(',');

  // Try exact match first
  if (level.responses[sortedKey]) {
    return level.responses[sortedKey];
  }

  // Try subset matches (find the most specific match)
  let bestMatch = null;
  let bestMatchLen = 0;
  for (const key of Object.keys(level.responses)) {
    if (key === '_default') continue;
    const keyRules = key.split(',').filter(Boolean);
    const isSubset = keyRules.every(r => activeRules.includes(r));
    if (isSubset && keyRules.length > bestMatchLen) {
      bestMatch = level.responses[key];
      bestMatchLen = keyRules.length;
    }
  }

  if (bestMatch) return bestMatch;

  // Check for empty rules match
  if (activeRules.length === 0 && level.responses['']) {
    return level.responses[''];
  }

  return level.responses['_default'] || { text: 'The AI stares at you blankly.', satisfiesGoal: false };
}

// Check if current rules satisfy the win condition
export function checkWin(level, activeRules) {
  return level.winCondition(activeRules);
}
