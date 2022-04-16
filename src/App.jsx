import './App.css';
import { WebsiteContents } from './components/WebsiteContents';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react'
import UserContext from './GlobalContext'
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
  const [user, setUser]= useState(null)
  const findUser = ()=>{
    const locate =localStorage.getItem('user')
    if(locate) return setUser(JSON.parse(locate))
  }
  const provValue = useMemo(()=>({user, setUser, findUser}), [user, setUser])
  return (
    <div className="App">
      <UserContext.Provider value={provValue}>
      <Header activeMenu={activeMenu} toggleMenu={toggleMenu}></Header>
      <WebsiteContents></WebsiteContents>
      <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
