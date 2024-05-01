// EditModal.js
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useState } from 'react';

type MediaProps = {
    _id: string;
    title: string;
    rating: number;
    type: string;
    review: string;
    imgUrl: string;
};

type EditModalProps = {
    show: boolean;
    handleClose: () => void;
    handleEdit: (updatedMedia: unknown) => void;
    media: MediaProps;
};

const EditModal = ({ show, handleClose, handleEdit, media}: EditModalProps) => {
    //form input fields to edit media properties
    const [titleInput, setTitle] = useState(media.title);
    const [typeInput, setType] = useState(media.type);
    const [ratingInput, setRating] = useState(media.rating.toString());
    const [imgUrlInput, setImgUrl] = useState(media.imgUrl);
    const [reviewInput, setReview] = useState(media.review);

    const handleSaveChanges = () => {
        const updatedMedia = {
            ...media,
            title: titleInput,
            rating: parseInt(ratingInput),
            type: typeInput,
            imgUrl: imgUrlInput,
            review: reviewInput
        };
        handleEdit(updatedMedia);
    };
    
    const [selectedRating, setSelectedRating] = useState(media.rating);

    const handleRatingChange = (rating: number) => {
        setRating(rating.toString());
        setSelectedRating(rating);
    };

    const [selectedType, setSelectedType] = useState(media.type);

    const handleTypeChange = (type: string) => {
        setType(type);
        setSelectedType(type);
    };



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit: {media.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            placeholder={media.title}
                            value = {titleInput}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br/>
                    <DropdownButton
                        title={selectedType}
                        id="dropdown-menu-align-responsive-1"
                        onSelect={(eventKey) => handleTypeChange(eventKey)}
                        className="dropdownbutton"
                    >
                        <Dropdown.Item eventKey="Book 📖">Book 📖</Dropdown.Item>
                        <Dropdown.Item eventKey="Movie 🎥">Movie 🎥</Dropdown.Item>
                        <Dropdown.Item eventKey="TV Show 📺">TV Show 📺</Dropdown.Item>
                        <Dropdown.Item eventKey="Album 💿">Album 💿</Dropdown.Item>
                        <Dropdown.Item eventKey="Song 🎵">Song 🎵</Dropdown.Item>
                        <Dropdown.Item eventKey="Podcast 🎙️">Podcast 🎙️</Dropdown.Item>
                        <Dropdown.Item eventKey="Video Game 🎮">Video Game 🎮</Dropdown.Item>
                        <Dropdown.Item eventKey="Other ❓">Other ❓</Dropdown.Item>
                    </DropdownButton>
                    <br/>
                    <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <div className="rating-buttons">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Button
                                    className={rating <= selectedRating ? 'rating-buttons selected' : 'rating-buttons'}
                                    key={rating}
                                    onClick={() => handleRatingChange(rating)}
                                >
                                    ⭐
                                </Button>
                            ))}
                        </div>
                    </Form.Group>
                    <br/>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            value = {imgUrlInput}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Review</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            placeholder="Write your review here!"
                            value={reviewInput} 
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;