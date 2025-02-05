import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const URL = 'http://localhost:3000';


function App() {
  
  const login = async (email, password) => {
      
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      alert(`Message: ${data.message}`);
    } else {
      throw new Error('Login failed');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="headerContainter">

          </div>
        </header>
        <Routes>
          <Route exact path="/" element={< Home />} />
          <Route path="/login" element={< Login login={login} />} />          
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
