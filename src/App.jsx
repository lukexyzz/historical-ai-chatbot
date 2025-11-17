// import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import LoginForm from './components/LoginForm.jsx'
import ChatComponent from './components/ChatComponent.jsx'
import './ChatComponent.css'
import Login from './pages/Login.jsx'
import Chat from "./pages/Chat.jsx"

export default function App() {
//   const [response, setResponse] = useState(null);


// useEffect(() => {
//   fetch('http://localhost:3000/helloworld')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       setResponse(data.hello);
//     })
//     .catch(error => {
//       console.error('Fetch error:', error);
//     });
// }, []);

  return (
    <>

      <div>
        {response}
      </div>
      <LoginForm />

      <div>
        <ChatComponent />
      </div>
    </>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
