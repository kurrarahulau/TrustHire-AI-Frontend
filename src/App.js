import { useState } from "react";
import Login from "./Login";
import JobForm from "./JobForm";
import Loader from "./Loader";
import Result from "./Result";
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

      setResult(
        typeof data.result === "string"
          ? JSON.parse(data.result)
          : data.result
      );

      setScreen("result");
    } catch (error) {
      console.log(error);

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
  Powered by TrustHire AI • React • FastAPI • OpenRouter AI
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