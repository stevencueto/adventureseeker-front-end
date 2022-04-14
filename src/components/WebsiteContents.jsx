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
        img: null,
        likes: 20
    })
    const [img, setImg] = useState('')
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
        console.log(newPost.img, 'img')
          try {
                const formData = new FormData();
                formData.append('file', img)
                formData.append('upload_preset', 'post')
                const req = await fetch('https://api.cloudinary.com/v1_1/dkmbw4f6d/image/upload/', {
                    method: "POST",
                    body: formData
                })
                console.log(req)
                const img = await req.json()
                newPost.img = await img.url
                console.log(newPost, 'o')
            const request = await fetch(`http://127.0.0.1:8000/api/post/user/`, {
                method: 'POST',
                body: JSON.stringify(newPost),
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
        try {
            if(typeof(post.img) !== "string"){
                const formData = new FormData();
                formData.append('file', post.img)
                formData.append('upload_preset', 'post')
                const req = await fetch('cloudinary://565195333223589:Zi2NyDx6GtgjZ9VMaz_RHiZtinM@dkmbw4f6d', {
                    method: "POST",
                    body: formData
                })
                const img = await req.json()
                post.img = await img.url
            }
            const request = await fetch(`${APILink}api/post/${post.id}`, {
                method: 'PUT',
                body: JSON.stringify(post),
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
            <Route path='/new' exact element={<NewPost setImg={setImg} img={img} handleNewPostChange={handleNewPostChange} newPost={newPost} getDate={getDate} makeNewPost={makeNewPost}/>}/>
        </Routes>        
        
    </main>
  )
}
