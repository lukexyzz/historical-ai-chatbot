import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [response, setResponse] = useState(null);


useEffect(() => {
  fetch('http://localhost:3000/helloworld')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setResponse(data.hello);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}, []);

  return (
    <>
      <div>
        {response}
      </div>
    </>
  )
}

export default App
