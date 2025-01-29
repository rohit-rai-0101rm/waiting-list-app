import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegistrationPage, StatusPage } from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
