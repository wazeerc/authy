import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/store/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Toaster } from "./components/ui/toaster";
import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import Home from "@/components/Home";

import useStore from "./store/ZustandStore";

const queryClient = new QueryClient();

function App() {
  const activeUserName = useStore(state => state.activeUserName);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeToggle />
          <Toaster />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home username={activeUserName} />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
