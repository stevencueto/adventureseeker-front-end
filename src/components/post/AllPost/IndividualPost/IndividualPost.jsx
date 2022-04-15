import { EditPost } from "../../editPost/EditPost"
import { useState } from "react"
import APILink from "../../../../apiConfig"
import LikeButton from "./likedButton/LikedButton"
export const IndividualPost = (props) => {
    const [show, setShow] = useState(false)
    const hide =()=>{
        setShow(!show)
    }
    const liked = {
      post_id: props.post.id
    }
    const like = async()=>{
      try {
        const req = await fetch(`${APILink}api/post/like/${props.post.id}`, {
          method: "PATCH",
          headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(liked)
        })
        console.log(req)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
        <h3>{props.post.title}</h3>
        <p>{props.post.description}</p>
        <p>{props.post.location}</p>
        <p>{props.post.img}</p>
        <p>{props.post.current_date} date</p>
        <p>{props.post.user}</p>
        <p>{props.post.liked_by} liked by</p>
        <button onClick={()=>props.deletePost(props.post)}>Delete?</button>
        <button onClick={hide}>edit</button>
        <LikeButton onClick={like}></LikeButton>
        {show ? <EditPost post={props.post} editPost={props.editPost} hide={hide}></EditPost> : null}
    </div>
  )
}
