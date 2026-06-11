import { useState } from "react";

function JobForm({ onAnalyze }) {
  const [form, setForm] = useState({
    job_title: "",
    company_name: "",
    recruiter_email: "",
    company_website: "",
    salary: "",
    job_description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onAnalyze(form);
  };

  return (
    <section className="glass-card fade-in">

      <h1 className="title">
        TrustHire AI Job Scam Detector
      </h1>

      <p className="subtitle">
        AI-powered job scam detection using language analysis, recruiter verification, and risk assessment.
      </p>

      <form className="form" onSubmit={submit}>

        <input
          className="input"
          name="job_title"
          placeholder="Job Title *"
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="company_name"
          placeholder="Company Name *"
          onChange={handleChange}
          required
        />

        <input
          className="input"
          name="recruiter_email"
          placeholder="Recruiter Email (Optional)"
          onChange={handleChange}
        />

        <input
          className="input"
          name="company_website"
          placeholder="Company Website / Job Link (Optional)"
          onChange={handleChange}
        />

        <input
          className="input"
          name="salary"
          placeholder="Salary (Optional)"
          onChange={handleChange}
        />

        <textarea
          className="input"
          name="job_description"
          placeholder="Paste Job Description *"
          rows="7"
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Analyze Job
        </button>

            </form>

      <div className="footer">
        © 2026 TrustHire AI
        <span>AI Powered Job Scam Detection System</span>
        <span>React • FastAPI • OpenRouter AI • Supabase</span>
      </div>

    </section>
  );
}

export default JobForm;