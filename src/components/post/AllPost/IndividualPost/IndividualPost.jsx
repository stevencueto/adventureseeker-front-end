import { EditPost } from "../../editPost/EditPost"
import { useState } from "react"
export const IndividualPost = (props) => {
    const [show, setShow] = useState(false)
    const hide =()=>{
        setShow(!show)
    }
  return (
    <div>
        <h3>{props.post.title}</h3>
        <p>{props.post.description}</p>
        <p>{props.post.location}</p>
        <p>{props.post.img}</p>
        <p>{props.post.current_date} date</p>
        <p>{props.post.user}</p>
        <p>{props.post.likes}</p>
        <button onClick={()=>props.deletePost(props.post)}>Delete?</button>
        <button onClick={hide}>edit</button>
        {show ? <EditPost post={props.post} editPost={props.editPost} hide={hide}></EditPost> : null}
    </div>
  )
}