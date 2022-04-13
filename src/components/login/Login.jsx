
   
import React from 'react'
import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import APILink from '../../apiConfig'

const Login = () => {
	let navigate = useNavigate();
	const loginRef = React.createRef(null)
	const errPassword = useRef(null)

	const [errMessage, setErrMessage] = useState("")
    const [possibleUser, setPossibleUser] = useState({
        username: '',
        password: ''
    })
    const  updatePossibleUser = (e) => {
        const {name, value, type, checked} = e.target
        setPossibleUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

	const loginUser = async(e) => {
		e.preventDefault()
		const toLogIn = possibleUser.email.toLowerCase()
		try{
			const loginRequest = await fetch(`${APILink }api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"withCredentials": true
				},
				body: JSON.stringify({email : toLogIn, password: possibleUser.password}),
			})
			const loginResponse = await loginRequest.json()
			if (loginRequest.status === 200) {
				localStorage.setItem('token', loginResponse.token)
				setPossibleUser({
					email: '',
					password: ''
				})
				window.location.reload(false);
				// navigate("/", { replace: true });
			} else{
				setErrMessage(loginResponse.non_field_errors)
			}
		}catch(err){
			setErrMessage('Failed to communite with server')
		}
		
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) navigate("/", { replace: true });
		loginRef.current.focus()
	}, [])

	

	return (
		<section className='home-grid website-container'>
			<article className='login-section page login-err'>
			<h1 className='heading'>Login</h1>
			{!!errMessage && <p className='error-mesage'> {errMessage} </p>}
			<form onSubmit={(e) => loginUser(e)} className='login-form register-form' >
				<label htmlFor="email" className='login-label'>Email</label>
                <input
					value={possibleUser.email}
					onChange={(e) => 
						updatePossibleUser(e)
					}
					type="email"
					placeholder="Email"
                    name="email"
					className='login-input'
                    required
					ref={loginRef}
				/>
				<label htmlFor="password" className='login-label' >Password</label>
				<input
					value={possibleUser.password}
					onChange={(e) => updatePossibleUser(e)}
					type="password"
					placeholder="Password"
                    name="password"
                    required
					className='login-input'
					ref={errPassword}
				/>
				<button className='btn' type="submit" >login</button>
			</form>

			</article>
			
		</section>
	)
}

export default Login