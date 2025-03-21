import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/";
import { BrowserRouter, Route, Routes } from "react-router";
import Callbacks from "./pages/Callbacks";
import EventDriven from "./pages/EventDriven";
import { NavBar } from "./components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="px-30 pt-30 h-screen">
          <NavBar />
          <Routes>
            <Route index element={<Home />} />
            <Route>
              <Route path="callbacks" element={<Callbacks />} />
              <Route path="event-driven" element={<EventDriven />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
