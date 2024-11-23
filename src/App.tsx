import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/store/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Toaster } from "./components/ui/toaster";
import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { Error } from "@/components/Error";
import Home from "@/components/Home";

import useStore from "./store/ZustandStore";

const queryClient = new QueryClient();

function App() {
  const activeUserName = useStore(state => state.activeUserName);

  const isAuthenticated = useStore(state => state.isAuthenticated);

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
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home username={activeUserName} />
                ) : (
                  <Error toastErrorMsg="This page is available to registered users only." />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
