import {Route, Routes, useNavigate} from 'react-router-dom'
import './websitecomponent.css'
import { AllPost } from "./post/AllPost/AllPost"
import { useState, useEffect, useContext, useMemo} from "react"
import { NewPost } from "./post/NewPost/NewPost"
import APILink from "../apiConfig"
import Login from './login/Login'
import Register from './register/Register'
import { MyProfile } from './Users/MyProfile'
import FunctionContext from '../FunctionContex'

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
    }
    const makeNewPost = async()=>{
        try {
            const formData = new FormData();
            for(const one in newPost){
                formData.append(one, newPost[one])
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
        } catch (error) {
            console.log(error)
            
        }
    }
    const editPost = async(post)=>{
        try {
            const formData = new FormData();
            for(const one in post){
                formData.append(one, post[one])
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
                const newAllPost =  allPost.map((one)=> one.id === post.id ? response : one)
                setAllPost(newAllPost)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    const deletePost = async(post)=>{
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
    const like = async(id)=>{
        const liked = {
            post_id: id
          }
        try {
          const req = await fetch(`${APILink}api/post/like/${id}`, {
            method: "PATCH",
            headers: {
              'Authorization': 'Token ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(liked)
          })
          if(req.ok === true){
              populateFunction()
          }
        } catch (error) {
          console.log(error)
        }
      }
      const provValue = useMemo(()=>({like, editPost, deletePost}), [])
      useEffect(()=>{
        populateFunction()
    }, [])
  return (
    <main className="main-wrapper">
        <FunctionContext.Provider value={provValue}>
        <Routes>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/' exact element={<AllPost></AllPost>}/>
            <Route path='/profile' element={<MyProfile></MyProfile>} exact/>
            <Route path='/new' exact element={<NewPost setImg={setImg} img={img} handleNewPostChange={handleNewPostChange} newPost={newPost} makeNewPost={makeNewPost}/>}/>
        </Routes>        
        </FunctionContext.Provider>
    </main>
  )
}
