import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './components/NavBar';
import DeckBuilder from "./Pages/DeckBuilder";
import Explore from "./Pages/Explore";
import AccountInfo from "./Pages/AccountInfo";
import DeckComments from "./components/DeckComments";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleDeck from "./Pages/SingleDeck";
import AdminPage from "./Pages/AdminPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/register" element={<Register setIsLoggedIn= {setIsLoggedIn}/>} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/deckbuilder" element={<DeckBuilder />} />
        <Route path="/explore" element={<Explore />} />
				<Route path="/deckcomments" element={<DeckComments />} />
				<Route path="/deck/:id" element={<SingleDeck />} />
        <Route path="admin" element={<AdminPage />} />
      </Routes>
      <ToastContainer autoClose={1000}/>
    </Router> 
    
  );
}

export default App;
