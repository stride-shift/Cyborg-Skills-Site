import { useState, useCallback, useEffect, useMemo } from 'react';
import { pickRoundLenses, ALL_LENSES } from '../data/lenses.js';
import { callGemini, callGeminiMultiTurn } from '../api/gemini.js';
import { useEvidenceBoard } from './useEvidenceBoard.js';

export function useGameState(apiKey) {
  // Game state
  const [screen, setScreen] = useState('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);

  // Round state
  const [situation, setSituation] = useState(null);
  const [category, setCategory] = useState(null);
  const [hiddenAssumptions, setHiddenAssumptions] = useState([]);
  const [roundLenses, setRoundLenses] = useState([]);
  const [lensTokens, setLensTokens] = useState(3);
  const [bonusTokens, setBonusTokens] = useState(0);
  const [exploredLenses, setExploredLenses] = useState({});
  const [activeLensId, setActiveLensId] = useState(null);
  const [isLensLoading, setIsLensLoading] = useState(false);

  // Synthesis state
  const [synthesisText, setSynthesisText] = useState('');
  const [synthesisResult, setSynthesisResult] = useState(null);
  const [isSynthesisLoading, setIsSynthesisLoading] = useState(false);

  // Loading
  const [isSituationLoading, setIsSituationLoading] = useState(false);
  const [error, setError] = useState(null);

  // Evidence board
  const board = useEvidenceBoard();

  const generateSituation = useCallback(async () => {
    setIsSituationLoading(true);
    setError(null);
    try {
      const result = await callGemini(
        apiKey,
        `You generate complex, polarizing real-world dilemmas for a critical thinking game. The dilemmas should be rich, multi-layered situations with no clear right answer — only perspectives that reveal different truths. Topics can include: technology ethics, urban policy, education reform, healthcare access, creative disruption, environmental trade-offs, AI governance, labor markets, privacy, inequality, cultural change, scientific ethics, media, democracy. Each situation should have 2-3 hidden assumptions that most people don't question when they first encounter the problem. These are the assumptions embedded in how most people frame the issue. Be specific — use concrete details, numbers, stakeholders, and time pressures. Make it feel like a real headline, not an abstract thought experiment. The situation description should be 3-5 sentences. IMPORTANT: vary your topics widely. Do not default to AI, tech, or education every time.`,
        `Generate a complex real-world dilemma. Return JSON with this exact structure: { "situation": "the situation description (3-5 sentences, concrete and specific)", "category": "one of: Technology Ethics, Urban Policy, Education Reform, Healthcare Access, Creative Disruption, Environmental Trade-offs, Labor & Economy, Privacy & Surveillance, Science & Ethics, Media & Democracy, Cultural Change, AI Governance", "hiddenAssumptions": ["assumption 1", "assumption 2", "assumption 3"] }`
      );
      setSituation(result.situation);
      setCategory(result.category || null);
      setHiddenAssumptions(result.hiddenAssumptions || []);
      if (result.hiddenAssumptions?.length) {
        board.initAssumptions(result.hiddenAssumptions, 600);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSituationLoading(false);
    }
  }, [apiKey, board.initAssumptions]);

  const startRound = useCallback(async () => {
    const lenses = pickRoundLenses();
    setRoundLenses(lenses);
    setLensTokens(3);
    setBonusTokens(0);
    setExploredLenses({});
    setActiveLensId(null);
    setSynthesisText('');
    setSynthesisResult(null);
    setCategory(null);
    setScreen('play');
    setSituation(null);
    setHiddenAssumptions([]);
    board.resetBoard();
  }, [board.resetBoard]);

  useEffect(() => {
    if (screen === 'play' && !situation && !isSituationLoading && apiKey) {
      generateSituation();
    }
  }, [screen, situation, isSituationLoading, apiKey, generateSituation]);

  const startGame = useCallback(() => {
    setCurrentRound(0);
    setTotalScore(0);
    setRoundScores([]);
    startRound();
  }, [startRound]);

  const exploreLens = useCallback(async (lensId) => {
    if (lensTokens + bonusTokens <= 0 || exploredLenses[lensId] || !situation) return;

    if (bonusTokens > 0) {
      setBonusTokens(b => b - 1);
    } else {
      setLensTokens(t => t - 1);
    }

    const lens = roundLenses.find(l => l.id === lensId);
    setActiveLensId(lensId);
    setExploredLenses(prev => ({ ...prev, [lensId]: { messages: [], done: false, revealedAssumption: null } }));
    setIsLensLoading(true);
    setError(null);

    try {
      const result = await callGemini(
        apiKey,
        lens.systemPrompt + `\n\nYou are responding to a complex real-world dilemma in a critical thinking game. Give your INITIAL take on the situation — your unique perspective based on your expertise and worldview. Be genuinely in character. 2-3 sentences. Be specific and insightful, not generic.\n\nThe hidden assumptions in this situation that most people miss are: ${hiddenAssumptions.join('; ')}. If your perspective naturally touches on one of these, mention it obliquely — don't state it directly. The player should have to think about it.\n\nAlso extract 1 key insight from your response — a short, standalone sentence that captures the core of what you're saying. This will appear as a card on an evidence board.\n\nRespond in JSON: { "response": "your in-character response (2-3 sentences)", "insights": ["one short insight sentence"], "revealedAssumption": null or "the exact text of a hidden assumption your response hints at" }`,
        `Here is the situation:\n\n${situation}\n\nGive your initial take.`
      );
      setExploredLenses(prev => ({
        ...prev,
        [lensId]: {
          messages: [{ type: 'persona', text: result.response }],
          done: false,
          revealedAssumption: result.revealedAssumption || null,
        }
      }));

      // Add insight cards to evidence board
      if (result.insights?.length) {
        board.addInsightCards(lensId, lens.color, result.insights, 600);
      }
      // Reveal assumption if persona hinted at it
      if (result.revealedAssumption) {
        board.tryRevealByText(result.revealedAssumption);
      }
    } catch (e) {
      setError(e.message);
      if (bonusTokens > 0) {
        setBonusTokens(b => b + 1);
      } else {
        setLensTokens(t => t + 1);
      }
      setExploredLenses(prev => {
        const copy = { ...prev };
        delete copy[lensId];
        return copy;
      });
    } finally {
      setIsLensLoading(false);
    }
  }, [lensTokens, bonusTokens, exploredLenses, situation, roundLenses, apiKey, hiddenAssumptions, board.addInsightCards, board.tryRevealByText]);

  const sendFollowUp = useCallback(async (lensId, question) => {
    const lens = roundLenses.find(l => l.id === lensId);
    const lensData = exploredLenses[lensId];
    if (!lensData || lensData.done) return;

    setExploredLenses(prev => ({
      ...prev,
      [lensId]: {
        ...prev[lensId],
        messages: [...prev[lensId].messages, { type: 'player', text: question }],
      }
    }));
    setIsLensLoading(true);
    setError(null);

    try {
      const conversationMessages = [
        { role: 'user', text: `Here is the situation:\n\n${situation}\n\nGive your initial take.` },
        { role: 'model', text: JSON.stringify({ response: lensData.messages[0].text, revealedAssumption: lensData.revealedAssumption }) },
        { role: 'user', text: `The player asks you a follow-up question. Stay deeply in character. Go deeper based on what they specifically asked. If they asked a sharp question that reveals something your initial take didn't cover, acknowledge that and go further. If they asked something shallow, give a polite but surface-level answer.\n\nThe hidden assumptions are: ${hiddenAssumptions.join('; ')}.\n\nPlayer's follow-up question: "${question}"\n\nIf the question quality is 2 or 3, also extract 1 new insight from your deeper response — a short standalone sentence. If quality is 1 (shallow), return empty insights.\n\nRespond in JSON: { "response": "your in-character follow-up response (2-4 sentences, going deeper)", "insights": [] or ["one new insight sentence"], "revealedAssumption": null or "exact text of a hidden assumption this exchange reveals", "questionQuality": 1 to 3 where 1=shallow 2=good 3=exceptional }` },
      ];

      const result = await callGeminiMultiTurn(
        apiKey,
        lens.systemPrompt + `\n\nYou are in a critical thinking game. The player has explored your initial take on a situation and is now asking a follow-up. Stay in character. Reward sharp questions with deeper insight. The player gets ONE follow-up, so make it count.`,
        conversationMessages
      );

      const isBonus = result.questionQuality === 3;
      const newMessages = [...lensData.messages, { type: 'player', text: question }, { type: 'persona', text: result.response }];
      if (isBonus) {
        newMessages.push({ type: 'bonus-msg', text: 'Sharp question! +1 bonus lens token earned.' });
      }

      setExploredLenses(prev => ({
        ...prev,
        [lensId]: {
          messages: newMessages,
          done: true,
          revealedAssumption: result.revealedAssumption || prev[lensId].revealedAssumption,
        }
      }));

      if (isBonus) {
        setBonusTokens(b => b + 1);
      }

      // Add insight cards to evidence board (quality 2+ gets new cards)
      if (result.insights?.length) {
        board.addInsightCards(lensId, lens.color, result.insights, 600);
      }
      // Reveal assumption if this exchange touches one
      if (result.revealedAssumption) {
        board.tryRevealByText(result.revealedAssumption);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLensLoading(false);
    }
  }, [exploredLenses, roundLenses, situation, apiKey, hiddenAssumptions, board.addInsightCards, board.tryRevealByText]);

  const goToSynthesis = useCallback(() => {
    setActiveLensId(null);
    setScreen('synthesis');
  }, []);

  const submitSynthesis = useCallback(async () => {
    if (!synthesisText.trim() || isSynthesisLoading) return;
    setIsSynthesisLoading(true);
    setError(null);

    try {
      const perspectives = Object.entries(exploredLenses).map(([id, data]) => {
        const lens = roundLenses.find(l => l.id === id);
        return `${lens.name}: ${data.messages.filter(m => m.type === 'persona').map(m => m.text).join(' ')}`;
      }).join('\n\n');

      const result = await callGemini(
        apiKey,
        `You are evaluating a player's synthesis in a critical thinking game called "Reframe." The player explored multiple expert perspectives on a complex situation, then wrote their own synthesis — an insight that integrates across viewpoints.

Evaluate the synthesis on four dimensions (each scored 1-3):
1. Integration depth: Did they weave together multiple perspectives into something new, or just pick one viewpoint? (1=single lens, 2=combined two views, 3=true integration of multiple views)
2. Assumption-breaking: Did they challenge or reveal hidden assumptions in the situation? (1=accepted all framing, 2=questioned some framing, 3=identified and challenged core assumptions)
3. Actionability: Does the synthesis lead somewhere useful — a decision, framework, or principle? (1=purely abstract, 2=somewhat actionable, 3=clear path forward)
4. Originality: Is it a genuine new insight or a safe compromise / obvious take? (1=platitude or obvious, 2=good but predictable, 3=genuinely novel synthesis)

Overall score is the sum (4-12), mapped to 1-10 scale: 4-5=1-2, 6=3, 7=4, 8=5-6, 9=7, 10=8, 11=9, 12=10.

Be honest but encouraging. Explain what was strong, what was missed, and offer ONE specific missed insight that could have emerged from the available perspectives.`,
        `SITUATION:\n${situation}\n\nHIDDEN ASSUMPTIONS:\n${hiddenAssumptions.join('\n')}\n\nPERSPECTIVES EXPLORED:\n${perspectives}\n\nEVIDENCE BOARD STATE:\n${JSON.stringify(board.boardState)}\n\nPLAYER'S SYNTHESIS:\n"${synthesisText}"\n\nEvaluate. The board state shows how many insights the player collected, how many they connected (cross-persona connections are more valuable), and how many hidden assumptions they uncovered. Factor this into your evaluation.\n\nReturn JSON: { "score": number 1-10, "integrationScore": number 1-3, "assumptionScore": number 1-3, "actionabilityScore": number 1-3, "originalityScore": number 1-3, "feedback": "2-3 sentences of evaluation", "missedInsight": "1 sentence about what they could have seen" }`
      );

      setSynthesisResult(result);

      const roundTotal = result.score || 0;
      setTotalScore(prev => prev + roundTotal);
      setRoundScores(prev => [...prev, {
        score: roundTotal,
        integration: result.integrationScore,
        assumption: result.assumptionScore,
        actionability: result.actionabilityScore,
        originality: result.originalityScore,
        lensesUsed: Object.keys(exploredLenses).length,
      }]);
      setScreen('results');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsSynthesisLoading(false);
    }
  }, [synthesisText, isSynthesisLoading, exploredLenses, roundLenses, situation, apiKey, hiddenAssumptions]);

  const nextRound = useCallback(() => {
    const next = currentRound + 1;
    if (next >= 3) {
      setScreen('gameover');
      return;
    }
    setCurrentRound(next);
    startRound();
  }, [currentRound, startRound]);

  const exploredCount = Object.keys(exploredLenses).length;
  const availableTokens = lensTokens + bonusTokens;
  const activeLens = roundLenses.find(l => l.id === activeLensId);
  const activeLensData = activeLensId ? exploredLenses[activeLensId] : null;

  const foundAssumptions = useMemo(() => {
    return [...new Set(Object.values(exploredLenses).map(d => d.revealedAssumption).filter(Boolean))];
  }, [exploredLenses]);

  return {
    // State
    screen, currentRound, totalScore, roundScores,
    situation, category, hiddenAssumptions,
    roundLenses, lensTokens, bonusTokens, exploredLenses,
    activeLensId, activeLens, activeLensData, isLensLoading,
    synthesisText, synthesisResult, isSynthesisLoading,
    isSituationLoading, error,
    exploredCount, availableTokens, foundAssumptions,

    // Evidence board
    board,

    // Actions
    startGame, exploreLens, sendFollowUp, goToSynthesis,
    submitSynthesis, nextRound, setActiveLensId, setSynthesisText,
    setScreen,
  };
}
