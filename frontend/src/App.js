import { React, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getStoreItems } from './services/api';


import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';

const URL = 'http://localhost:3000';


function App() {
  const [storeItems, setStoreItems] = useState([]);
  const [error, setError] = useState(null);

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


  useEffect(() => {

    const fetchItems = async () => {
      try {
        const items = await getStoreItems();
        setStoreItems(items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="headerContainter">

          </div>
        </header>
        <section className="App-body">
        <Routes>
          <Route exact path="/" element={< Home items={storeItems}/>} />
          <Route path="/login" element={< Login login={login} />} />
          <Route path="/product/:id" element={< Product />} />          
        </Routes>
        </section>
        <footer>
        </footer> 
      </div>
    </Router>
  );
}

export default App;
