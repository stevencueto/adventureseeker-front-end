import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IndividualPost } from './IndividualPost/IndividualPost'
export const AllPost = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
		const token = localStorage.getItem('token')
		if(!token){
			navigate("/", { replace: true });
		}
	}, [])
  return (
    <section className='post-cont'>
        {props.allPost.length > 0 ? props.allPost.map((post)=>{
            return <IndividualPost post={post} key={`${post.id}postkey`}/>
        }) : null}
    </section>
  )
}
