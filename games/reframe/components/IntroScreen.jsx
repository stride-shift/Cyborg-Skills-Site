export default function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <img src="/games/assets/header_reframe.png" alt="" className="header-art" onError={e => e.target.style.display = 'none'} />
      <h1>Reframe</h1>
      <p className="subtitle">
        The same reality looks completely different through different eyes. Find what no single viewpoint can see.
      </p>
      <ol className="intro-rules">
        <li>You'll face <strong>3 complex real-world dilemmas</strong> generated live by AI.</li>
        <li>You have <strong>3 lens tokens</strong> to consult AI-inhabited expert personas.</li>
        <li>Each persona gives their take, then you can ask <strong>one follow-up question</strong>.</li>
        <li>Sharp questions earn <strong>bonus tokens</strong> for additional perspectives.</li>
        <li>Then write your own <strong>synthesis</strong> — the insight no single lens could reach.</li>
        <li>AI evaluates your synthesis on integration, assumption-breaking, actionability, and originality.</li>
      </ol>
      <button className="btn btn-primary" onClick={onStart}>Begin</button>
    </div>
  );
}
