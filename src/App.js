
import { useState } from "react";
import Login from "./Login";
import JobForm from "./JobForm";
import Loader from "./Loader";
import Result from "./Result";
import { supabase } from "./supabase";
import "./styles.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [result, setResult] = useState(null);

  const handleLogin = () => {
    setScreen("form");
  };

  const handleAnalyze = async (formData) => {
    setScreen("loading");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const aiResult =
        typeof data.result === "string"
          ? JSON.parse(data.result)
          : data.result;

      setResult(aiResult);

      const { error } = await supabase.from("job_analyses").insert([
        {
          job_title: formData.job_title,
          company_name: formData.company_name,
          trust_score: aiResult.trust_score,
          risk_level: aiResult.risk_level,
          reasoning: aiResult.reasoning,
        },
      ]);

      if (error) {
        console.log("Supabase Error:", error);
      } else {
        console.log("Analysis saved successfully!");
      }

      setScreen("result");
    } catch (err) {
      console.log(err);

      setResult({
        trust_score: 0,
        risk_level: "Error",
        reasoning: "Backend connection failed.",
        positive_signals: [],
        red_flags: ["Unable to connect"],
        recommendations: ["Check backend server"],
      });

      setScreen("result");
    }
  };

  const handleRestart = () => {
    setResult(null);
    setScreen("form");
  };

  return (
    <div className="app-shell">
      <div className="backdrop-glow"></div>

      <div className="stage">

        <footer className="footer">
          Powered by TrustHire AI • React • FastAPI • OpenRouter AI • Supabase
        </footer>

        {screen === "login" && (
          <Login onLogin={handleLogin} />
        )}

        {screen === "form" && (
          <JobForm onAnalyze={handleAnalyze} />
        )}

        {screen === "loading" && (
          <Loader />
        )}

        {screen === "result" && (
          <Result
            result={result}
            onRestart={handleRestart}
          />
        )}

      </div>
    </div>
  );
}

export default App;