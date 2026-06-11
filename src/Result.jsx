import { useEffect, useMemo, useState } from "react";

function Result({ result, onRestart }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const score = Number(result?.trust_score || 0);

  useEffect(() => {
    let frame;

    const duration = 1000;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);

      setAnimatedScore(Math.round(score * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [score]);

  const scoreClass =
    score >= 70
      ? "score-safe"
      : score >= 40
      ? "score-caution"
      : "score-risk";

  const recommendations = useMemo(() => {
    if (
      result?.recommendations &&
      Array.isArray(result.recommendations)
    ) {
      return result.recommendations;
    }

    return [];
  }, [result]);

  return (
    <section className="glass-card result-card fade-in">
      <div className="result-top">
        <p className={`status ${scoreClass}`}>
    Risk Level: {result?.risk_level || "Unknown"}
</p>

        <p className="result-label">
          AI Trust Assessment
        </p>
      </div>

      <div className="score-display">
        <span className="score-number">
          {animatedScore}
        </span>

        <span className="score-total">
          /100
        </span>
      </div>

     <h2 className="result-title">
AI Job Trust Score
</h2>

      <p className="subtitle result-summary">
        {result?.reasoning}
      </p>

      {result?.positive_signals?.length > 0 && (
        <div className="recommendation-grid">
          {result.positive_signals.map((item, index) => (
            <article
              key={index}
              className="recommendation-card"
            >
              <h3>✅ Positive Signal</h3>

              <p>{item}</p>
            </article>
          ))}
        </div>
      )}

      {result?.red_flags?.length > 0 && (
        <div className="recommendation-grid">
          {result.red_flags.map((item, index) => (
            <article
              key={index}
              className="recommendation-card"
            >
              <h3>⚠️ Red Flag</h3>

              <p>{item}</p>
            </article>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendation-grid">
          {recommendations.map((item, index) => (
            <article
              key={index}
              className="recommendation-card"
            >
             <h3>💡 Recommendation</h3>

              <p>{item}</p>
            </article>
          ))}
        </div>
      )}

            <button
        className="button"
        onClick={onRestart}
      >
        Analyze New Job
      </button>

    </section>
  );
}

export default Result;