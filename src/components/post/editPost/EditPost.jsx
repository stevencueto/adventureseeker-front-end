import {useState} from 'react'

export const EditPost = (props) => {
    const [edit, setEdit] = useState({
        title: props.post.title,
        location: props.post.location,
        description: props.post.description,
        img: "",
        current_date: props.post.current_date,
        user: props.post.user,
        likes: props.post.likes,
        id: props.post.id,
    })

    const submitNewPost = (e)=>{
        if(!edit.img){
            edit.img = props.post.img;
        }
        console.log(edit)
        e.preventDefault();
        props.editPost(edit)
        props.hide(false)
    }
    const handleChange = (e) =>{
        const {name, value, type, files} = e.target;
        setEdit(prev => {
            return {
                ...prev,
                [name]: type === "files" ? files[0] : value
            }
        })
    }
  return (
    <form onSubmit={(e)=> submitNewPost(e)} encType="multipart/form">
            <input
				value={edit.title}
				onChange={(e) => handleChange (e)}
				type="text"
				placeholder="Title"
                name="title"
                required
            /><br/>
            <input
				value={edit.description}
				onChange={(e) => handleChange (e)}
				type="text"
				placeholder="Description"
                name="description"
                required
            /><br/>
            <input
				value={edit.location}
				onChange={(e) => handleChange (e)}
				type="text"
				placeholder="Location"
                name="location"
                required
            /><br/>
            <input
				value={edit.img}
				onChange={(e) => handleChange (e)}
				type="file"
                accept="image/png, image/jpeg"
				placeholder="Image"
                name="img"
            /><br/>
            <button>Submit</button>
        </form>
  )
}
