function Loader() {
  return (
    <section className="glass-card fade-in loader-card">
      <div className="scanner" aria-hidden="true">
        <div className="ring ring-one" />
        <div className="ring ring-two" />
        <div className="ring ring-three" />
        <div className="scanner-core" />
        <div className="scanner-sweep" />
      </div>
      <h2 className="title">
TrustHire AI is analyzing this job...
</h2>

<p className="subtitle">
Checking recruiter credibility, salary realism, company legitimacy and scam indicators.
</p>
    </section>
  );
}

export default Loader;
