import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      fullName: name,
      email: email,
    });
  };

  return (
    <section className="glass-card login-card fade-in">
     <h1 className="title">
TrustHire AI Job Scam Detector
</h1>

     <p className="subtitle">
Protect yourself from fake recruiters and online employment scams using AI-powered verification.
</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="button" type="submit">
          Continue
        </button>
      </form>

<div className="footer">
  © 2026 TrustHire AI
  <span>AI Powered Job Scam Detection System</span>
</div>

</section>
  );
}

export default Login;