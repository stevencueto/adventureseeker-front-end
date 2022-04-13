import {Route, Routes, useNavigate} from 'react-router-dom'
import './websitecomponent.css'
import { AllPost } from "./post/AllPost/AllPost"
import { useState, useEffect } from "react"
import { NewPost } from "./post/NewPost/NewPost"
import APILink from "../apiConfig"
import Login from './login/Login'
import Register from './register/Register'
export const WebsiteContents = () => {
    let navigate = useNavigate();
    const [allPost, setAllPost] = useState([])
    const [newPost, setNewPost] = useState({
        title: "",
        location:"",
        description: "",
        img: "",
        likes: 20
    })
    const getDate = () => {
        const date = new Date();
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const today = `${dd}-${mm}-${yyyy}`
        // setNewPost(prev=>{
        //     return{
        //         ...prev,
        //         [current_date]: today
        //     }}
        // )
        console.log(newPost)
        console.log(today, 'date')
      };
    const handleNewPostChange = (e) =>{
        const {name, value} = e.target;
        setNewPost(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const makeNewPost = async()=>{
        console.log(newPost)
        try {
            const request = await fetch(`http://127.0.0.1:8000/api/post/user/`, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            })
            if(request.status === 201){
                const response = await request.json()
                setAllPost([...allPost, response ])
                setNewPost({
                    title: "",
                    location:"",
                    description: "",
                    img: "",
                    likes: 20,
                })
                navigate("/", { replace: true });
            }
            console.log(request)
        } catch (error) {
            console.log(error)
            
        }
    }
    const editPost = async(post)=>{
        console.log(post)
        try {
            const request = await fetch(`${APILink}api/post/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            })
            if(request.status === 200){
                const response = await request.json()
                console.log(request)
                const newAllPost =  allPost.map((one)=> one.id === post.id ? response : one)
                setAllPost(newAllPost)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    const deletePost = async(post)=>{
        console.log(post)
        try {
            const request = await fetch(`${APILink}api/post/${post.id}`, {
                method: 'DELETE',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            })
            console.log(request)
            if(request.ok === true){
                const newAllPost =  allPost.filter((one)=> one.id !== post.id)
                setAllPost(newAllPost)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    const populateFunction = async() =>{
        try{
            const request = await fetch(`${APILink}api/post/`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            })
            if(request.status === 200){
                const response = await request.json()
                setAllPost(response)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        populateFunction()
    }, [])
  return (
    <main className="main-wrapper">
        <Routes>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/' exact element={<AllPost allPost={allPost} editPost={editPost} deletePost={deletePost}></AllPost>}/>
            <Route path='/profile' exact/>
            <Route path='/new' exact element={<NewPost handleNewPostChange={handleNewPostChange} newPost={newPost} getDate={getDate} makeNewPost={makeNewPost}/>}/>
        </Routes>        
        
    </main>
  )
}
