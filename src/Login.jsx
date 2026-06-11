import { useState } from "react";
import { supabase } from "./supabase";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("profiles")
    .insert([
      {
        full_name: name,
        email: email,
      },
    ]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("✅ Successfully signed up with TrustHire AI");

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

    </section>
  );
}

export default Login;