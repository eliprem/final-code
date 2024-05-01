// AddModal.js
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

type AddModalProps = {
    show: boolean;
    handleClose: () => void;
};

const AddModal = ({ show, handleClose}: AddModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        rating: 0,
        type: '',
        review: '',
        imgUrl: ''
    });

    const [selectedRating, setSelectedRating] = useState(0);

    const [selectedType, setSelectedType] = useState("Add Media Type");
    
    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
        setFormData({ ...formData, rating });
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setFormData({ ...formData, type });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'rating') {
            setSelectedRating(parseInt(value));
        }
        if (name === 'type') {
            setSelectedType(value);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post('/api/media/add', formData);
            handleClose();
            // Optionally, you can add logic to update the media list after adding a new media item
        } catch (error) {
            //console.error('Error adding media:', error);
            // eslint-disable-next-line no-alert
            alert('Error adding media. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Media</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
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
                    <DropdownButton
                        title={selectedType}
                        id="dropdown-menu-align-responsive-1"
                        onSelect={handleTypeChange}
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
                    <Form.Group controlId="imgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="review">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" rows={3} name="review" value={formData.review} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Media
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;