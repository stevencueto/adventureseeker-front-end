import { EditPost } from "../../editPost/EditPost"
import { useState, useContext, useEffect} from "react"
import APILink from "../../../../apiConfig"
import './post.css'
import Image from 'react-bootstrap/Image'
import { Container, Button } from "react-bootstrap"
import UserContext from "../../../../GlobalContext"
import FunctionContext from "../../../../FunctionContex"
import { GoLocation } from "react-icons/go";

export const IndividualPost = (props) => {
  const {like, editPost, deletePost} = useContext(FunctionContext)
  const [post, setPost] = useState({})
  const userInPost = props.post.user
  const [owner , setOwner] = useState(false)
  const [liked_by , setLiked_by]=useState([])
  const [numberOfLikes, setNumberOfLikes] = useState(0)
  const [likes, setLikes] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {user} = useContext(UserContext)
  let date = post.current_date
  const handleClick = ()=>{
    setPost(props.post)
    setLiked_by(props.post.liked_by)
    userInLikes()
  }
  const userInLikes =()=>{
      for (const one of props.post.liked_by){
        if (Object.values(one).includes(user.id)){
          setLikes(true)
        }else{
          setLikes(false)
        }
      }
      if(Object.values(userInPost).includes(user.id)){
        setOwner(user)
      }
      let likeNum = 0;
        for(const one in props.post.liked_by){
          likeNum++
        }
      setNumberOfLikes(likeNum)
    }
    useEffect(()=>{
      handleClick()
    }, [props.post])
  return (
    <div>
      {post.id && 
      <>
      <h3>{post.title}</h3>
        <Image src={props.post.img} alt={props.post.description} style={{ width: "95vw", maxWidth: '1100px'}}/>
        <div className="post-details">
          <p> by <strong>{props.post.user.username}</strong></p>
          <p> <GoLocation/>{props.post.location}</p>
          <p>Posted on {date.split('T')[0].replace('/-/g', '/')}</p>
          <p>{props.post.description} </p>
          <p>{numberOfLikes} {likes === 1 ? "like" :'Likes'}</p>
        </div>
        <div className="d-flex btn-container">
          { owner && <> <Button variant="secondary" onClick={()=>deletePost(post)}>Delete?</Button>
          <Button variant="secondary" onClick={handleShow}>
                edit
            </Button> </>}
          <Button variant={ likes ? "primary" : 'secondary'} onClick={()=>{ like(post.id); setLikes(!likes)}}>like</Button>
          <EditPost post={props.post} editPost={editPost} handleShow={handleShow} handleClose={handleClose} show={show}></EditPost>
        </div>
       
      </>
      }
    </div>
    
  )
}
