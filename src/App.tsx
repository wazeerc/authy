import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { Success } from "@/components/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
