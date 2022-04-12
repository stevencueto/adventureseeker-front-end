import Header from "./header/Header"
import Footer from "./footer/Footer"
import './websitecomponent.css'
import { AllPost } from "./post/AllPost/AllPost"
import { useState, useEffect } from "react"
import { NewPost } from "./post/NewPost/NewPost"
export const WebsiteContents = () => {
    const APILink = "https://adventureseekerapi.herokuapp.com/"
    const [allPost, setAllPost] = useState([])
    const [newPost, setNewPost] = useState({
        title: "",
        location:"",
        description: "",
        img: "",
        current_date: "2022-04-19",
        user: "",
        likes: 20,
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
            const request = await fetch(`${APILink}api/post/`, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-Type': 'application/json',
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
                    current_date: "2022-04-19",
                    user: "",
                    likes: 20,
                })
            }
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
            const request = await fetch(`${APILink}api/post/`)
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
        <Header></Header>
        <h1>Make A New Post</h1>
        <AllPost allPost={allPost} editPost={editPost} deletePost={deletePost}></AllPost>
        <NewPost handleNewPostChange={handleNewPostChange} newPost={newPost} getDate={getDate} makeNewPost={makeNewPost}/>
        <Footer></Footer>
    </main>
  )
}
