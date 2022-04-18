import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { WebsiteContents } from './components/WebsiteContents';
import Footer from './components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react'
import UserContext from './GlobalContext'
function App() {
  const [user, setUser]= useState(null)
  const findUser = ()=>{
    const locate =localStorage.getItem('user')
    if(locate) return setUser(JSON.parse(locate))
  }
  const provValue = useMemo(()=>({user, setUser, findUser}), [user, setUser])
  return (
    <div className="App">
      <UserContext.Provider value={provValue}>
      <WebsiteContents></WebsiteContents>
      <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
