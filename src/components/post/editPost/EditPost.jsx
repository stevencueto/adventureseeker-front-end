import {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

export const EditPost = (props) => {
    const [edit, setEdit] = useState({
        title: props.post.title,
        location: props.post.location,
        description: props.post.description,
        img: props.post.description,
        current_date: props.post.current_date,
        user: props.post.user,
        likes: props.post.likes,
        id: props.post.id,
    })

    const submitNewPost = (e)=>{
        if(!edit.img){
            edit.img = props.post.img;
        }
        e.preventDefault();
        props.editPost(edit)
        props.handleClose(false)
    }
    const handleChange = (e) =>{
        const {name, value, type, files} = e.target;
        setEdit(prev => {
            return {
                ...prev,
                [name]: type === "file" ? files[0] : value
            }
        })
    }


  return (
      <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Make A  New Post!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e)=> submitNewPost(e)} encType="multipart/form">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        value={edit.title}
                        onChange={(e) => handleChange (e)}
                        type="text"
                        placeholder="Title"
                        name="title"
                        required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                        value={edit.description}
                        onChange={(e) => handleChange (e)}
                        type="text"
                        placeholder="Description"
                        name="description"
                        required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                        value={edit.location}
                        onChange={(e) => handleChange (e)}
                        type="text"
                        placeholder="Location"
                        name="location"
                        required/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        onChange={(e) => handleChange (e)}
                        type="file"
                        accept="image/png, image/jpeg"
                        placeholder="Image"
                        name="img"/>
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=> {props.handleClose(); submitNewPost(e)}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}


