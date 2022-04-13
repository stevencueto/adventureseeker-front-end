import React, { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'
import APILink from '../../apiConfig'
const Register = ()=> {

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


	const registerUser = async(e) =>{
		if(newUser.password !== newUser.confirmPassword){
			passwordRef.current.focus();
		}
		const toLogIn = newUser.email.toLowerCase()
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
		}
		
	};
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!!token) navigate("/", { replace: true })
		userNameRef.current.focus();
	}, []);

	useEffect(()=>{
		userInstructionsCheck()
	},[newUser.username])

	const userInstructionsCheck = () =>{
		if(newUser.username){
			if(validUser.test(newUser.username)){
			return setUserInstructions(false)
			}
			setUserInstructions(true)
		}
	}
	

	return (
		<section className='home-grid website-container'>
			<article className="login-section">
			<h1 className='heading'>Register</h1>


				{ errMessage && <p className='error-mesage'>
						{errMessage}
				</p> }
				
			<form className="login-form register-form"onSubmit={registerUser}>
				<input
					value={newUser.username}
					onChange={updateNewUser}
					type="text"
					placeholder="Username"
					name="username"
					ref={userNameRef}
					onFocus={()=> setUserInstructions(true)}
					onBlur={() => setUserInstructions(false)}
					autoComplete="off"
					className='login-input'
					required
				/>
				<br />
				{ userInstructions 
						&& 
				<ol className="register-intructions">
					<li className="register-intructions">	Must be 6 to 24 characters.</li>
					<li className="register-intructions">Must begin with a letter.</li>
					<li className="register-intructions">Numbers are okay.</li>
					<li className="register-intructions">"@"  "." "+" "-" "_" are the special charachters allowed</li>
				</ol>
				}
				<input
					value={newUser.email}
					onChange={updateNewUser}
					type="email"
					placeholder="Email"
					name="email"
					ref={emailRef}
					className='login-input'
					required
					autoComplete="off"

				/>
				<br />
				<input
					value={newUser.password}
					onChange={ (e)=> updateNewUser(e)}
					type="password"
					placeholder="Password"
					name="password"
					onFocus={() => setPasswordInstructions(true)}
					onBlur={() => setPasswordInstructions(false)}
					className='login-input'
					required

				/>
				<br />
				{ passwordInstructions 
					&& 
				<ol className="register-intructions">
                        <li className="register-intructions">	Password bust be 8 to 24 characters.</li>
						<li className="register-intructions"> Must include uppercase and lowercase letters, a number and a special character.</li>
						<li className="register-intructions"> Allowed special characters are: <span className='special-charachter'>! @ # $ %</span></li>
				</ol>}
				<input
					value={newUser.confirmPassword}
					onChange={ (e) => updateNewUser(e)}
					type="password"
					placeholder="Password"
					name="confirmPassword"
					className='login-input'
					required
					onFocus={()=> setConfirmPasswordInstruction(true)}
					onBlur={()=> setConfirmPasswordInstruction(false)}
				/>
				<br />
				{ confirmPasswordInstruction 
					&& 
				<p className="register-intructions">
                        Passwords must Match.
				</p>}
				<button className='btn  blocked-element' disabled={button}> Register</button>
			</form>
			</article>
		</section>
	)
}

export default Register;