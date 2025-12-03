import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Chat from "./pages/ChatPage"
import Home from "./pages/HomePage"

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