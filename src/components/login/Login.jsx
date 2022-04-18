
   
import React from 'react'
import { useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import APILink from '../../apiConfig'
import UserContext from '../../GlobalContext'
import Form from 'react-bootstrap/Form'
import { Button, Container, Col} from 'react-bootstrap'
const Login = () => {
	const {user, setUser, findUser}= useContext(UserContext)
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
		try{
			const loginRequest = await fetch(`${APILink }api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// "withCredentials": true
				},
				body: JSON.stringify(possibleUser),
			})
			const loginResponse = await loginRequest.json()
			if (loginRequest.status === 200) {
				localStorage.setItem('token', loginResponse.token)
				localStorage.setItem('user', JSON.stringify(loginResponse.user))
				console.log(loginResponse)
				setUser(loginResponse.user)
				setPossibleUser({
					username: '',
					password: ''
				})
				navigate("/", { replace: true });
			} else{
				setErrMessage(loginResponse.non_field_errors)
			}
		}catch(err){
			setErrMessage('Server Error')
		}
		
	}
	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token){
			navigate("/", { replace: true });
		}
	}, [])

	

	return (
		<Container
      className="d-flex justify-content-center align-items-center flex-direction-column"
      style={{ minHeight: "100vh" }}
    >
		<Col>
		
			<h1 className='heading'>Login</h1>
			{!!errMessage && <p className='error-mesage'> {errMessage} </p>}
		<Form className='form-react' onSubmit={(e) => loginUser(e)}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text"
				placeholder="Enter username"
				value={possibleUser.email}
				onChange={(e) => 
						updatePossibleUser(e)
					}
				name="username"
				required
				ref={loginRef}/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control value={possibleUser.password}
					onChange={(e) => updatePossibleUser(e)}
					type="password"
					placeholder="Password"
                    name="password"
                    required
					ref={errPassword} />
			</Form.Group>
			<Button variant="primary" type="submit" className='btn-other'>
				Submit
			</Button>
		</Form>
		</Col>
		</Container>
	)
}

export default Login