import {useContext, useEffect, useState} from 'react'
import UserContext from '../../GlobalContext'
import APILink from '../../apiConfig'
import { IndividualPost } from '../post/AllPost/IndividualPost/IndividualPost'
import FunctionContext from '../../FunctionContex'
export const MyProfile = () => {
  const {user, setUser}= useContext(UserContext)
  const {like, editPost, deletePost} = useContext(FunctionContext)

  return (
    <div>
      <h2>
        {JSON.stringify(user?.liked_post)}
      </h2>
      {user?.post.length > 0 && user.post.map((post)=> {
      return <IndividualPost  key={`${post.id}userpost`} post={post}></IndividualPost>}
      )}
      <h3>Liked Post!</h3>
      {user?.liked_post.length > 0 && user.liked_post.map((post)=> {
      return <IndividualPost  key={`${post.id}liked`} post={post}></IndividualPost>}
      )}
    </div>
  )
}
