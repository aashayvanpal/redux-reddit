import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'

function PostModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log('modal props', props)
    return (
        <>
            <Button variant="outline-primary"
                style={{ width: "100%" }}
                onClick={handleShow}>
                {props.postTitle}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Reddit Name :
                        {props.post}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Comments Section:
                    {props.comments.map(comment => <div key={comment.data.id}>
                        {comment.data.body}
                        <hr />
                    </div>)
                    }

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal