import {useContext, useEffect} from 'react'
import UserContext from '../../GlobalContext'
import APILink from '../../apiConfig'
import { IndividualPost } from '../post/AllPost/IndividualPost/IndividualPost'
export const MyProfile = () => {
  const {user, setUser}= useContext(UserContext)
  const findME = async() => {
		try{
			const req = await fetch(`${APILink }api/auth/user`, {
				method: 'GET',
				headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
				},
			})
			const res = await req.json()
			if (req.ok === true) {
				setUser(res.user)
        console.log(res)
			}
		}catch(err){
		}
	}
  useEffect(()=>{
    findME()
  }, [])
  return (
    <div>
      <h2>
        {JSON.stringify(user)}
      </h2>
      {user && user.post.map((post)=> {
      return <IndividualPost  key={`${post.id}userpost`} post={post}></IndividualPost>}
      )}
      <h3>Liked Post!</h3>
      {user && user.liked_post.map((post)=> {
      return <IndividualPost  key={`${post.id}liked`} post={post}></IndividualPost>}
      )}
    </div>
  )
}
