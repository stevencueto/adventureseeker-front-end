import './App.css';
import { WebsiteContents } from './components/WebsiteContents';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

function App() {
  const [cleanupFunction, setCleanupFuction] = useState(false)
  const [activeMenu, setActiveMenu] = useState('menu')
  const toggleMenu = (e) =>{
    if(e.target.closest('.toggle-button')){
      return setActiveMenu(prev => prev === 'menu' ? 'menu active' : 'menu')
    }
    return setActiveMenu('menu')
  }
  useEffect(()=>{
    setCleanupFuction(true)
    setActiveMenu('menu')
    return ()=>{
      setCleanupFuction(false)
    }
  }, [])
  return (
    <div className="App">
      <Header activeMenu={activeMenu}></Header>
      <WebsiteContents></WebsiteContents>
      <Footer/>
    </div>
  );
}

export default App;
