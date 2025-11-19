// import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Chat from "./pages/Chat.jsx"

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}