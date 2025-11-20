import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Chat from "./pages/Chat.jsx"
import Home from "./pages/Home.jsx"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}