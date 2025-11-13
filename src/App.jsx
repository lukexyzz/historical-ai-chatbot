// import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Login from './pages/Login.jsx'

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
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
