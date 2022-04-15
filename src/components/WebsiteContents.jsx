import {Route, Routes, useNavigate} from 'react-router-dom'
import './websitecomponent.css'
import { AllPost } from "./post/AllPost/AllPost"
import { useState, useEffect } from "react"
import { NewPost } from "./post/NewPost/NewPost"
import APILink from "../apiConfig"
import Login from './login/Login'
import Register from './register/Register'
import axios from 'axios'
export const WebsiteContents = () => {
    let navigate = useNavigate();
    const [allPost, setAllPost] = useState([])
    const [newPost, setNewPost] = useState({
        title: "",
        location:"",
        description: "",
        img: '',
        likes: 20
    })
    const [img, setImg] = useState('')
    const handleNewPostChange = (e) =>{
        const {name, value, files, type} = e.target;
        setNewPost(prev => {
            return {
                ...prev,
                [name]: type === "file" ? files[0] : value
            }
        })
        console.log(type , name, value, 'ues')
        console.log(newPost.img, 'file')
    }
    const makeNewPost = async()=>{
        try {
            const formData = new FormData();
            for(const one in newPost){
                formData.append(one, newPost[one])
                console.log(newPost[one], 'sup')
            }
    
            const request = await fetch(`${APILink}api/post/user/`, {
                method: 'POST',
                body: formData,
                headers: {
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
                    img: '',
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
        try {
            const formData = new FormData();
            for(const one in post){
                formData.append(one, post[one])
                console.log(post[one], 'sup')
            }
            const request = await fetch(`${APILink}api/post/${post.id}`, {
                method: 'PUT',
                body: formData,
                headers: {
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
                headers: {
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
            console.log(request)
            if(request.status === 200){
                const response = await request.json()
                console.log(response)
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
            <Route path='/new' exact element={<NewPost setImg={setImg} img={img} handleNewPostChange={handleNewPostChange} newPost={newPost} makeNewPost={makeNewPost}/>}/>
        </Routes>        
        
    </main>
  )
}
