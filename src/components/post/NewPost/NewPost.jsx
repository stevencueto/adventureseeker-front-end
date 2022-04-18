import {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

export const NewPost = (props) => {
    const submitNewPost = (e)=>{
        e.preventDefault();
        props.makeNewPost()
        props.handleClose()
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
                        value={props.newPost.title}
                        onChange={(e) => props.handleNewPostChange(e)}
                        type="text"
                        placeholder="Title"
                        name="title"
                        required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3}
                        value={props.newPost.description}
                        onChange={(e) => props.handleNewPostChange(e)}
                        type="text"
                        placeholder="Description"
                        name="description"
                        required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                        value={props.newPost.location}
                        onChange={(e) => props.handleNewPostChange(e)}
                        type="text"
                        placeholder="Location"
                        name="location"
                        required/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        onChange={(e) => props.handleNewPostChange(e)}
                        type="file"
                        accept="image/png, image/jpeg"
                        placeholder="Image"
                        name="img"
                        required />
                    </Form.Group>
                    <Button type='submit'>Submit</Button>
                </Form>
                </Modal.Body>
            </Modal>
        </>
  )
}
