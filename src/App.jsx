import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./pages/ChatPage";
import Home from "./pages/HomePage";

/**
 * Main application component.
 * Sets up the routing for the application.
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat/:personaId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
