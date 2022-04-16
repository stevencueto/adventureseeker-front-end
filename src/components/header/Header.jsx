import './header.css'
import {Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../../GlobalContext'


const Header  = (props) => {
	const {user, findUser, setUser}= useContext(UserContext)
  const logOut = () => {
    window.localStorage.clear();
    setUser(null)
    window.location.reload(false);
  }
  useEffect(()=>{
    findUser()
  }, [user])
  return (
    <>
    <header className='header'>
      <div id="logo">
        <Link className="links logo-link" to="/">LOGO</Link>
      </div>
      <div className="toggle-button" onClick={props.toggleMenu}>
            <hr className="bar"/>
            <hr className="bar"/>
            <hr className="bar"/>
      </div>
      <nav className={props.activeMenu}>
        {!user && <Link className="links" to="/">Home</Link> }
        {/* <Link className="links" to="/favorite-movies">Liked Movies</Link> */}
        <Link className="links" to="/">Explore</Link>
        <Link className="links" to="/new">New Post</Link>
        <Link className="links" to="/profile">Profile</Link>
        { user ? <Link to='/' className="links" onClick={logOut}>Logout</Link> : <Link className="links" to='/login'>Login</Link>}
        { !user && <Link className="links" to="/register">Register</Link>}

      </nav>
    </header>
    <div className='padding-one'>
    </div>
    </>


  )
}
export default Header;