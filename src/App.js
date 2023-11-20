import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login.jsx'
import EditContent from './pages/EditContent';
import Home from './pages/Home.jsx';

function App() {
  
  return (
    <div className="App">
      
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/edit" element={<EditContent/>} />
      </Routes>
    </div>
  );
}

export default App;
