import React, { useState } from 'react';

function LoginForm() {
  // State for email and password fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading
    alert(`Logging in with Email: ${email} and Password: ${password}`);
    // Handle authentication logic here
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email" // Personalise verification message
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;