import './header.css'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../GlobalContext'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { NewPost } from '../post/NewPost/NewPost'
const Header  = (props) => {
	const {user, findUser, setUser}= useContext(UserContext)
  const logOut = () => {
    window.localStorage.clear();
    setUser(null)
    window.location.reload(false);
  }
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  useEffect(()=>{
    findUser()
  }, [user])
  return (
    <Navbar bg="black" variant="dark" className='position-fixed' style={{width: '100vw', backgroundColor: 'black', maxWidth: '1700px'}}>
    <Container>
    <Navbar.Brand href="/">Adventure Seeker</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Explore</Nav.Link>
      { user  && <Nav.Link onClick={handleShow}> New Post </Nav.Link>}
      <NewPost handleShow={handleShow} show={show} handleClose={handleClose} setImg={props.setImg} img={props.img} handleNewPostChange={props.handleNewPostChange} newPost={props.newPost} makeNewPost={props.makeNewPost}></NewPost>
      <NavDropdown title={ user?.username || "Welcome"} id="navbarScrollingDropdown">
          { user && <NavDropdown.Item href="/" onClick={logOut}>Logout</NavDropdown.Item>}
          { !user && <NavDropdown.Item href="/login">Login</NavDropdown.Item>}
          <NavDropdown.Divider />
          {!user && <NavDropdown.Item  href={ user ? '/profile' : '/register'}>
            {user ? 'Profile' : 'Register'}
          </NavDropdown.Item>}
        </NavDropdown>
    </Nav>
    </Container>
    </Navbar>
  )
}
export default Header;