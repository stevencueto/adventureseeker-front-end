import { EditPost } from "../../editPost/EditPost"
import { useState, useContext, useEffect} from "react"
import APILink from "../../../../apiConfig"
import './post.css'
import UserContext from "../../../../GlobalContext"
export const IndividualPost = (props) => {
  const [post, setPost] = useState({})
  const liked_by = post.liked_by
  const [likes, setLike] = useState(false)
    const [show, setShow] = useState(false)
    const hide =()=>{
        setShow(!show)
    }
    const {user} = useContext(UserContext)
    const date = post.current_date
    const userInLikes =()=>{
      if(liked_by.includes(user)){
        setLike(true)
        console.log('like')
      }
      console.log('bro')
    }
    const handle = () => {
      const int =  setInterval( ()=> 
      {userInLikes()}, 5000);
      return () => clearTimeout(int)
    }
   
    // useEffect(() => {
    //   if (searchRef.current) {
    //       searchRef.current = false;
    //     return;
    //   }
  
    //   const timer = setTimeout(() => {
    //     searchMovie(search);
    //   }, 1000);
  
    //   return () => clearTimeout(timer);
    // }, [setSearch, search]);
    useEffect(()=>{
      setPost(props.post)
      console.log(liked_by)

      // handle()
    }, [props.post])
  return (
    <div className="post">
      {post.id && 
      <>
      <h3>{post.title}</h3>
        <img src={post.img} alt={props.description}/>
        <p> by <strong>{post.user.username}</strong></p>
        <p>{post.location}</p>
        <p>Posted on {date.split('T')[0]}</p>
        <p>{post.description}</p>
        <ul>{post.liked_by.map((one)=>{
          return <li key={one.username}>{one.username}</li>
                  })}</ul>
        <button onClick={()=>props.deletePost(post)}>Delete?</button>
        <button onClick={hide}>edit</button>
        <button onClick={()=>props.like(post.id)}>{ likes ? "Dislike" : "like"}</button>
        {show ? <EditPost post={post} editPost={props.editPost} hide={hide}></EditPost> : null}
      </>
      }
    </div>
    
  )
}
