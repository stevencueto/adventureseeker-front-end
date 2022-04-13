import './header.css'
import {Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Header  = (props) => {
  const [isLogged, setIsLogged] = useState(false)
  const toggleBtn = () =>{
    const logged = localStorage.getItem('token')
    if(!!logged){
      return setIsLogged(true)
    }
    setIsLogged(false)
  }
  window.addEventListener("storage",(e) => {
    toggleBtn()
 });
 const logOut = () => {
  window.localStorage.clear();
  window.location.reload(false);
  setIsLogged(false)
 }
 useEffect(()=>{
  toggleBtn()
 }, [])
  return (
    <>
    <header className='header'>
      <div id="logo">
        <Link className="links logo-link" to="/">LOGO</Link>
      </div>
      <div className="toggle-button">
            <hr className="bar"/>
            <hr className="bar"/>
            <hr className="bar"/>
      </div>
      <nav className={props.activeMenu}>
        {!isLogged ? <Link className="links" to="/">Home</Link> :  null}
        {/* <Link className="links" to="/favorite-movies">Liked Movies</Link> */}
        <Link className="links" to="/all">All</Link>
        <Link className="links" to="/new">New Post</Link>
        <Link className="links" to="/playlist/">Profile</Link>
        { isLogged ? <Link to='/' className="links" onClick={logOut}>Logout</Link> : <Link className="links" to='/login'>Login</Link>}
        { !isLogged && <Link className="links" to="/register">Register</Link>}

      </nav>
    </header>
    <div className='padding-one'>
    </div>
    </>


  )
}
export default Header;