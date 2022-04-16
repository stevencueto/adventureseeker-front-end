import {useContext, useEffect, useState} from 'react'
import UserContext from '../../GlobalContext'
import APILink from '../../apiConfig'
import { IndividualPost } from '../post/AllPost/IndividualPost/IndividualPost'
import FunctionContext from '../../FunctionContex'
export const MyProfile = () => {
  const {user, setUser}= useContext(UserContext)
  const {like, editPost, deletePost} = useContext(FunctionContext)
  const [posts, setPosts]= useState([])
  const [likedPosts, setLikedPosts]= useState([])
  const findME = async() => {
		try{
			const req = await fetch(`${APILink }api/auth/user`, {
				method: 'GET',
				headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
				},
			})
      console.log(req)
			const res = await req.json()
      console.log(res)
			if (req.ok === true) {
        let counter = 0
				setUser(res)
        setPosts(res.post)
        setLikedPosts(res.liked_post)
        console.log(res, counter++)
			}
		}catch(err){
		}
	}
  useEffect(()=>{
    findME()
  }, [like, editPost, deletePost])
  return (
    <div>
      <h2>
        {JSON.stringify(user)}
      </h2>
      {posts.length > 0 && posts.map((post)=> {
      return <IndividualPost  key={`${post.id}userpost`} post={post}></IndividualPost>}
      )}
      <h3>Liked Post!</h3>
      {likedPosts.length > 0 && likedPosts.map((post)=> {
      return <IndividualPost  key={`${post.id}liked`} post={post}></IndividualPost>}
      )}
    </div>
  )
}
