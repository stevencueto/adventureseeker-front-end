import { EditPost } from "../../editPost/EditPost"
import { useState, useContext, useEffect} from "react"
import APILink from "../../../../apiConfig"
import './post.css'
import UserContext from "../../../../GlobalContext"
import FunctionContext from "../../../../FunctionContex"
export const IndividualPost = (props) => {
  const {like, editPost, deletePost} = useContext(FunctionContext)
  const [post, setPost] = useState({})
  const [owner , setOwner] = useState(false)
  const [liked_by , setLiked_by]=useState([])
  const [likes, setLikes] = useState(false)
    const [show, setShow] = useState(false)
    const hide =()=>{
        setShow(!show)
    }
    const {user} = useContext(UserContext)
    const date = post.current_date
    const userInLikes =()=>{
      liked_by.forEach((one)=>{
        if (Object.values(one).includes(user.id)){
          setLikes(true)
          console.log(one)
        }
      })
      const userinPost = props.post.user
      if(Object.values(userinPost).includes(user.id)){
        setOwner(user)
      }   
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
      setLiked_by(props.post.liked_by)
      userInLikes()
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
        <ul>{ post.liked_by[0]?.username ? post.liked_by.map((one)=>{
          return <li key={one.username}>{one.username}</li>
                  }) :  props.post.liked_by.reduce((el, one)=> el + one) }</ul>
         { owner && <><button onClick={()=>deletePost(post)}>Delete?</button>
        <button onClick={hide}>edit</button> </>}
        <button onClick={()=>like(post.id)}>{ likes ? "Dislike" : "like"}</button>
        {show ? <EditPost post={post} editPost={editPost} hide={hide}></EditPost> : null}
      </>
      }
    </div>
    
  )
}
