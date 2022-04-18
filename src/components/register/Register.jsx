import React, { useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'
import APILink from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import { Button, Container, Col} from 'react-bootstrap'
import UserContext from '../../GlobalContext'
const Register = ()=> {
	const {user, setUser, findUser}= useContext(UserContext)

	let navigate = useNavigate();
	const userNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [errMessage, setErrMessage] = useState('');
	const [button, setButton] = useState(false);
	const [passwordInstructions, setPasswordInstructions] = useState(false);
	const [userInstructions, setUserInstructions] = useState(false)
	const validPasswordCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;
	const validUser = /^[A-z][A-z0-9-_]{5,23}$/;
	const [confirmPasswordInstruction, setConfirmPasswordInstruction] = useState(false);

	const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
		confirmPassword: "",
    });
    const  updateNewUser = (e) => {
        const {name, value} = e.target
        setNewUser({
                ...newUser,
                [name]: value
            })
    }

	const comparePassword = () =>{
		if(newUser.password === newUser.confirmPassword && validPasswordCharacters.test(newUser.password)){
			setButton(false);
			setPasswordInstructions(false)
		}else{
			setButton(true);

		}
	};
	const passwordInstructionCheck = () => {
		if(newUser.password){
			if (validPasswordCharacters.test(newUser.password)){
				setPasswordInstructions(false) 
			}else{
			setPasswordInstructions(true)
			}
		}
		if(newUser.confirmPassword){
			if(newUser.password === newUser.confirmPassword){
				setConfirmPasswordInstruction(false)
			}
		}
	}

	useEffect(()=>{
		comparePassword();
		passwordInstructionCheck()
	}, [newUser.password, newUser.confirmPassword]);
	useEffect(() => {
		findUser()
		const token = localStorage.getItem('token')
		if(token){
			navigate("/", { replace: true });
		}
		userNameRef.current.focus();
	}, [])

	const registerUser = async(e) =>{
		if(newUser.password !== newUser.confirmPassword){
			passwordRef.current.focus();
		}
		e.preventDefault();
		try{
			const userRequest = await fetch(`${APILink}api/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
					body: JSON.stringify(newUser),
				});
			const fetchedUser = await userRequest.json();
			if (userRequest.status === 200) {
				localStorage.setItem('token', fetchedUser.token);
				window.localStorage.setItem('user', JSON.stringify(fetchedUser.user));
				setUser(fetchedUser.user)
				window.location.reload(false);
				navigate("/all", { replace: true })
			} else{
				if(fetchedUser.username){
					setErrMessage(fetchedUser.username);
					userNameRef.current.focus();
				}else if(fetchedUser.email)				
					setErrMessage("Email already in use");
					emailRef.current.focus();
				}
		}catch(err){
			console.log(err);
			setErrMessage("Server Error");
		}
		
	};
	const userInstructionsCheck = () =>{
		if(newUser.username){
			if(validUser.test(newUser.username)){
			return setUserInstructions(false)
			}
			setUserInstructions(true)
		}
	}
	
	useEffect(()=>{
		userInstructionsCheck()
	},[newUser.username])

	return (
<Container
className="d-flex justify-content-center align-items-center flex-direction-column"
style={{ minHeight: "100vh" }}
>
  <Col>
  
		<h1 className='heading'>Register</h1>


		{ errMessage && <p className='error-mesage'>
				{errMessage}
		</p> }
  <Form className='form-react' onSubmit={(e) => registerUser(e)}>
	  <Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Username</Form.Label>
		  <Form.Control
		  value={newUser.username}
		  onChange={updateNewUser}
		  type="text"
		  placeholder="Username"
		  name="username"
		  ref={userNameRef}
		  onFocus={()=> setUserInstructions(true)}
		  onBlur={() => setUserInstructions(false)}
		  required/>
	  </Form.Group>
	  { userInstructions &&
	  <Form.Text className="text-muted">
	<ol className="register-intructions">
					<li className="register-intructions">	Must be 6 to 24 characters.</li>
					<li className="register-intructions">Must begin with a letter.</li>
					<li className="register-intructions"> @ . + - _ </li>
				</ol>
    </Form.Text>
	}
	  <Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Email</Form.Label>
		  <Form.Control type="email"
		  value={newUser.email}
		  onChange={updateNewUser}
		  placeholder="Email"
		  name="email"
		  ref={emailRef}
		  required
		  autoComplete="off"/>
	  </Form.Group>

	  <Form.Group className="mb-3" controlId="formBasicPassword">
		  <Form.Label>Password</Form.Label>
		  <Form.Control 
		  value={newUser.password}
		  onChange={ (e)=> updateNewUser(e)}
		  type="password"
		  placeholder="Password"
		  name="password"
		  onFocus={() => setPasswordInstructions(true)}
		  onBlur={() => setPasswordInstructions(false)}
		  required
		  />
	  </Form.Group>
	  { passwordInstructions &&
	  <Form.Text className="text-muted">
	<ol className="register-intructions">
			<li className="register-intructions">	Password bust be 8 to 24 characters.</li>
			<li className="register-intructions"> Your password can’t be too similar to your other personal information.</li>
			<li className="register-intructions"> Must include uppercase and lowercase letters, a number and a special character.</li>
			<li className="register-intructions"> Allowed special characters are: <span className='special-charachter'>! @ # $ %</span></li>
	</ol>
    </Form.Text>
	}
	<Form.Group className="mb-3" controlId="formBasicPassword">
		  <Form.Label>Confirm Password</Form.Label>
		  <Form.Control 
		  value={newUser.confirmPassword}
		  onChange={ (e) => updateNewUser(e)}
		  type="password"
		  placeholder="Password"
		  name="confirmPassword"
		  required
		  onFocus={()=> setConfirmPasswordInstruction(true)}
		  onBlur={()=> setConfirmPasswordInstruction(false)}
		  />
	  </Form.Group>
	  { confirmPasswordInstruction 
					&& 
					<Form.Text className="text-muted">
						<p className="register-intructions">
                        Passwords must Match.
				</p>
				</Form.Text>
				}
				
	  <Button variant="primary" type="submit" className='btn-other' disabled={button}>
		  Submit
	  </Button>
  </Form>
  </Col>
  </Container>
	)
}

export default Register;