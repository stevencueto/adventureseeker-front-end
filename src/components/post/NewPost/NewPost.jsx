import {useState} from 'react'

export const NewPost = (props) => {
    const submitNewPost = (e)=>{
        e.preventDefault();
        props.getDate()
        props.makeNewPost()
    }
  return (
         <form onSubmit={(e)=> submitNewPost(e)}>
            <input
				value={props.newPost.title}
				onChange={(e) => props.handleNewPostChange(e)}
				type="text"
				placeholder="Title"
                name="title"
                required
            /><br/>
            <input
				value={props.newPost.description}
				onChange={(e) => props.handleNewPostChange(e)}
				type="text"
				placeholder="Description"
                name="description"
                required
            /><br/>
            <input
				value={props.newPost.location}
				onChange={(e) => props.handleNewPostChange(e)}
				type="text"
				placeholder="Location"
                name="location"
                required
            /><br/>
            <input
				value={props.newPost.img}
				onChange={(e) => props.handleNewPostChange(e)}
				type="file"
				placeholder="Image"
                name="img"
            /><br/>
            <button>Submit</button>
        </form>
  )
}
